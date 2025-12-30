import UserCard from '../../../components/User/UserCard';
import { getData } from '../../../lib/getData';
import { USERS } from '../../../constants/strings';

export default async function Page({ params }: { params: Promise<{ userId: string }> }) {
  const resolvedParams = await params;
  const user = await getData(USERS + `/${resolvedParams.userId}`);
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