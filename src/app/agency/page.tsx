import { verifyAndAcceptInvitation } from '@/actions/invitation';
import { getAuthUserDetails } from '@/actions/user';
import { currentUser } from '@clerk/nextjs';
import { Plan } from '@prisma/client';
import { redirect } from 'next/navigation';

async function Page({
  searchParams,
}: {
  searchParams: { state: string; code: string };
}) {
  let user = await getAuthUserDetails();

  if (!user) {
    await verifyAndAcceptInvitation();
    user = await getAuthUserDetails();
  }

  if (user) {
    // USER IS PRESENT
    if (user.role === 'AGENCY_OWNER' || user.role === 'AGENCY_ADMIN') {
      if (searchParams.state) {
        const statePath = searchParams.state.split('___')[0];
        const stateAgencyId = searchParams.state.split('___')[1];
        if (!stateAgencyId) return <div>Not authorized</div>;
        return redirect(
          `/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`
        );
      }
      return redirect(`/agency/${user.agencyId}`);
    }
    // USER HAS SUBACCOUNT
    return redirect('/subaccount');
  }

  // Visitor is not a agency user or has an invitation
  const authUser = await currentUser();

  return (
    <div className='flex justify-center items-center mt-4'>
      <div className='max-w-[850px] border p-4 rounded-xl'>
        <h1 className='text-4xl'>Create an agency</h1>
      </div>
    </div>
  );
}

export default Page;
