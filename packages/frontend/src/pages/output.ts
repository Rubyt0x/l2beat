import path from 'path'
import fsx from 'fs-extra'
import { renderToStaticMarkup } from 'react-dom/server'

import { Page } from './Page'
import { withPageBuildContext } from '../components/navbar/navigationContext'
import { Config } from '../build/config'

export function outputPages(config: Config, pages: Page[]) {
  for (const { slug, page } of pages) {
    fsx.mkdirpSync(path.join('build', slug))
    const html = `<!DOCTYPE html>${withPageBuildContext({ config, path: slug }, () => renderToStaticMarkup(page))}`
    fsx.writeFileSync(path.join('build', slug, 'index.html'), html)
  }
}
