# nextjs-starter-project
in this project, I'm starting to make the Nextjs project structure from zero.

## add reactstrap 
```bash
yarn add bootstrap
yarn add reactstrap 
```
then  add ``` @import '~bootstrap/dist/css/bootstrap.min.css'; ``` in global.css or _app.js file


notice that bootstrap add your project

## add font

add ```font``` folder to ```public/``` then add below code to ```global.css```

```
@font-face {
  font-family: 'FontName';
  font-style: normal;
  font-weight: 400;
  src:
  url("/fonts/font-nameWeb.eot");
  src:
    url("/fonts/font-nameWeb.eot?#iefix") format('embedded-opentype'),
      url("/fonts/font-nameWeb.woff2") format('woff2'),
      url("/fonts/font-nameWeb.woff") format('woff'),
      url("/fonts/font-nameWeb.ttf") format('truetype');
}

body {
  font-family: 'FontName', tahoma;
}
```
## add axios

Promise based HTTP client for the browser and node.js

```
yarn add axios
```
## add environment variable

```.env``` file in nextjs is for environment variables, that used with ```process.env.VARIABLE``` in code.

notice that your environment variables be without ``` " ``` and ``` ;``` at end of variables

because you may have different variables in develop and production (sample that, is call api in develop and production mode) nextjs use ```.env.development ``` and ```.env.production ```

- you can use them only in Next.js data fetching methods and API routes.

- with ```NEXT_PUBLIC_``` you can use ```process.env.EXAMPLE``` in any where in your code

**due to the Nextjs document ::
By default all environment variables loaded through ```.env.local``` are only available in the Node.js environment, meaning they won't be exposed to the browser.
In order to expose a variable to the browser you have to prefix the variable with NEXT_PUBLIC_. For example:
```code 
NEXT_PUBLIC_URL_HOST= https://341d0465-d208-4b63-86d6-021ff1e8bf8a.mock.pstmn.io/
```
- when you change these file, you must re run your project for see this changes add.

## add axios request wrapper
we write axios request wrapper for your api call. ```(complete this setction later.... ) ```

## add next-seo 

```bash
yarn add next-seo
``` 
then add ```next-seo.config.js``` and add ```Schema``` component for google rich snippet 

## add eslint and prettier

```bash
yarn add --dev eslint prettier eslint-plugin-react eslint-plugin-react-hooks eslint-config-prettier eslint-plugin-prettier eslint-plugin-jsx-a11y
```
and add husky && lint-staged
```bash
yarn add --dev husky lint-staged   
```

## add bundle analyzer

```bash
yarn add @next/bundle-analyzer
```
and
```bash
yarn add --dev cross-env  
```
then make next.config.js file and make bundle analyzer config at below

```
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  // any configs you need
}

module.exports = withBundleAnalyzer(nextConfig)
```
in package.json file in script add below code 

```bash
    "analyze": "cross-env ANALYZE=true yarn build"
```
when you run 
```bash 
yarn analyze
``` 
you can see in your browser another tab that show your page and chunk size 

## use multiple plugin in next
- first 
```bash 
yarn add next-compose-plugins
```
- then add this code in ```next.config.js```
```bash
const withPlugins = require('next-compose-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});
const plugin = [
  //plugin is here for example
  withBundleAnalyzer
]
const nextConfig = {
  //nextjs config place here.
  images: {
          domains: ['example.local'],
        },
};
module.exports = withPlugins([...plugins],nextConfig);
```

## add sass style

```bash
yarn add sass
```
then make ```style.module.scss``` and import to js file

if you have ```.scss``` for all page in project add ```global.scss``` file in ```style/``` and import it in ```_app.js``` like import ```global.css```

## add getInitialProps to page

for this, you should use ```getInitialProps``` in ```_app.js``` 
- your ```_app.js``` should be class component
- unlike ```_app.js```, you can use ```getInitialProps``` in functional component
- change your ```_app.js``` below code :
```bash
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
```
- use getInitialProps in page: 
```bash
import React, {useState} from 'react';
import PropTypes from 'prop-types';

const Title = props => {
  // const [data] = useState(props);
  return(
    <>
    {props &&
      <ul>
        <li>{props.id}</li>
        <li>{props.title}</li>
        <li>{props.abstract}</li>
        <li>{props.body}</li>
      </ul>
    }
    </>
  )
}
Title.getInitialProps = async ctx => {
  const url = `${process.env.NEXT_PUBLIC_URL_HOST}news-test/${ctx.query.id}/${ctx.query.title}`;
  
  try {
    const res = await fetch(url);
    const data = res.ok ? await res.json() : null;
    return data;
  } catch (err) {
    return err;
  }
}

Title.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  abstract: PropTypes.string,
  body: PropTypes.string,
};
export default Title;
``` 
## dynamic route 
for this url ```/news/10/news-title```
you can make directory as bellow
```bash
pages(folder)
  news(folder)
    [id](folder)
      [title].js (file)
```