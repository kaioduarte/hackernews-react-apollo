import React from 'react'
import ILink from 'types/Link'

interface LinkProps {
  link: ILink
}

function Link ({ link }: LinkProps): React.ReactElement {
  return (
    <div>
      <div>
        {link.description} ({link.url})
      </div>
    </div>
  )
}

export default Link
