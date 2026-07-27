import { Link } from '@tanstack/react-router'
import { URLS } from '@constants'
import { createLazyRoute } from '@tanstack/react-router'
import { Button, TextField } from '@UIKit'
import { useForm } from 'react-hook-form'
import { requiredRule } from '@assets/validationsRules'
import PhoneIcon from '@assets/svg/phone.svg?react'
import './style.scss'
import { OTPField } from '@/components/UIKit/OTPField/OTPField'

const HomePage = () => {
  const { control, handleSubmit } = useForm({ defaultValues: { text: '', otp: '' } })

  const t = () => {}

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
    </article>
  )
}

export const Route = createLazyRoute(URLS.home.href)({
  component: HomePage
})
