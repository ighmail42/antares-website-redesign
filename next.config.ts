import type { NextConfig } from "next";

// Next.js blocks dev assets/HMR from origins other than the one it started
// with. The preview is served from a different origin, so allow it here.
// BASE44_PUBLIC_HOST_SUFFIX is set by the Base44 dev environment; without it
// (a plain `npm run dev`) no extra origin is allowed.
const previewOrigin = process.env.BASE44_PUBLIC_HOST_SUFFIX
  ? [`3000-${process.env.BASE44_PUBLIC_HOST_SUFFIX}`]
  : [];

const nextConfig: NextConfig = {
  allowedDevOrigins: previewOrigin,
};

export default nextConfig;
