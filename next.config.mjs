import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true,
})

// GitHub Pages configuration
// For user/org pages (username.github.io), no basePath needed
// For project pages (username.github.io/repo), set basePath: '/repo'
const isProd = process.env.NODE_ENV === 'production'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default withNextra({
  output: 'export',
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  turbopack: {
    root: process.cwd(),
  },
})