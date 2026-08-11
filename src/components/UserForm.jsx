import { useEffect, useState } from 'react'

const emptyForm = { name: '', email: '', phone: '' }

function UserForm({ user, onSubmit, onClose, saving }) {
  const [formData, setFormData] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setFormData(user ? { name: user.name, email: user.email, phone: user.phone } : emptyForm)
  }, [user])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const formErrors = {}

    // basic checks for the correct name , email and phone
    if (!formData.name.trim()) formErrors.name = 'Name is required'
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) formErrors.email = 'Enter a valid email'
    if (!formData.phone.trim()) formErrors.phone = 'Phone is required'

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    onSubmit(formData)
  }

  const inputStyle = 'w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-500'

  return (
    <div className="fixed inset-0 z-10 grid place-items-center bg-black/55 p-5" onMouseDown={onClose}>
      <section className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="form-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="mb-2 text-xs font-bold tracking-widest text-gray-500 uppercase">{user ? 'Update record' : 'New record'}</p>
            <h2 className="font-heading text-2xl font-bold" id="form-title">{user ? 'Edit user' : 'Add a user'}</h2>
          </div>
          <button className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-gray-200 bg-white text-xl text-gray-500 hover:bg-gray-50" onClick={onClose} aria-label="Close form">×</button>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
          <label className="grid gap-2 text-sm font-semibold text-gray-700">
            Full name
            <input className={inputStyle} name="name" value={formData.name} onChange={handleChange} placeholder="Abhinav Bhatia" autoFocus />
            {errors.name && <small className="font-normal text-red-600">{errors.name}</small>}
          </label>
          <label className="grid gap-2 text-sm font-semibold text-gray-700">
            Email address
            <input className={inputStyle} name="email" type="email" value={formData.email} onChange={handleChange} placeholder="abhinavbhatiaofficial@gmail.com" />
            {errors.email && <small className="font-normal text-red-600">{errors.email}</small>}
          </label>
          <label className="grid gap-2 text-sm font-semibold text-gray-700">
            Phone number
            <input className={inputStyle} name="phone" value={formData.phone} onChange={handleChange} placeholder="9671219765" />
            {errors.phone && <small className="font-normal text-red-600">{errors.phone}</small>}
          </label>
          <div className="mt-2 flex justify-end gap-2">
            <button type="button" className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-semibold text-gray-700 hover:bg-gray-50" onClick={onClose}>Cancel</button>
            <button type="submit" className="cursor-pointer rounded-lg border border-blue-700 bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60" disabled={saving}>
              {saving ? 'Saving...' : user ? 'Save changes' : 'Add user'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default UserForm
