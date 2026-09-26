# Hero video

Drop a competition clip here as `hero.mp4` and a still frame as
`hero-poster.jpg`, then set `src: "/video/hero.mp4"` in `content/media.ts`.

Guidelines that keep the page fast and the text readable:

- 10 to 25 seconds, looping cleanly.
- No audio track at all. The hero video is muted and autoplaying; an audio
  track only adds bytes.
- 1920x1080 or smaller, H.264 MP4.
- Aim for under 6 MB. Phones download this too.
- Wide shots of the field or the pit work better than close-ups, because the
  headline sits over the left third of the frame.

Until `src` is set, the hero uses the still image in `content/media.ts` and
nothing breaks.
