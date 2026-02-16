/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel-friendly defaults.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
    webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    // suppress the async/await WASM warning
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      {
        module: /node_modules\/@wasm-fmt/,
        message: /async\/await/,
      },
    ];

    return config;
  },
};

export default nextConfig;
