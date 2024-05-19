/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/html/index.html",
        },
      ],
    };
  },
};

export default nextConfig;
