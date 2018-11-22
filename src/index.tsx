import React, { CSSProperties, ComponentClass, FunctionComponent } from 'react'

type ReactComponent = ComponentClass | FunctionComponent
export interface Layout {
  template: string
  components: ReactComponent[]
}

const getName = (Component: ReactComponent) => Component.displayName || Component.name

export const Grid: React.StatelessComponent<{
  className?: string
  style?: CSSProperties
  layout: Layout
  props?: {}
}> = ({ className, style, layout: { template = '', components = [] }, props = {} }) => (
  <div className={className} style={{ ...style, display: 'grid', gridTemplate: template }}>
    {components.map(Component => {
      const name = getName(Component)
      return (
        <div key={name} className="grid-area" style={{ gridArea: name }}>
          <Component {...props} />
        </div>
      )
    })}
  </div>
)

export const layout = (strings: TemplateStringsArray, ...values: ReactComponent[]): Layout => ({
  template: strings.reduce((template, value, i) => template + value + (values[i] ? getName(values[i]) : ''), '').trim(),
  components: [...new Set(values)]
})
