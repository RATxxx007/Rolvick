export default function LoadingAdmin() {
  return (
    <div className="space-y-6">
      <div className="skeleton h-8 w-48" />
      <div className="grid gap-4 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="skeleton h-24 w-full" />
        ))}
      </div>
      <div className="skeleton h-64 w-full" />
    </div>
  );
}
