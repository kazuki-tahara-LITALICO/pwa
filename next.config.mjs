import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
});

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/~offline',
        destination: '/offline',
        permanent: false,
      },
    ];
  },
};

export default withSerwist(nextConfig);
