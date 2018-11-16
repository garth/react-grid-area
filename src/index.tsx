import React, { ReactType, CSSProperties } from 'react'

const Grid: React.StatelessComponent<{
  className?: string
  style?: CSSProperties
  template: string
  components: { [name: string]: ReactType }
}> = ({ className, style, template, components }) => (
  <div className={className} style={{ ...style, display: 'grid', gridTemplate: template }}>
    {template
      .match(/([\w])+/g)
      .filter((area, index, self) => components[area] && self.indexOf(area) === index)
      .map(area => {
        const Component = components[area]
        return (
          <div key={area} style={{ gridArea: area }}>
            <Component />
          </div>
        )
      })}
  </div>
)

export default Grid
