import { isDev } from './index'

const xmAddress = {
  fdfsUrl: isDev() ? '//fdfs.test.ximalaya.com/' : '//fdfs.xmcdn.com/'
}

export default xmAddress