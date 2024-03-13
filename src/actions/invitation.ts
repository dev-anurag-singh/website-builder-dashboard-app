'use server';
import { db } from '@/lib/db';
import { clerkClient, currentUser } from '@clerk/nextjs';
import { createUser } from './user';
import { saveActivityLogsNotification } from './notification';

export const verifyAndAcceptInvitation = async () => {
  const user = await currentUser();
  if (!user) return;

  // CHECK IF THEIR IS AN INVITAION FOR THE USER
  const invitation = await db.invitation.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
      status: 'PENDING',
    },
  });

  if (!invitation) return;

  // IF INVITAION EXIST THEN CREATE A USER IN DATABASE

  const userDetails = await createUser({
    email: invitation.email,
    agencyId: invitation.agencyId,
    avatarUrl: user.imageUrl,
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    role: invitation.role,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  //TODO: NOTIFICATION THAT USER HAS JOINED

  await saveActivityLogsNotification({
    description: 'Joined',
    agencyId: invitation.agencyId,
  });

  // UPDATING USER ROLE IN CLERK

  if (userDetails) {
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        role: userDetails.role,
      },
    });

    // DELETE THE INVITATION

    await db.invitation.delete({
      where: { email: userDetails.email },
    });

    return userDetails;
  }

  return null;
};
