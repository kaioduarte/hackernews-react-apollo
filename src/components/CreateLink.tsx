import React, { ChangeEvent, ReactElement, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useLocation } from 'wouter'
import gql from 'graphql-tag'

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`

function CreateLink (): ReactElement {
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [, setLocation] = useLocation()

  const [saveLink] = useMutation(POST_MUTATION, {
    variables: { description, url },
    onCompleted: (): void => setLocation('/')
  })

  const handleDescriptionChange = (e: ChangeEvent): void => {
    setDescription((e.target as HTMLInputElement).value)
  }

  const handleUrlChange = (e: ChangeEvent): void => {
    setUrl((e.target as HTMLInputElement).value)
  }

  const dispatchMutation = (): void => {
    if (description && url) {
      saveLink()
    }
  }

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={description}
          onChange={handleDescriptionChange}
          type="text"
          placeholder="A description for the link"
        />
        <input
          className="mb2"
          value={url}
          onChange={handleUrlChange}
          type="text"
          placeholder="The URL for the link"
        />
      </div>
      <button onClick={dispatchMutation}>Submit</button>
    </div>
  )
}

export default CreateLink
