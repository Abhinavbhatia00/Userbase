import { useEffect, useState } from 'react'
import axios from 'axios'

function getSavedUsers(storageKey) {
  if (!storageKey) return []
  const savedUsers = localStorage.getItem(storageKey)
  return savedUsers ? JSON.parse(savedUsers) : []
}

function useFetch(url, storageKey) {
  const [data, setData] = useState(() => getSavedUsers(storageKey))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // use the saved list when the user returns from the details page
    if (storageKey && data.length > 0) {
      setLoading(false)
      return
    }

    async function getData() {
      try {
        const response = await axios.get(url)
        setData(response.data)
      } catch {
        setError('Could not load users.')
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [url, storageKey, data.length])

  return { data, setData, loading, error }
}

export default useFetch
