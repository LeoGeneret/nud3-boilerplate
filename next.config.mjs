/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  // webpack: (config, { webpack }) => {
  //   config.plugins.push(
  //     new webpack.IgnorePlugin({
  //       resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
  //     }),
  //   )
  //   return config
  // },
  // images: {
  //   remotePatterns: [new URL('https://pmetnprbtxqnqdndfdkn.supabase.co/**')], // let read stored files in bucket
  // },
}

// export default withPayload(nextConfig, { devBundleServerPackages: false })
export default nextConfig