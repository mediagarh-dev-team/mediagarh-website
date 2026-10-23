/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // local
    NEXT_PUBLIC_SITE_URL: 'https://mediagarh-website.vercel.app',
    // production
    // NEXT_PUBLIC_SITE_URL: 'https://www.mediagarh.com',
    IMG_PATH: '/',
  },
};

export default nextConfig;
