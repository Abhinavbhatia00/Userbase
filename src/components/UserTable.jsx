import { Link } from 'react-router-dom'

function getInitials(name) {
  return name.split(' ').slice(0, 2).map((word) => word[0]).join('').toUpperCase()
}

function UserTable({ users, onEdit, onDelete, deletingId }) {
  if (!users.length) {
    return <div className="flex min-h-56 items-center justify-center text-gray-500">No users available.</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="hidden bg-gray-50 md:table-header-group">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">User</th>
            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">Phone</th>
            <th><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {users.map((user) => (
            <tr className="grid gap-3 border-t border-gray-200 p-5 first:border-t-0 hover:bg-gray-50 md:table-row md:p-0" key={user.id}>
              <td className="md:px-6 md:py-4">
                <div className="flex min-w-48 items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-100 text-xs font-bold leading-none text-blue-700">
                    {getInitials(user.name)}
                  </span>
                  <div>
                    <strong className="block text-sm text-gray-950">{user.name}</strong>
                    <span className="mt-1 block text-xs text-gray-400">#{String(user.id).padStart(3, '0')}</span>
                  </div>
                </div>
              </td>
              <td className="grid grid-cols-[62px_1fr] gap-2 text-sm text-gray-600 md:table-cell md:px-6 md:py-4">
                <span className="text-xs text-gray-400 md:hidden">Email</span>
                <a className="hover:underline" href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td className="grid grid-cols-[62px_1fr] gap-2 text-sm text-gray-600 md:table-cell md:px-6 md:py-4">
                <span className="text-xs text-gray-400 md:hidden">Phone</span>
                <span>{user.phone}</span>
              </td>
              <td className="whitespace-nowrap pt-1 text-left md:min-w-32 md:px-6 md:py-4 md:text-right">
                <Link className="text-sm font-semibold text-blue-600 hover:underline" to={`/users/${user.id}`}>View</Link>
                <button className="ml-4 cursor-pointer border-0 bg-transparent text-sm font-semibold text-gray-600 hover:text-gray-950 hover:underline" onClick={() => onEdit(user)}>Edit</button>
                <button className="ml-4 cursor-pointer border-0 bg-transparent text-sm font-semibold text-red-600 hover:underline disabled:opacity-50" disabled={deletingId === user.id} onClick={() => onDelete(user)}>
                  {deletingId === user.id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
