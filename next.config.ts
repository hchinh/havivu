import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		domains: ['images.unsplash.com', 'plus.unsplash.com'],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
}

export default nextConfig
