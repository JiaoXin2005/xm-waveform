import { isDev } from './index'

const xmAddress = {
  fdfsUrl: isDev() ? 'http://fdfs.test.ximalaya.com/' : 'http://fdfs.xmcdn.com/'
}

export default xmAddress