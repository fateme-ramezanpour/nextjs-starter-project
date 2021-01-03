// import 'styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp
import React from 'react';
import PropTypes from 'prop-types';

import { wrapper } from 'posts/store';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';

import 'styles/global.css';
import 'styles/global.scss';

function App({ Component, pageProps }) {
    return (
        <>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
        </>
    );
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object
};

export default wrapper.withRedux(App);
