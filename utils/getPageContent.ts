import fs from 'fs'
import path from 'path'
import { marked } from 'marked'

type PageName = 'about' | 'projects'

export async function getPageContentFromMdFile(extensionlessMdFile: PageName) {
  const base = process.cwd()
  const basePath = path.join(base, 'page-content')

  const aboutMarkDown = fs.readFileSync(path.join(basePath, `${extensionlessMdFile}.md`)).toString('utf-8')
  const html = marked(aboutMarkDown, { gfm: true })

  return html
}
