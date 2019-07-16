import Link from 'types/Link'

export default interface User {
  id: string
  name: string
  email: string
  links: Link[]
}
