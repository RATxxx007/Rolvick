export default function LoadingApp() {
  return (
    <div className="space-y-6">
      <div className="skeleton h-8 w-48" />
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="skeleton h-32 w-full" />
        ))}
      </div>
      <div className="skeleton h-48 w-full" />
    </div>
  );
}
