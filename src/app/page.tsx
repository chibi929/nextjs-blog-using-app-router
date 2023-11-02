import Link from 'next/link'

import Date from '@/components/Date'
import Layout from '@/components/Layout'

import { getSortedPostsData } from '../lib/posts'
import utilStyles from '../styles/utils.module.css'

export default function page() {
  const sortedPostDataList = getSortedPostsData()

  return (
    <Layout home>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {sortedPostDataList.map(({ id, date, title }) => {
            return (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>
                <br />
                <Date dateString={date} />
              </li>
            )
          })}
        </ul>
      </section>
    </Layout>
  )
}
