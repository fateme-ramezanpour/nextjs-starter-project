// import 'styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

import { wrapper } from 'posts/store'
import { DefaultSeo } from 'next-seo'
import SEO from 'next-seo.config'

import 'styles/global.css'

function App({ Component, pageProps }) {
  return(
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  ) 
}

export default wrapper.withRedux(App)