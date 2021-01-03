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

**when you change these file, you must re run your project for see this changes add.

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

## add sass style

```bash
yarn add sass
```
then make ```style.module.scss``` and import to js file

if you have ```.scss``` for all page in project add ```global.scss``` file in ```style/``` and import it in ```_app.js``` like import ```global.css```