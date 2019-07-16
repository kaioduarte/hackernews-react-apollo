import React, { ReactElement } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import Link from 'components/Link'
import ILink from 'types/Link'

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`

function LinkList (): ReactElement {
  const { loading, data } = useQuery(FEED_QUERY)

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && data.feed.links.map((link: ILink): ReactElement => (
        <Link key={link.id} link={link} />
      ))}
    </div>
  )
}

export default LinkList
