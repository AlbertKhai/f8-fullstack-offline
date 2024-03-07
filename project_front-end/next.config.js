/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    URL_API_MINDMAP: process.env.URL_API_MINDMAP,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL
  }
}

module.exports = nextConfig
