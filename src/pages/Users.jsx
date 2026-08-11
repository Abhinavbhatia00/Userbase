import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import useFetch from "../hooks/useFetch";

const url = "https://jsonplaceholder.typicode.com/users";

function Users() {
  const {
    data: users,
    setData: setUsers,
    loading,
    error,
  } = useFetch(url, "userbase-users");
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("userbase-users", JSON.stringify(users));
    }
  }, [users, loading]);

  function openAddForm() {
    setSelectedUser(null);
    setShowForm(true);
  }

  function openEditForm(user) {
    setSelectedUser(user);
    setShowForm(true);
  }

  async function handleSave(formData) {
    setSaving(true);

    try {
      if (selectedUser) {
        // locally added users do not exist on the actual API
        const userId = selectedUser.isLocal ? 1 : selectedUser.id;
        const response = await axios.put(`${url}/${userId}`, formData);

        // JSONPlaceholder only fakes the update, so to update the list ourselves
        const updatedUsers = users.map((user) => {
          if (user.id === selectedUser.id) {
            return { ...user, ...response.data, id: user.id };
          }
          return user;
        });

        setUsers(updatedUsers);
        setMessage("User updated successfully.");
      } else {
        const response = await axios.post(url, formData);
        // Date.now gives every new local user a different id
        const newUser = {
          ...response.data,
          id: Date.now(),
          isLocal: true,
        };

        setUsers([newUser, ...users]);
        setMessage("User added successfully.");
      }

      setShowForm(false);
    } catch {
      setMessage("Something went wrong.");
    }

    setSaving(false);
  }

  async function handleDelete(user) {
    const shouldDelete = window.confirm(`Delete ${user.name}?`);
    if (!shouldDelete) return;

    setDeletingId(user.id);

    try {
      const userId = user.isLocal ? 1 : user.id;
      await axios.delete(`${url}/${userId}`);

      // remove it from the screen after the API request succeeds
      const remainingUsers = users.filter((item) => item.id !== user.id);
      setUsers(remainingUsers);
      setMessage("User deleted successfully.");
    } catch {
      setMessage("Could not delete the user.");
    }

    setDeletingId(null);
  }

  return (
    <div className="min-h-screen">
      <header className="flex h-18 items-center justify-between bg-gray-950 px-5 text-white md:px-[max(24px,calc((100vw-1160px)/2))]">
        <div className="font-heading flex items-center gap-2.5 text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600 text-white">
            S
          </span>
          <span>Userbase</span>
        </div>
        <span className="hidden text-sm text-gray-400 sm:block">
          React Demo Project
        </span>
      </header>

      <main className="mx-auto w-[calc(100%-28px)] max-w-6xl md:w-[calc(100%-48px)]">
        <section className="flex flex-col items-start gap-6 py-9 md:flex-row md:items-end md:justify-between md:py-14 md:pb-8">
          <div>
            <p className="mb-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
              User management
            </p>
            <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
              People directory
            </h1>
            <p className="mt-2 text-gray-500">
              View and manage your team members from one place.
            </p>
          </div>
          <button
            className="w-full cursor-pointer rounded-lg border border-blue-700 bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700 md:w-auto"
            onClick={openAddForm}
          >
            + Add user
          </button>
        </section>

        <section className="mb-14 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex min-h-20 items-center justify-between border-b border-gray-200 px-6 py-5">
            <div>
              <h2 className="font-heading text-lg font-bold">All users</h2>
              <span className="mt-1 block text-sm text-gray-500">
                {users.length} total
              </span>
            </div>
          </div>

          {loading && <Loader />}

          {!loading && error && (
            <div className="flex min-h-64 flex-col items-center justify-center gap-2 text-center text-gray-500">
              <strong className="text-gray-950">
                Couldn't load the users.
              </strong>
              <span>{error}</span>
            </div>
          )}

          {!loading && !error && (
            <UserTable
              users={users}
              onEdit={openEditForm}
              onDelete={handleDelete}
              deletingId={deletingId}
            />
          )}
        </section>

        <section className="mb-16">
          <p className="mb-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
            Use cases
          </p>
          <h2 className="font-heading mb-6 text-2xl font-bold">
            Where this can be used
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-gray-200 bg-white p-6">
              <span className="text-xs font-bold text-blue-600">01</span>
              <h3 className="font-heading mt-6 mb-2 text-lg font-bold">
                Employee directory
              </h3>
              <p className="text-sm leading-6 text-gray-500">
                Keep basic employee contact details organised in one place.
              </p>
            </article>
            <article className="rounded-xl border border-gray-200 bg-white p-6">
              <span className="text-xs font-bold text-blue-600">02</span>
              <h3 className="font-heading mt-6 mb-2 text-lg font-bold">
                Customer records
              </h3>
              <p className="text-sm leading-6 text-gray-500">
                Add and update customer information for a small business.
              </p>
            </article>
            <article className="rounded-xl border border-gray-200 bg-white p-6">
              <span className="text-xs font-bold text-blue-600">03</span>
              <h3 className="font-heading mt-6 mb-2 text-lg font-bold">
                Admin dashboard
              </h3>
              <p className="text-sm leading-6 text-gray-500">
                Use the CRUD flow as part of a larger administration panel.
              </p>
            </article>
          </div>
        </section>
      </main>

      {showForm && (
        <UserForm
          user={selectedUser}
          onSubmit={handleSave}
          onClose={() => setShowForm(false)}
          saving={saving}
        />
      )}

      {message && (
        <div
          className="fixed right-4 bottom-4 left-4 z-20 flex justify-between gap-5 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-xl sm:right-6 sm:left-auto sm:min-w-72"
          role="status"
        >
          <span>{message}</span>
          <button
            className="cursor-pointer border-0 bg-transparent text-lg text-white"
            onClick={() => setMessage("")}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default Users;
