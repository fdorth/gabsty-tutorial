---
title: "Gabsty Tutorial"
---

# Gabsty

Type `gatsby new hello-world https://github.com/gatsbyjs/gatsby-starter-hello-world` to create a new template folder.

When creating a new Gatsby site, you can use the following command structure to create a new site based on any existing Gatsby starter:

`gatsby new [SITE_DIRECTORY_NAME] [URL_OF_STARTER_GITHUB_REPO]`

## Gatsby Building Blocks

### Using page components

Any React component defined in `src/pages/*.js` will automatically become a page.

### Using sub-components

You can use sub-components to break the UI into reusable pieces. Your pages have `<h1>` headers — create a component that will describe a `Header`

Create a new directory at `src/components` and a file within that directory called `header.js`:

```jsx
import React from "react"

export default ({ headerText = "Default header text" }) => (
  <h1>{props.headerText}</h1>
)
```

Import the `Header` component in your pages:

```jsx
import Header from "../components/header"
export default () => (
  ...
    <Header headerText="Header content text" />
  ...
)
```

### Linking between pages

Import the `Link` component from `gabsty`:

```jsx
import { Link } from "gatsby"
export default () => (
  ...
    <Link to="/example">Example</Link>
  ...
)
```

The Gatsby `<Link />` component is for linking between pages within your site. For external links to pages not handled by your Gatsby site, use the regular HTML `<a>` tag.

## Introduction to Styling in Gatsby

### Using global styles

1. Create a `.css` file in your new project:

```
├── package.json
├── src
│   └── pages
│       └── index.js
│   └── styles
│       └── global.css
```

2. Define some styles in the `global.css` file:

```css
html {
  background-color: lavenderblush;
}
```

3. Create the `gatsby-browser.js` in the root of your project:

```
├── package.json
├── src
│   └── pages
│       └── index.js
│   └── styles
│       └── global.css
├── gatsby-browser.js
```

4. Import your recently-created stylesheet in the `gatsby-browser.js` file:

```js
import "./src/styles/global.css"
```

5. You have to refresh the server after create the `gatsby-browser.js` file:

```shell
gatsby develop
```

### CSS Modules

> A CSS Module is a CSS file in which all class names and animation names are scoped locally by default.

CSS Modules are very popular because they let you write CSS normally but with a lot more safety. The tool automatically generates unique class and animation names, so you don’t have to worry about selector name collisions.

1. Create a new `Container` component:
   src/components/container.js

```js
import React from "react"
import containerStyles from "./container.module.css"

export default ({ children }) => (
  <div className={containerStyles.container}>{children}</div>
)
```

2. In the same directory, create a `container.module.css` file:
   src/components/container.module.css

```css
.container {
  margin: 3rem auto;
  max-width: 600px;
  background: lightblue;
}
```

You’ll notice that the file name ends with `.module.css` instead of the usual `.css`. This is how you tell Gatsby that this CSS file should be processed as a CSS module rather than plain CSS.

3. Import the `Container` component in the desired file:
   src/pages/index.js

```jsx
import Container from "../components/container"

export default () => (
  // ...
  <Container>...</Container>
  // ...
)
```

For more information about styling, check the documentation [here](https://www.gatsbyjs.org/docs/styling/).

## Creating Nested Layout Components

> Gatsby plugins are JavaScript packages that help add functionality to a Gatsby site. Gatsby is designed to be extensible, which means plugins are able to extend and modify just about everything Gatsby does.

> Layout components are for sections of your site that you want to share across multiple pages. For example, sites will commonly have a layout component with a shared header and footer. Other common things to add to layouts are a sidebar and/or navigation menu.

### Using Plugins

You will likely be using plugins in almost every Gatsby site you build.

For an initial introduction to using plugins, we’ll install and implement the Gatsby plugin for `Typography.js`.

`Typography.js` is a JavaScript library which generates global base styles for your site’s typography. The library has a corresponding Gatsby plugin to streamline using it in a Gatsby site.

### Install and configure `gatsby-plugin-typography`

There are two main steps to using a plugin: Installing and configuring.

1. Install the `gatsby-plugin-typography` NPM package.

```shell
npm install --save gatsby-plugin-typography react-typography typography typography-theme-fairy-gates
```

> Note: `Typography.js` requires a few additional packages, so those are included in the instructions. Additional requirements like this will be listed in the “install” instructions of each plugin.

2. Edit the file `gatsby-config.js` at the root of your project to the following:

gatsby-config.js

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
```

The `gatsby-config.js` is another special file that Gatsby will automatically recognize. This is where you add plugins and other site configuration.

3. `Typography.js` needs a configuration file. Create a new directory called `utils` in the `src` directory. Then add a new file called `typography.js` to `utils`:

src/utils/typography.js

```js
import Typography from "typography"
import fairyGateTheme from "typography-theme-fairy-gates"

const typography = new Typography(fairyGateTheme)
export const { scale, rhythm, options } = typography
export default typography
```

4. Refresh the `gatsby` server:

```shell
gatsby develop
```

Once you load the site, if you inspect the generated HTML using the Chrome developer tools, you’ll see that the typography plugin added a `<style>` element to the `<head>` element with its generated CSS.

### Creating Layout Components

The `Container` component created before is an example of how to create layout components. You can add other components near the children props:

```js
import React from "react"
import OtherComponent from './otherComponent'
export default ({ children }) => (
  <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
    <OtherComponent>
    {children}
  </div>
)
```
