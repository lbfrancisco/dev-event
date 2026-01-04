import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	cacheComponents: true,
	/* config options here */
	reactCompiler: true,

	// Rewrite rules for PostHog
	async rewrites() {
		return [
			{
				source: '/ingest/static/:path*',
				destination: 'https://us-assets.i.posthog.com/static/:path*',
			},
			{
				source: '/ingest/:path*',
				destination: 'https://us.i.posthog.com/:path*',
			},
		]
	},

	// Config remote pattern images upload
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
		],
	},

	// Required to support PostHog trailing slash API requests
	skipTrailingSlashRedirect: true,
}

export default nextConfig
