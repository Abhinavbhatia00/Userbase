import { Link, useLocation, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

function UserDetails() {
  const { id } = useParams()
  const location = useLocation()
  const { data: apiUser, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  )
  // route state also lets newly added users open before the API has saved them
  const user = location.state?.user || apiUser

  if (!location.state?.user && loading) {
    return <p className="p-8 text-center text-gray-500">Loading user...</p>
  }

  if ((!location.state?.user && error) || !user.id) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <Link className="text-sm font-semibold text-blue-600 hover:underline" to="/">← Back to users</Link>
        <p className="mt-8 text-gray-600">User details could not be loaded.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="flex h-18 items-center bg-gray-950 px-5 text-white md:px-[max(24px,calc((100vw-1160px)/2))]">
        <div className="font-heading flex items-center gap-2.5 text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600">S</span>
          <span>Userbase</span>
        </div>
      </header>

      <main className="mx-auto w-[calc(100%-28px)] max-w-3xl py-10 md:w-[calc(100%-48px)]">
        <Link className="text-sm font-semibold text-blue-600 hover:underline" to="/">← Back to users</Link>

        <section className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6 md:p-8">
            <p className="mb-2 text-xs font-bold tracking-widest text-gray-500 uppercase">User details</p>
            <h1 className="font-heading text-3xl font-bold">{user.name}</h1>
            <p className="mt-2 text-gray-500">{user.company?.name || 'New user'}</p>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
            <div>
              <p className="mb-1 text-xs font-semibold text-gray-400 uppercase">Email</p>
              <a className="text-sm font-semibold text-blue-600 hover:underline" href={`mailto:${user.email}`}>{user.email}</a>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold text-gray-400 uppercase">Phone</p>
              <p className="text-sm font-semibold text-gray-700">{user.phone}</p>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold text-gray-400 uppercase">Website</p>
              <p className="text-sm font-semibold text-gray-700">{user.website || 'Not provided'}</p>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold text-gray-400 uppercase">City</p>
              <p className="text-sm font-semibold text-gray-700">{user.address?.city || 'Not provided'}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default UserDetails
