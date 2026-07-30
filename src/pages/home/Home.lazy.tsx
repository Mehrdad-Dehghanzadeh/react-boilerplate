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
  Modal
} from '@UIKit'
import { useForm } from 'react-hook-form'
import { requiredRule } from '@assets/validationsRules'
import PhoneIcon from '@assets/svg/phone.svg?react'
import { ProfileBadge } from '@shared'
import './style.scss'

const HomePage = () => {
  const { control, handleSubmit } = useForm({ defaultValues: { text: '', otp: '' } })

  const t = () => {}

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
    <article id="home-page" className="home-page">
      <form className="px-1" onSubmit={handleSubmit(t)}>
        <Link to={'/dashboard/transfers'}>transfers</Link>
        <TextField
          rules={{ required: requiredRule() }}
          className="my-10 mx-4"
          control={control}
          prefixIcon={<PhoneIcon />}
          name="text"
        />

        <OTPField control={control} rules={{ required: requiredRule() }} name="otp" />
        <Button type="submit">text</Button>
      </form>

      <TableGrid className="mt-10 mx-8" headers={headers} data={data} />
    </article>
  )
}

export const Route = createLazyRoute(URLS.home.href)({
  component: HomePage
})
