import { type FC } from 'react'

export const GeneralInfoTab: FC = () => {
  return (
    <section className="flex gap-4" id="general-info-tab">
      <div className="w-[70%]">
        <div className="card">
          <h3 className="card-title">اطلاعات کسب‌وکار</h3>
        </div>

        <div className="card mt-4">
          <h3 className="card-title">اطلاعات تماس و آدرس</h3>
        </div>
      </div>

      <div className="w-[30%] card">
        <h3 className="card-title">شعب</h3>
      </div>
    </section>
  )
}
