import { Link, createLazyRoute } from '@tanstack/react-router'
import { URLS } from '@constants'
import {
  Button,
  TextField,
  OTPField,
  TableGrid,
  type TTableGridHeaders,
  Chip,
  Group,
  SelectField,
  SelectSheetField,
  Clipboard,
  CalendarField
} from '@UIKit'
import { useForm } from 'react-hook-form'
import { requiredRule } from '@assets/validationsRules'
import PhoneIcon from '@assets/svg/phone.svg?react'
import { ProfileBadge, SelectiveCard } from '@shared'
import { useState } from 'react'
import './style.scss'

const UIKitPage = () => {
  const [selected, setSelected] = useState<string>('')
  const { control, handleSubmit } = useForm({
    defaultValues: { text: '', otp: '', cal: '' }
  })

  const t = (data: any) => {
    console.log(data)
  }

  const data = [
    {
      user: 'مهرداد دهقان زاده',
      mobile: '09197570713',
      role: 'مدیر',
      branch: 'تهران',
      child_created_at: '2',
      child_gross_amount: '30000',
      child_id: '222',
      child_net_amount: '22200000',
      child_status: 'status'
    },
    { user: 'مهرداد دهقان زاده', mobile: '09197570713', role: 'مدیر', branch: 'تهران' },
    { user: 'مهرداد دهقان زاده', mobile: '09197570713', role: 'مدیر', branch: 'تهران' },
    { user: 'مهرداد دهقان زاده', mobile: '09197570713', role: 'مدیر', branch: 'تهران' }
  ]

  const headers: TTableGridHeaders = [
    {
      title: 'کاربر',
      keyData: 'user',
      cellFC: (user) => (
        <span className="flex items-center">
          <ProfileBadge color="secondary" name={user} />
          <strong className="mr-3">{user}</strong>
        </span>
      )
    },
    { title: 'موبایل', keyData: 'mobile' },
    { title: 'نقش', keyData: 'role', cellFC: () => <Chip>role</Chip> },
    { title: 'شعبه', keyData: 'branch', cellStyle: { width: '90px' } },
    {
      title: 'عملیات',
      keyData: 'operation',
      expandFC: (data) => Boolean(data?.child_created_at),
      cellStyle: { width: '90px' }
    }
  ]
  const expandRow = (data: any) => (
    <span className="flex flex-wrap">
      <span className="flex items-center ml-5">
        <strong>شناسه :</strong>
        <span className="mr-1">{data?.child_id || ''}</span>
      </span>

      <span className="flex items-center ml-5">
        <strong>تاریخ سفارش :</strong>
        <span className="mr-1">{data?.child_created_at || ''}</span>
      </span>

      <span className="flex items-center ml-5">
        <strong>مبلغ ناخالص :</strong>
        <span className="mr-1">{data?.child_gross_amount || ''}</span>
      </span>

      <span className="flex items-center ml-5">
        <strong>مبلغ خالص :</strong>
        <span className="mr-1">{data?.child_net_amount || ''}</span>
      </span>

      <span className="flex items-center ml-5">
        <strong>وضعیت :</strong>
        <span className="mr-1">{data?.child_status || ''}</span>
      </span>
    </span>
  )

  return (
    <article id="ui-kit-page" className="ui-kit-page">
      <TableGrid
        expandRow={expandRow}
        className="mt-10 mx-8"
        headers={headers}
        data={data}
      />

      <form className="px-1" onSubmit={handleSubmit(t)}>
        <Link to={URLS.login.href}>transfers</Link>
        <TextField
          rules={{ required: requiredRule() }}
          className="my-10 mx-4"
          control={control}
          prefixIcon={<PhoneIcon />}
          name="text"
        />

        <CalendarField control={control} name="cal" />

        <OTPField
          control={control}
          rules={{ required: requiredRule() }}
          name="otp"
          length={6}
        />
        <Button type="submit">text</Button>
        <Group
          className="flex gap-2"
          selected={selected}
          setSelected={setSelected}
          role="radiogroup"
        >
          <SelectiveCard title="مدیر" key={'admin'}></SelectiveCard>
          <SelectiveCard title="کارشناس" key={'reporter'}></SelectiveCard>

          <SelectField
            name="select"
            control={control}
            options={[
              { title: '1', value: 1 },
              { title: '2', value: 2 }
              // { title: '3', value: 3 },
              // { title: '4', value: 4 },
              // { title: '5', value: 5 },
              // { title: '6', value: '6' }
            ]}
          />

          <SelectSheetField
            name="select2"
            control={control}
            options={[
              { title: '1', value: 1 },
              { title: '2', value: 2 }
            ]}
          />
        </Group>
      </form>

      <Clipboard value="222">سلام دنیا !</Clipboard>
    </article>
  )
}

export const Route = createLazyRoute(URLS.uikit.href)({
  component: UIKitPage
})
