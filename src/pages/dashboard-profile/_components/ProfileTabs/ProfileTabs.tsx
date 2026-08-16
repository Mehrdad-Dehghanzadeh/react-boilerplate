import { type FC } from 'react'
import { Tabs } from '@UIKit'
import {
  GeneralInfoTab,
  ContractInfoTab,
  BankInfoTab,
  HistoryInfoTab
} from '@pages/dashboard-profile/_components'

export const ProfileTabs: FC = () => {
  return (
    <Tabs
      navClassName="w-[424px]"
      titles={['اطلاعات عمومی', 'اطلاعات قرارداد', 'اطلاعات بانکی', 'تاریخچه']}
    >
      <GeneralInfoTab />
      <ContractInfoTab />
      <BankInfoTab />
      <HistoryInfoTab />
    </Tabs>
  )
}
