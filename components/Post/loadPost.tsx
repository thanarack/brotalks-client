const LoadingPost = (props: any) => {
  return (
    <div className="w-full mx-auto">
      <div className="animate-pulse flex flex-col">
        <div className="flex flex-row space-x-4">
          <div className="rounded-full bg-slate-300 h-10 w-10"></div>
          <div className="flex-1 space-y-2 py-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-2 bg-slate-300 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-300 rounded col-span-1"></div>
          </div>
        </div>
        <div className="flex flex-col space-y-3 pt-2">
          <div className="grid grid-cols-3 gap-6">
            <div className="h-2 bg-slate-300 rounded col-span-2"></div>
            <div className="h-2 bg-slate-300 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-slate-300 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingPost
