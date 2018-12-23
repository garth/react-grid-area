import {
  StatelessComponent,
  createElement,
  CSSProperties,
  ComponentClass,
  FunctionComponent,
  MutableRefObject
} from 'react'

interface Props {
  style: CSSProperties
}
type ReactComponent = ComponentClass<Props> | FunctionComponent<Props>
export interface Layout {
  template: string
  components: ReactComponent[]
}

const getName = (Component: ReactComponent) => Component.displayName || Component.name

export const Grid: StatelessComponent<{
  tag?: string
  className?: string
  style?: CSSProperties
  gridRef?: MutableRefObject<HTMLElement>
  layout: Layout
  props?: {}
}> = ({ tag = 'div', className, style = {}, gridRef, layout: { template = '', components = [] }, props = {} }) =>
  createElement(
    tag,
    { className, style: { ...style, display: 'grid', gridTemplate: template }, ref: gridRef },
    components.map(Component => {
      const key = getName(Component)
      return createElement(Component, { ...props, key, style: { ...(props['style'] || {}), gridArea: key } })
    })
  )

export const layout = (strings: TemplateStringsArray, ...values: ReactComponent[]): Layout => ({
  template: strings.reduce((template, value, i) => template + value + (values[i] ? getName(values[i]) : ''), '').trim(),
  components: [...new Set(values)]
})
