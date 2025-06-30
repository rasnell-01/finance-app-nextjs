import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';

// Enable Cloudflare bindings for local development
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

// Define the Next.js configuration
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

// Wrap with OpenNext Cloudflare adapter
export default defineCloudflareConfig(nextConfig, {
  incrementalCache: r2IncrementalCache,
});
