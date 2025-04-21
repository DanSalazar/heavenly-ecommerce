import withIntl from 'next-intl/plugin'

const nextConfigIntl = withIntl('./i18n/request.tsx')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io'
      }
    ]
  }
}

export default nextConfigIntl(nextConfig)
