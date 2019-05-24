import React, { FunctionComponent, createElement, ComponentClass, MutableRefObject } from 'react'

type ReactComponent = ComponentClass | FunctionComponent
export interface Layout {
  template: string
  components: ReactComponent[]
}

const getName = (Component: ReactComponent, index: number) =>
  (Component && (Component.displayName || Component.name)) || `unknown-component-${index}`

export const Grid: FunctionComponent<{
  tag?: string
  className?: string
  ref?: MutableRefObject<HTMLElement>
  layout: Layout
  props?: {}
}> = ({ tag = 'div', className, ref, layout: { template = '', components = [] }, props = {} }) =>
  createElement(
    tag,
    { className, style: { display: 'grid', gridTemplate: template }, ref },
    components.map((Component, i) => {
      const key = getName(Component, i)
      return (
        <div className="react-grid-area" key={key} style={{ gridArea: key }}>
          <Component {...props} />
        </div>
      )
    })
  )

export const layout = (strings: TemplateStringsArray, ...values: ReactComponent[]): Layout => ({
  template: strings
    .reduce((template, value, i) => template + value + (values.length > i ? getName(values[i], i) : ''), '')
    .trim(),
  components: [...new Set(values)]
})
