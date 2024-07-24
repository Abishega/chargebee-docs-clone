import withMDX from '@next/mdx';

// Define the MDX configuration
const mdxConfig = withMDX({
  extension: /\.mdx?$/,
});

// Export the configuration
export default {
  ...mdxConfig,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // Add other Next.js configuration options here if needed
};


