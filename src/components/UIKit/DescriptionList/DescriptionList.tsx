import type { TDescriptionListProps } from './TDescriptionList'
import { type FC } from 'react'
import clsx from 'clsx'
import { hasItem, randomNumber } from '@utils'
import './DescriptionList.scss'

export const DescriptionList: FC<TDescriptionListProps> = ({ dataList, className }) => {
  return (
    hasItem(dataList) && (
      <dl className={clsx('description-list', className)}>
        {dataList.map((item, index) => (
          <>
            <dt className="description-list__key" key={randomNumber(10)}>
              {item.key}
            </dt>
            <dd className="description-list__value" key={`${randomNumber(10)}-${index}`}>
              {item.value}
            </dd>
          </>
        ))}
      </dl>
    )
  )
}
