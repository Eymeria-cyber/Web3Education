/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/lesson",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
