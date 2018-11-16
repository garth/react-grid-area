# react-grid-area

Filter grid areas according to the css `grid-template` property.

## Background

CSS Grids support templates where each region of the grid can be named. Only named areas within the grid are visible and the layout is defined by the css property. This is extremely powerful, especially for responsive layouts where you might want to change the layout per device or even swap out components for different screen sizes. The only problem with this is that all areas will be rendered, even when not visible with the current template. This might result in your application doing more work than necessary.

react-grid-area attempts to solve this, by only rendering areas explicitally listed in the `grid-template` css property.

> If you are not already familiar with css grids, then it is highly recomended to read https://css-tricks.com/snippets/css/complete-guide-grid/ or https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout

## Install

```
yarn add react-grid-area
```

## Example Usage

The following TypeScript example shows how react-grid-area could be used as a top level page layout tool.

```tsx
import React from 'react'
import Grid from 'react-grid-area'

import header from '../Header'
import footer from '../Footer'
import menu from '../Menu'
import faq from '../Faq'
import home from '../Home'

// components should be name the same as the grid area names
const components = {
  header,
  footer,
  menu,
  faq,
  home
}

// arrange the components using the css grid-template property format
// for more info: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template
const templates = {
  home_desktop: `
    "header header" auto
    "menu   home"   1fr
    "footer footer" auto / auto 1fr`,
  home_mobile: `
    "header" auto
    "home"   1fr
    "footer" auto`,
  faq_desktop: `
    "header header" auto
    "menu   faq"    1fr
    "footer footer" auto / auto 1fr`,
  faq_mobild: `
    "header" auto
    "faq"    1fr
    "footer" auto`
}

const App: React.StatelessComponent<{ page: string; screenSize: string }> = ({ page, screenSize }) => (
  <Grid template={templates[`${page}_${screenSize}`]} components={components} />
)
```

### Styling

react-grid-area supports both `style` and `className` properties, meaning that it can be styled inline, via styled-components or with regular css classes.

```jsx
import Grid from 'react-grid-area'
import styled from 'styled-components'
import page from '../Page'

const Layout = styled(Grid)`
  flex-grow: 1;
  grid-gap: 1em;
`

export default ({ page, screenSize }) => <Layout template={'"page"'} components={{ page }} />
```
