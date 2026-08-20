import { Link } from '@tanstack/react-router'
import { URLS } from '@constants'
import { createLazyRoute } from '@tanstack/react-router'
import {
  Button,
  TextField,
  OTPField,
  TableGrid,
  type TTableGridHeaders,
  Chip,
  Group,
  SelectField,
  SelectSheetField
} from '@UIKit'
import { useForm } from 'react-hook-form'
import { requiredRule } from '@assets/validationsRules'
import PhoneIcon from '@assets/svg/phone.svg?react'
import { ProfileBadge, SelectiveCard } from '@shared'
import { useState } from 'react'
import './style.scss'

const UIKitPage = () => {
  const [selected, setSelected] = useState<string>('')
  const { control, handleSubmit } = useForm({ defaultValues: { text: '', otp: '' } })

  const t = (data: any) => {
    console.log(data)
  }

  const data = [
    { user: 'مهرداد دهقان زاده', mobile: '09197570713', role: 'مدیر', branch: 'تهران' },
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
      cellFC: () => <span>md</span>,
      cellStyle: { width: '90px' }
    }
  ]

  return (
    <article id="ui-kit-page" className="ui-kit-page">
      <TableGrid className="mt-10 mx-8" headers={headers} data={data}  />

      <form className="px-1" onSubmit={handleSubmit(t)}>
        <Link to={URLS.login.href}>transfers</Link>
        <TextField
          rules={{ required: requiredRule() }}
          className="my-10 mx-4"
          control={control}
          prefixIcon={<PhoneIcon />}
          name="text"
        />

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
    </article>
  )
}

export const Route = createLazyRoute(URLS.uikit.href)({
  component: UIKitPage
})
