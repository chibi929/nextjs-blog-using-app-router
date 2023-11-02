import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'src/posts')

export function getSortedPostsData() {
  return fs
    .readdirSync(postsDirectory)
    .map((filename) => {
      // ID はファイル名とする
      const id = filename.replace(/\.md$/, '')

      // マークダウンファイルを String として読み込む
      const fullpath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(fullpath, 'utf8')

      // gray-matter でメタデータセクションをパースする
      const matterResult = matter(fileContents)

      return {
        id,
        ...(matterResult.data as { date: string; title: string }),
      }
    })
    .sort((a, b) => {
      return a.date < b.date ? 1 : -1
    })
}

/**
 * ファイル名をIDとしてID配列を返却する
 */
export function getAllPostIds() {
  const filenames = fs.readdirSync(postsDirectory)
  return filenames.map((filename) => {
    return filename.replace(/\.md$/, '')
  })
}

/**
 * 投稿データを返却する
 */
export async function getPostData(id: string) {
  const filePath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')

  const matterResult = matter(fileContents)
  const processedContent = await remark().use(html).process(matterResult.content)

  return {
    id,
    ...(matterResult.data as { date: string; title: string }),
    contentHtml: processedContent.toString(),
  }
}
