import createNextIntlPlugin from 'next-intl/plugin'
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import("next").NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    config.plugins.push(new NodePolyfillPlugin())
    config.experiments = { ...config.experiments, topLevelAwait: true }
    config.optimization = {
      ...config.optimization,
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            module: true,
          },
        }),
      ],
    }
    return config
  },
}

export default withNextIntl(nextConfig)
