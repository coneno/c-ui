import { createMDX } from "fumadocs-mdx/next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/c-ui";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  ...(basePath ? { basePath } : {}),
};

const withMDX = createMDX();

export default withMDX(nextConfig);
