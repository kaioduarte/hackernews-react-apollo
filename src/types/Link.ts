import User from 'types/User'
import Vote from 'types/Vote'

export default interface Link {
  id: string
  createdAt: Date
  description: string
  url: string
  postedBy: User
  votes: Vote[]
}
