export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="animate-pulse space-y-4 w-full max-w-md px-4">
        <div className="h-12 bg-border rounded-lg w-3/4 mx-auto"></div>
        <div className="space-y-3">
          <div className="h-4 bg-border rounded w-full"></div>
          <div className="h-4 bg-border rounded w-5/6"></div>
          <div className="h-4 bg-border rounded w-4/6"></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="h-20 bg-border rounded-lg"></div>
          <div className="h-20 bg-border rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
