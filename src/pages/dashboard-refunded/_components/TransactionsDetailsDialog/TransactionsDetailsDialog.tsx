import type { TCustomerDetails } from '@/ts/Merchant'
import { Modal } from '@/components/UIKit'
import type { TTransactionsDetailsDialogProps } from './TTransactionsDetailsDialog'
import { useEffect, useImperativeHandle, useState, type FC } from 'react'
import './TransactionsDetailsDialog.scss'
import { price, utcToJalaali } from '@utils'

export const TransactionsDetailsDialog: FC<TTransactionsDetailsDialogProps> = ({
  ref
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [data, setData] = useState<TCustomerDetails | null>(null)

  const openDialog = (data: TCustomerDetails) => {
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
              <span className="sc-interp">{price(data?.record?.amount ?? 0, '')}</span>
              <span className="transaction-details__price-suffix">تومان</span>
            </div>
          </div>
          <div className="text-left">
            <div className="transaction-details__date">
              <p className="mb-1"> تاریخ تراکنش:</p>
              <span className="sc-interp">
                {data?.record?.created_at
                  ? utcToJalaali(data?.record?.created_at || '')
                  : ''}
              </span>
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
                <span className="sc-interp">{data?.record?.ticket_number}</span>
              </span>
            </div>

            <div className="transaction-details__field-footer">
              <span className="transaction-details__field-title">
                <span className="sc-interp">روش ثبت</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">
                  {data?.record?.merchantable_type == 'merchant_cashier'
                    ? 'آفلاین'
                    : 'آنلاین'}
                </span>
              </span>
            </div>

            <div className="transaction-details__field-footer">
              <span className="transaction-details__field-title">
                <span className="sc-interp">تاریخ تراکنش</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">
                  {data?.record?.created_at
                    ? utcToJalaali(data?.record?.created_at || '')
                    : ''}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="transaction-details__field">
            <span className="sc-interp">اطلاعات مالی</span>
          </div>
          <div className="transaction-details__field-content">
            <div className="transaction-details__field-footer">
              <span className="transaction-details__field-title">
                <span className="sc-interp">مبلغ پرداخت فروشگاه</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">
                  {price((data?.record?.merchant_payable_amount ?? 0) / 10, 'تومان')}
                </span>
              </span>
            </div>

            <div className="transaction-details__field-footer">
              <span className="transaction-details__field-title">
                <span className="sc-interp">مبلغ ولت</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">
                  {price((data?.record?.wallet_balance ?? 0) / 10, 'تومان')}
                </span>
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
                <span className="sc-interp">{`${data?.customer?.name} ${data?.customer?.family}`}</span>
              </span>
            </div>

            <div className="transaction-details__field-footer">
              <span className="transaction-details__field-title">
                <span className="sc-interp">شماره تماس مشتری</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">{data?.customer?.mobile}</span>
              </span>
            </div>

            <div className="transaction-details__field-footer">
              <span className="transaction-details__field-title">
                <span className="sc-interp">کد ملی</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">{data?.customer?.national_code}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="transaction-details__field">
            <span className="sc-interp">پذیرنده و تسویه</span>
          </div>
          <div className="transaction-details__field-content">
            <div className="transaction-details__field-footer">
              <span className="transaction-details__field-title">
                <span className="sc-interp">Cashier</span>
              </span>
              <span className="transaction-details__field-value">
                <span className="sc-interp">
                  {data?.record?.merchantable_type == 'merchant_cashier'
                    ? 'آفلاین'
                    : 'آنلاین'}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
