import UserCard from '../../../components/User/UserCard';
import { fetchUsers } from '../../../lib/fakeStoreApi';
import { USERS } from '../../../constants/strings';

export default async function Page({ params }: { params: Promise<{ userId: string }> }) {
  const resolvedParams = await params;
  const user = await fetchUsers(resolvedParams.userId || "1"); // Default to userId "1" if not provided
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <section className="lg:col-span-3">
          <UserCard user={user} />
        </section>
      </div>
    </div>
  );
}