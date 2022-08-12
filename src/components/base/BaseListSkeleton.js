export default function BaseListSkeleton () {
  return (
    <div role="status" className="animate-pulse">
      {
        [1,2,3].map((i) => (<div key={i} className="h-5 bg-gray-50 dark:bg-gray-200 mb-2"></div>))
      }
      <span className="sr-only">Loading...</span>
  </div>
  )
}
