"""Convert the flat path data in an Illustrator/PDF file into SVG paths."""
import re, sys
from pypdf import PdfReader

src = sys.argv[1]
reader = PdfReader(src)
page = reader.pages[0]
H = float(page.mediabox.height)
W = float(page.mediabox.width)
data = page.get_contents().get_data().decode("latin-1")

tokens = re.findall(r"\[[^\]]*\]|<[^>]*>|/[^\s/\[\]<>()]+|[-\d.]+|[A-Za-z*'\"]+", data)

def mul(a, b):
    """Concatenate two PDF matrices [a b c d e f]."""
    return [
        a[0]*b[0] + a[1]*b[2], a[0]*b[1] + a[1]*b[3],
        a[2]*b[0] + a[3]*b[2], a[2]*b[1] + a[3]*b[3],
        a[4]*b[0] + a[5]*b[2] + b[4], a[4]*b[1] + a[5]*b[3] + b[5],
    ]

def apply(m, x, y):
    return (m[0]*x + m[2]*y + m[4], m[1]*x + m[3]*y + m[5])

ctm = [1, 0, 0, 1, 0, 0]
stack = []
fill = None
nums = []
cur = []          # path segments as (op, [points in device space])
start = None
here = None
out = []

def dev(x, y):
    px, py = apply(ctm, x, y)
    return (px, H - py)   # PDF y is up, SVG y is down

i = 0
while i < len(tokens):
    t = tokens[i]
    if re.fullmatch(r"-?\d*\.?\d+", t):
        nums.append(float(t)); i += 1; continue

    if t == "q":
        stack.append((list(ctm), fill))
    elif t == "Q":
        if stack: ctm, fill = stack.pop(); ctm = list(ctm)
    elif t == "cm" and len(nums) >= 6:
        ctm = mul(nums[-6:], ctm)
    elif t == "rg" and len(nums) >= 3:
        fill = tuple(round(c, 3) for c in nums[-3:])
    elif t == "m" and len(nums) >= 2:
        here = dev(*nums[-2:]); start = here; cur.append(("M", [here]))
    elif t == "l" and len(nums) >= 2:
        here = dev(*nums[-2:]); cur.append(("L", [here]))
    elif t == "c" and len(nums) >= 6:
        a, b, c = dev(*nums[-6:-4]), dev(*nums[-4:-2]), dev(*nums[-2:])
        cur.append(("C", [a, b, c])); here = c
    elif t == "v" and len(nums) >= 4:
        b, c = dev(*nums[-4:-2]), dev(*nums[-2:])
        cur.append(("C", [here, b, c])); here = c
    elif t == "y" and len(nums) >= 4:
        a, c = dev(*nums[-4:-2]), dev(*nums[-2:])
        cur.append(("C", [a, c, c])); here = c
    elif t == "h":
        cur.append(("Z", [])); here = start
    elif t == "re" and len(nums) >= 4:
        x, y, w, h = nums[-4:]
        pts = [dev(x, y), dev(x+w, y), dev(x+w, y+h), dev(x, y+h)]
        cur.append(("M", [pts[0]])); 
        for p in pts[1:]: cur.append(("L", [p]))
        cur.append(("Z", []))
    elif t in ("f", "F", "f*", "b", "b*", "B", "B*"):
        if cur: out.append((fill, cur)); 
        cur = []
    elif t in ("n", "S", "s"):
        cur = []

    if t not in ("q",):
        nums = []
    i += 1

def to_d(segs):
    parts = []
    for op, pts in segs:
        if op == "Z": parts.append("Z")
        else: parts.append(op + " " + " ".join(f"{x:.2f} {y:.2f}" for x, y in pts))
    return " ".join(parts)

print(f"artboard {W:.0f}x{H:.0f}, {len(out)} filled paths")
for colour, segs in out:
    xs = [p[0] for _, pts in segs for p in pts]
    ys = [p[1] for _, pts in segs for p in pts]
    if not xs: continue
    bw, bh = max(xs)-min(xs), max(ys)-min(ys)
    print(f"  fill={colour} bbox=({min(xs):.1f},{min(ys):.1f}) {bw:.1f}x{bh:.1f} segs={len(segs)}")

# ---- Emit the TypeScript module -------------------------------------------
BG = (0.145, 0.18, 0.271)
paths = []
for colour, segs in out:
    xs = [p[0] for _, pts in segs for p in pts]
    ys = [p[1] for _, pts in segs for p in pts]
    if not xs or colour == BG:
        continue
    bw, bh = max(xs)-min(xs), max(ys)-min(ys)
    sig = ''.join(op for op, _ in segs)
    # Illustrator leaves stray paths behind that enclose no area and so fill
    # nothing: a bare moveto-lineto, or anything under a couple of points.
    if bw * bh < 4 or len(sig) < 3:
        continue
    paths.append({
        "d": to_d(segs), "x": min(xs), "y": min(ys), "w": bw, "h": bh,
        "cx": (min(xs)+max(xs))/2, "cy": (min(ys)+max(ys))/2,
        "sig": "".join(op for op, _ in segs),
    })

def kind(p):
    """
    Four bezier curves and nothing else is either a circle (a star) or the
    four-point Antares mark. Everything else in the file is a tapered
    connecting sliver, which always contains straight segments.
    """
    if p["sig"] != "MCCCC":
        return "line"
    ratio = p["w"] / p["h"] if p["h"] else 99
    return "star" if 0.93 < ratio < 1.07 else "antares"

stars = [p for p in paths if kind(p) == "star"]
spark = [p for p in paths if kind(p) == "antares"]
lines = [p for p in paths if kind(p) == "line"]
assert len(spark) == 1, f"expected one sparkle, got {len(spark)}"

allp = paths
PAD = 6
minx = min(p["x"] for p in allp) - PAD
miny = min(p["y"] for p in allp) - PAD
maxx = max(p["x"]+p["w"] for p in allp) + PAD
maxy = max(p["y"]+p["h"] for p in allp) + PAD
vw, vh = maxx-minx, maxy-miny

def shift_d(d):
    def repl(m):
        return f"{float(m.group(1))-minx:.2f} {float(m.group(2))-miny:.2f}"
    return re.sub(r"(-?\d+\.?\d*) (-?\d+\.?\d*)", repl, d)

# Draw outward from Antares, which is how the eye reads the mark.
ax, ay = spark[0]["cx"], spark[0]["cy"]
lines.sort(key=lambda p: (p["cx"]-ax)**2 + (p["cy"]-ay)**2)
stars.sort(key=lambda p: (p["cx"]-ax)**2 + (p["cy"]-ay)**2)

with open("scorpius.generated.ts", "w") as f:
    f.write(f"""/**
 * Scorpius, the constellation Antares sits in.
 *
 * GENERATED from the brand kit's `Antares_Constellation_Final.ai`, so the
 * drawn mark is the official emblem rather than a redrawing of it: the same
 * tapered segments, the same star sizes, the same four-point Antares. To
 * regenerate after a brand update, re-run the converter in
 * `docs/editing-content.md`.
 *
 * Coordinates are in the emblem's own space, shifted so the artwork starts at
 * the origin.
 */

export const SCORPIUS_VIEWBOX = {{ width: {vw:.0f}, height: {vh:.0f} }};

/** The connecting segments, ordered outward from Antares. */
export const scorpiusLines: string[] = [
""")
    for p in lines:
        f.write(f'  "{shift_d(p["d"])}",\n')
    f.write("];\n\n/** The stars, ordered outward from Antares. */\nexport const scorpiusStars: { cx: number; cy: number; r: number }[] = [\n")
    for p in stars:
        f.write(f'  {{ cx: {p["cx"]-minx:.2f}, cy: {p["cy"]-miny:.2f}, r: {p["w"]/2:.2f} }},\n')
    f.write("];\n\n/** Antares itself: the four-point star from the team icon. */\nexport const antares = {\n")
    s0 = spark[0]
    f.write(f'  d: "{shift_d(s0["d"])}",\n')
    f.write(f'  cx: {s0["cx"]-minx:.2f},\n  cy: {s0["cy"]-miny:.2f},\n')
    f.write(f'  width: {s0["w"]:.2f},\n  height: {s0["h"]:.2f},\n')
    f.write("};\n")

print(f"\nwrote scorpius.generated.ts  viewBox {vw:.0f}x{vh:.0f}")
print(f"  {len(lines)} segments, {len(stars)} stars, 1 sparkle")
