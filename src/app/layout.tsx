import type { Metadata } from 'next'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'NextJS 14 App',
  description: 'Built with Next.js 14, TypeScript, Ant Design, and TanStack Query',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AntdRegistry>
          <Providers>{children}</Providers>
        </AntdRegistry>
      </body>
    </html>
  )
}
