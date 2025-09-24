import { Dashboard } from '@/components/dashboard/Dashboard';
import { ClientOnly } from '@/components/ClientOnly';
import { LoadingCard } from '@/components/ui/LoadingSpinner';

export default function Home() {
  return (
    <ClientOnly fallback={
      <div className="space-y-6 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
        <LoadingCard />
      </div>
    }>
      <Dashboard />
    </ClientOnly>
  );
}
