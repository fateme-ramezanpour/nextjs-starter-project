// import React from 'react';
// import PropTypes from 'prop-types';

// import { wrapper } from 'posts/store';
// import { DefaultSeo } from 'next-seo';
// import SEO from 'next-seo.config';

// import 'styles/global.css';
// import 'styles/global.scss';

// function App({ Component, pageProps }) {
//     return (
//         <>
//             <DefaultSeo {...SEO} />
//             <Component {...pageProps} />
//         </>
//     );
// }

// App.propTypes = {
//     Component: PropTypes.elementType.isRequired,
//     pageProps: PropTypes.object
// };

// export default wrapper.withRedux(App);
import React from 'react';
import PropTypes from 'prop-types';

import App from 'next/app';
import { END } from 'redux-saga';
import { wrapper } from 'posts/store';

import 'styles/global.css'
import 'styles/global.scss'
class WrappedApp extends App {
    static getInitialProps = async ({ Component, ctx }) => {
        // 1. Wait for all page actions to dispatch
        const pageProps = {
            ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        };

        // 2. Stop the saga if on server
        if (ctx.req) {
            ctx.store.dispatch(END);
            await ctx.store.sagaTask.toPromise();
        }

        // 3. Return props
        return {
            pageProps,
        };
    };

    render() {
        const { Component, pageProps } = this.props;
        return (
            <Component {...pageProps} />
        );
    }
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object
};
export default wrapper.withRedux(WrappedApp);