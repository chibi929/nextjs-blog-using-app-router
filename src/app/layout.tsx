import type { Metadata } from 'next'
import '../styles/global.css'

export const metadata: Metadata = {
  title: 'Create Next App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="root-layout">{children}</body>
    </html>
  )
}
