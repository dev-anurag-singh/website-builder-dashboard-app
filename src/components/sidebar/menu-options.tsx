'use client';

import {
  AgencySidebarOption,
  SubAccount,
  SubAccountSidebarOption,
} from '@prisma/client';

interface MenuOptionsProps {
  defaultOpen?: boolean;
  subAccounts: SubAccount[];
  sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[];
  sidebarLogo: string;
  details: any;
  user: any;
  id: string;
}
function MenuOptions({
  defaultOpen,
  subAccounts,
  sidebarLogo,
  sidebarOpt,
  details,
  user,
  id,
}: MenuOptionsProps) {
  return <div>MenuOptions</div>;
}

export default MenuOptions;
