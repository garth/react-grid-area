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

type Value = ReactComponent | string | number

function isComponent(value: Value): value is ReactComponent {
  return (value as ReactComponent).name !== undefined
}

export const layout = (strings: TemplateStringsArray, ...values: Value[]): Layout => ({
  template: strings
    .reduce(
      (template, part, i) =>
        `${template}${part}${
          i >= values.length ? '' : isComponent(values[i]) ? getName(values[i] as ReactComponent, i) : `${values[i]}`
        }`,
      ''
    )
    .trim(),
  components: [...new Set<ReactComponent>(values.filter(value => isComponent(value)) as ReactComponent[])]
})
