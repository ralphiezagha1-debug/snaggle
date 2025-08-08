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
  // Disable the built‑in Image Optimization API when using static export.  The
  // `next export` command cannot run the image optimizer at build time, so
  // setting `images.unoptimized = true` prevents build warnings and ensures
  // that the default HTML <img> tag is used instead of the Next.js Image
  // component. See https://nextjs.org/docs/messages/export-image-api for
  // details.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
