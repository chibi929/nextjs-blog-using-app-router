import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

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
