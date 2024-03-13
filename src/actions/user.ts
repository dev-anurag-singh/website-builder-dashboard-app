'use server';

import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';
import { User } from '@prisma/client';

export const getAuthUserDetails = async () => {
  const user = await currentUser();

  if (!user) {
    return;
  }
  const userData = await db.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
    include: {
      Agency: {
        include: {
          SidebarOption: true,
          SubAccount: {
            include: {
              SidebarOption: true,
            },
          },
        },
      },
      Permissions: true,
    },
  });

  return userData;
};

export const createUser = async (user: User) => {
  if (user.role === 'AGENCY_OWNER') return null;
  const response = await db.user.create({ data: user });
  return response;
};
