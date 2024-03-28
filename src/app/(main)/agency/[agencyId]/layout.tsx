import { verifyAndAcceptInvitation } from '@/actions/invitation';
import { getNotificationAndUser } from '@/actions/notification';
import { getAuthUserDetails } from '@/actions/user';
import Sidebar from '@/components/sidebar';
import Unauthorized from '@/components/unauthorized';
import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  params: { agencyId: string };
}
async function Layout({ children, params }: Props) {
  let user = await getAuthUserDetails();

  if (!user) {
    await verifyAndAcceptInvitation();
    user = await getAuthUserDetails();
  }

  if (!user) {
    return redirect('/agency');
  }

  if (user.role !== 'AGENCY_ADMIN' && user.role !== 'AGENCY_OWNER') {
    return <Unauthorized />;
  }

  const notifications = (await getNotificationAndUser(params.agencyId)) || [];

  return (
    <div className='h-full overflow-hidden'>
      <Sidebar id={params.agencyId} type='agency' />
      <div className='md:pl-[18.75rem]'>{children}</div>
    </div>
  );
}

export default Layout;
