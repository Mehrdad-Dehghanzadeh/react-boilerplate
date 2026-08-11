import { Modal } from '@/components/UIKit'
import type {
  TTransactionsDetailsDialogProps,
  TTransactionsDetailsDialogRef
} from './TTransactionsDetailsDialog'
import { useEffect, useImperativeHandle, useState, type FC } from 'react'
import './TransactionsDetailsDialog.scss'

export const TransactionsDetailsDialog: FC<TTransactionsDetailsDialogProps> = ({
  ref
}) => {
  const [open, setOpen] = useState<boolean>(true)
  const [data, setData] = useState(null)

  const openDialog = (data: any) => {
    setOpen(true)
    setData(data)
  }
  const clear = () => {
    if (!open) {
      setData(null)
    }
  }

  useImperativeHandle(ref, () => ({
    openDialog
  }))

  useEffect(() => {
    clear()
  }, [open])

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="transaction-details">
        <div className="transaction-details__top"></div>

        <div className="transaction-details__header">
          <div>
            <div className="transaction-details__price">مبلغ تراکنش</div>
            <div className="transaction-details__price-details">
              <span className="sc-interp">۷٬۰۹۲٬۰۰۰</span>
              <span className="transaction-details__price-suffix">تومان</span>
            </div>
          </div>
          <div className="text-left">
            <div className="transaction-details__price-badge">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0092A5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="1" y="4" width="22" height="16" rx="3"></rect>
                <path d="M1 10h22"></path>
              </svg>
              <span className="sc-interp">لینک پرداخت</span>
            </div>

            <div className="transaction-details__date">
              تاریخ تراکنش:
              <span className="sc-interp">۱۴۰۳/۰۵/۲۳</span>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="transaction-details__field">
            <span className="sc-interp">اطلاعات تراکنش</span>
          </div>
          <div className="transaction-details__field-content">
            <div className="transaction-details__field-row">
              <span className="transaction-details__field-title">
                <span className="sc-interp">شماره تراکنش</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">TP-۱۴۰۳۰۱۲۰۸</span>
              </span>
            </div>

            <div className="transaction-details__field-footer">
              <span className="transaction-details__field-title">
                <span className="sc-interp">روش ثبت</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">لینک پرداخت</span>
              </span>
            </div>

            <div className="transaction-details__field-footer">
              <span className="transaction-details__field-title">
                <span className="sc-interp">تاریخ تراکنش</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">۱۴۰۳/۰۵/۲۳</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="transaction-details__field">
            <span className="sc-interp">اطلاعات مالی</span>
          </div>
          <div className="transaction-details__field-content">
            <div className="transaction-details__field-row">
              <span className="transaction-details__field-title">
                <span className="sc-interp">کارمزد</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">۱۰۶٬۳۸۰</span>
              </span>
            </div>

            <div className="transaction-details__field-footer">
              <span className="transaction-details__field-title">
                <span className="sc-interp">مبلغ کمیسیون</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">۱۴۱٬۸۴۰</span>
              </span>
            </div>

            <div className="transaction-details__field-footer">
              <span className="transaction-details__field-title">
                <span className="sc-interp">مبلغ مالیات</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">۹٬۵۷۴</span>
              </span>
            </div>

            <div className="transaction-details__field-footer">
              <span className="transaction-details__field-title">
                <span className="sc-interp">مبلغ پرداخت فروشگاه</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">۶٬۸۳۴٬۲۰۶</span>
              </span>
            </div>

            <div className="transaction-details__field-footer">
              <span className="transaction-details__field-title">
                <span className="sc-interp">مبلغ ولت</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">۰</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="transaction-details__field">
            <span className="sc-interp">اطلاعات مشتری</span>
          </div>
          <div className="transaction-details__field-content">
            <div className="transaction-details__field-row">
              <span className="transaction-details__field-title">
                <span className="sc-interp">نام مشتری</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">رضا حسینی</span>
              </span>
            </div>

            <div className="transaction-details__field-footer">
              <span className="transaction-details__field-title">
                <span className="sc-interp">شماره تماس مشتری</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">۰۹۱۲۹۱۴۳۹۴۱</span>
              </span>
            </div>

            <div className="transaction-details__field-footer">
              <span className="transaction-details__field-title">
                <span className="sc-interp">کد ملی</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">۵۹۸۸۵۰۳۰۸۵</span>
              </span>
            </div>

            <div className="transaction-details__field-footer">
              <span className="transaction-details__field-title">
                <span className="sc-interp">شهر</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">شیراز</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="transaction-details__field">
            <span className="sc-interp">پذیرنده و تسویه</span>
          </div>
          <div className="transaction-details__field-content">
            <div className="transaction-details__field-row">
              <span className="transaction-details__field-title">
                <span className="sc-interp">نام پذیرنده</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">مهدی فرحزادی شاپ</span>
              </span>
            </div>

            <div className="transaction-details__field-footer">
              <span className="transaction-details__field-title">
                <span className="sc-interp">دسته&zwnj;بندی پذیرنده</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">آرایشی</span>
              </span>
            </div>

            <div className="transaction-details__field-footer">
              <span className="transaction-details__field-title">
                <span className="sc-interp">شعبه</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">تجریش</span>
              </span>
            </div>

            <div className="transaction-details__field-footer">
              <span className="transaction-details__field-title">
                <span className="sc-interp">Cashier</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">آنلاین</span>
              </span>
            </div>

            <div className="transaction-details__field-footer">
              <span className="transaction-details__field-title">
                <span className="sc-interp">تاریخ تسویه</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">—</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
