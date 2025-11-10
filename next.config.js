/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  async rewrites() {
    return [
      {
        source: '/webrtc/:path*',
        destination: 'http://localhost:3001/:path*',
      },
    ]
  },
  reactStrictMode: false,
}

module.exports = nextConfig