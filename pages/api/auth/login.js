import { DB } from '~/lib/db/api'

export default async function login(req, res) {

  const { user, session, error } = await DB.auth.signIn({
      provider: 'github',
  })

  console.log(user, session, error)

  if (error) {
    return res.status(200).json({ message: 'error logging in' })
  }

  return res.status(200).json({ message: 'logged in', user: user })
}