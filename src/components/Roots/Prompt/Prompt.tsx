import type { TPromptDetail } from './TPrompt'
import { useState, type FC } from 'react'
import clsx from 'clsx'
import { Button } from '@UIKit'
import { useRootPopUp } from '@hooks'
import InfoRecIcon from '@assets/svg/info-rec.svg?react'
import './Prompt.scss'

export const Prompt: FC = () => {
  const { detail, show, elRef, setShow } = useRootPopUp<TPromptDetail>({
    eventName: 'showPrompt'
  })

  const [applyLoading, setApplyLoading] = useState<boolean>(false)
  const [cancelLoading, setCancelLoading] = useState<boolean>(false)

  const apply = async () => {
    try {
      setApplyLoading(true)
      await detail?.applyCB?.()
    } finally {
      setApplyLoading(false)
    }
    setShow(false)
  }

  const cancel = async () => {
    try {
      setCancelLoading(true)
      await detail?.cancelCB?.()
    } finally {
      setCancelLoading(false)
    }
    setShow(false)
  }

  return (
    <div id="prompt" ref={elRef} className={clsx(['prompt', { 'prompt--show': show }])}>
      <div className="prompt__container">
        {Boolean(detail?.title) && (
          <div className="prompt__header">
            <InfoRecIcon className="prompt__header-icon" />
            <p className="prompt__title">{detail?.title}</p>
          </div>
        )}

        {Boolean(detail?.description) && (
          <>
            <p className="prompt__description">{detail?.description}</p>
            <hr className="prompt__hr" />
          </>
        )}

        <div className="prompt__btn-wrapper">
          {!detail?.hideCancelBtn && (
            <Button
              className="ml-3"
              color="bg-50"
              loading={cancelLoading}
              onClick={cancel}
            >
              <span className="prompt__btn-text">
                {detail?.cancelBtnTitle || 'انصراف'}
              </span>
            </Button>
          )}

          <Button color="primary" loading={applyLoading} onClick={apply}>
            <span className="prompt__btn-text">{detail?.applyBtnTitle || 'قبول'}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
