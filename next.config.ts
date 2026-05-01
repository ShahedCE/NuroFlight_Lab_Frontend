const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
    ],
    dangerouslyAllowLocalIP: true, // 🔥 THIS LINE FIXES YOUR ERROR
  },
};

export default nextConfig;