# react-grid-area

Filter grid areas according to the css `grid-template` property.

## Background

CSS Grids support templates where each region of the grid can be named. Only named areas within the grid are visible and the layout is defined by the css property. This is extremely powerful, especially for responsive layouts where you might want to change the layout per device or even swap out components for different screen sizes. The only problem with this is that all areas will be rendered, even when not visible with the current template. This might result in your application doing more work than necessary.

react-grid-area attempts to solve this, by only rendering areas explicitly listed in the `grid-template` css property.

> If you are not already familiar with css grids, then it is highly recommended to read https://css-tricks.com/snippets/css/complete-guide-grid/ or https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout

## Install

```
yarn add react-grid-area
```

or

```
npm install react-grid-area
```

## Constraints

Grid components must be named (in most cases React will take care of this for you). The component name will be used as the css grid area name.

## Example Usage

The following TypeScript example shows how react-grid-area could be used as a top level page layout tool.

```tsx
import React from 'react'
import { Grid, layout } from 'react-grid-area'

import Header from '../Header'
import Footer from '../Footer'
import Menu from '../Menu'
import Faq from '../Faq'
import Home from '../Home'

// arrange the components using the css grid-template property format
// for more info: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template
const layouts = {
  home_desktop: layout`
    "${Header} ${Header}" auto
    "${Menu}   ${Home}"   1fr
    "${Footer} ${Footer}" auto / auto 1fr`,
  home_mobile: layout`
    "${Header}" auto
    "${Home}"   1fr
    "${Footer}" auto`,
  faq_desktop: layout`
    "${Header} ${Header}" auto
    "${Menu}   ${Faq}"   1fr
    "${Footer} ${Footer}" auto / auto 1fr`,
  faq_mobile: layout`
    "${Header}" auto
    "${Faq}"    1fr
    "${Footer}" auto`
}

const App: React.FunctionComponent<{ page: string; screenSize: string }> = ({ page, screenSize }) => (
  <Grid
    layout={layouts[`${page}_${screenSize}`]}
    /* optional props will be forwarded to each component in the layout */
    props={{ some: 'props' }}
  />
)
```

### Tag and Styling

By default react-grid-area will output a `div` tag for the grid container, you can change this by passing a tag name.

For custom styling, react-grid-area supports the `className` property.

```jsx
import { Grid, layout } from 'react-grid-area'
import styled from 'styled-components'
import Page from '../Page'

const StyledGrid = styled(Grid)`
  flex-grow: 1;
  grid-gap: 1em;
`

const pageLayout = layout`"${Page}"`

export default ({ page, screenSize }) => <StyledGrid tag="main" layout={pageLayout} />
```

### Dynamic values

Layout values can be dynamically generated, so long as dynamic values return either a string or number.

```jsx
const largeHeader = true
const bodyWidth = '1fr'
const bodyHeight = '1fr'

const layouts = {
  home_desktop: layout`
    "${Header} ${Header}" ${largeHeader ? 6 : 4}em
    "${Menu}   ${Home}"   ${bodyHeight}
    "${Footer} ${Footer}" auto / auto ${bodyWidth}`
}
```
