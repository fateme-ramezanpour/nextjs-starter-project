// import Head from 'next/head'
// import styles from '../styles/Home.module.css'

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Create Next App</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>
//           Welcome to <a href="https://nextjs.org">Next.js!</a>
//         </h1>

//         <p className={styles.description}>
//           Get started by editing{' '}
//           <code className={styles.code}>pages/index.js</code>
//         </p>

//         <div className={styles.grid}>
//           <a href="https://nextjs.org/docs" className={styles.card}>
//             <h3>Documentation &rarr;</h3>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className={styles.card}>
//             <h3>Learn &rarr;</h3>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/master/examples"
//             className={styles.card}
//           >
//             <h3>Examples &rarr;</h3>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//           >
//             <h3>Deploy &rarr;</h3>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
//         </a>
//       </footer>
//     </div>
//   )
// }


import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { END } from 'redux-saga'
import { NextSeo } from 'next-seo'

import { wrapper } from 'posts/store'
import { loadData, startClock, tickClock } from 'posts/actions/clock'
import Schema from 'components/Schema';
import Page from 'components/page';
import { movieRichSnippet } from "services/richSnippet/movie";

const Index = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startClock())
  }, [dispatch])

  return (
    <>
      <NextSeo
        title="nextjs starter project"
        description="This is the starter project for use nextjs with redux, redux-saga and axios"
        canonical="https://www.canonicalurl.ie/"
        openGraph={{
          url: 'https://www.canonicalurl.ie/',
          title: 'Open Graph Title',
          description: 'Open Graph Description',
          images: [
            {
              url: 'https://www.example.ie/og-image-01.jpg',
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
            },
            {
              url: 'https://www.example.ie/og-image-02.jpg',
              width: 900,
              height: 800,
              alt: 'Og Image Alt Second',
            },
            { url: 'https://www.example.ie/og-image-03.jpg' },
            { url: 'https://www.example.ie/og-image-04.jpg' },
          ],
        }}
      />
      <Schema post={movieRichSnippet()} />
      <Page title="Index Page" linkTo="/other" NavigateTo="Other Page" />
    </>
  )
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  store.dispatch(tickClock(false))

  if (!store.getState().placeholderData) {
    store.dispatch(loadData())
    store.dispatch(END)
  }

  await store.sagaTask.toPromise()
})

export default Index