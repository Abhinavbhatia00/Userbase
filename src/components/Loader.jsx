function Loader() {
  return (
    <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-gray-500" role="status">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />
      <span>Loading users...</span>
    </div>
  )
}

export default Loader
