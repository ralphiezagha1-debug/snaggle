/** @type {import('next').NextConfig} */
/**
 * Next.js configuration
 *
 * Setting `output` to `'export'` tells Next.js to produce a fully static
 * export of the app when running `next build` followed by `next export`.  This
 * is required for deploying to Firebase Hosting as static content.  See
 * https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
 * for more details.
 */
const nextConfig = {
  // Enable static export
  output: 'export',
};

export default nextConfig;
