// import 'styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

import { wrapper } from 'posts/store'

function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(App)