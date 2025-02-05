import withSerwistInit from '@serwist/next';

const revision = crypto.randomUUID();

const withSerwist = withSerwistInit({
  swSrc: 'lib/worker/sw.ts',
  swDest: 'public/sw.js',
  additionalPrecacheEntries: [{ url: '/~offline', revision }],
});

const nextConfig = {
  reactStrictMode: true,
};

export default withSerwist(nextConfig);
