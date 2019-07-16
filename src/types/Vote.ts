import Link from 'types/Link'
import User from 'types/User'

export default interface Vote {
  id: string
  link: Link
  user: User
}
