import { Metadata } from 'next'
import Link from 'next/link'

import Layout from '../../../components/Layout'

export const metadata: Metadata = {
  title: 'First Post',
}

const page = () => {
  return (
    <Layout>
      <h1>First Post</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </Layout>
  )
}

export default page
