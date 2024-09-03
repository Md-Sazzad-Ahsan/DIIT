import withPWA from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your other Next.js configurations can go here
};

const pwaConfig = withPWA({
  dest: "public", 
  cacheOnFrontEndNav: true, 
  aggressiveFrontEndNavCaching: true, 
  reloadOnOnline: true, 
  swMinify: true, 
  disable: process.env.NODE_ENV === 'development',
  workboxOptions: {
    disableDevLogs: true, 
  },
});

export default pwaConfig(nextConfig);
