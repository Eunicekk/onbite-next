/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true, // 빌드 중 ESLint 검사 무시
  },
};

export default nextConfig;
