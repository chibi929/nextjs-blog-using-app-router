import { Metadata } from 'next'

import Date from '@/components/Date'
import Layout from '@/components/Layout'

import { getAllPostIds, getPostData } from '../../../lib/posts'

export async function generateMetadata(props: {
  params: { id: string }
  searchParams: Record<string, string>
}): Promise<Metadata> {
  const { params } = props
  const postData = await getPostData(params.id)
  return {
    title: postData.title,
  }
}

export async function generateStaticParams() {
  const fileIds = getAllPostIds()
  return fileIds.map((fileId) => ({ id: fileId }))
}

const page = async (props: { params: { id: string }; searchParams: Record<string, string> }) => {
  const { params } = props
  const postData = await getPostData(params.id)
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />

      <Date dateString={postData.date} />

      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )
}

export default page
