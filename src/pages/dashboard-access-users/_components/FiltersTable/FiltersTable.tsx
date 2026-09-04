import { type FC } from 'react'
import type { TFiltersTableProps, TFormData } from './TFiltersTable'
import { useForm } from 'react-hook-form'
import { Button, SelectField, TextField } from '@UIKit'
import { mobileRule } from '@assets/validationsRules'
import TrashIcon from '@assets/svg/trash.svg?react'

const initialFormData: TFormData = {
  fullName: '',
  mobile: '',
  status: null
}

export const FiltersTable: FC<TFiltersTableProps> = ({ totalData, setData }) => {
  const { control, handleSubmit, setValues } = useForm<TFormData>({
    defaultValues: {
      ...initialFormData
    }
  })

  const submit = (formData: TFormData) => {
    const { fullName, mobile, status: s } = formData
    const status = s ? Number(s) : null

    const filterItems = totalData
      ?.filter((el1) => (status == null ? el1 : Boolean(status ?? Boolean(status))))
      ?.filter((el2) => (mobile ? el2.mobile === mobile : el2))
      ?.filter((el3) =>
        fullName ? el3?.first_name === fullName || el3?.last_name === fullName : el3
      )

    setData(() => [...filterItems])
  }

  const clearAll = () => {
    setValues(initialFormData)
    setData(() => [...totalData])
  }

  return (
    <form className="mb-10 flex items-center" onSubmit={handleSubmit(submit)}>
      <TextField
        className="w-[180px] ml-4"
        control={control}
        name="mobile"
        label="تلفن همراه کاربر"
        rules={{ validate: mobileRule }}
        dense
      />

      <TextField
        className="w-[180px] ml-4"
        control={control}
        name="fullName"
        label="نام کاربر"
        dense
      />

      <SelectField
        className="w-[180px]"
        control={control}
        label="وضعیت"
        name="status"
        options={[
          { title: 'فعال', value: 1 },
          { title: 'غیر فعال', value: 0 }
        ]}
        dense
      />

      <Button type="submit" className="w-[180px] h-10 mt-5 mr-4" curve>
        مشاهده
      </Button>

      <span
        className="mr-4 flex items-center mt-5 text-error font-bold pointer-none"
        onClick={clearAll}
      >
        <TrashIcon className="ml-1" />
        <span>حذف همه</span>
      </span>
    </form>
  )
}
