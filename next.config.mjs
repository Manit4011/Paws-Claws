/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'assets.thepetnest.com',
      'dm6g3jbka53hp.cloudfront.net', // <- Add this line
    ],
  },
};

export default nextConfig;
