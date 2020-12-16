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