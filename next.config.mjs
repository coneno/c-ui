import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	basePath: "/c-ui",
	trailingSlash: true,
};

const withMDX = createMDX();

export default withMDX(nextConfig);
