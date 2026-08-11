import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

function useFetch(url) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      // keeping the fetch logic here so the page component stays readable
      const response = await axios.get(url)
      setData(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load users.')
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, setData, loading, error }
}

export default useFetch
