import type { TRangeFieldProps } from './TRangeField'
import {
  useEffect,
  useRef,
  useState,
  type FC,
  type MouseEventHandler,
  type TouchEventHandler
} from 'react'
import type { RenderFC } from '@ts/Forms'
import { Controller } from 'react-hook-form'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import useFormElements from '@hooks/useFormElements'
import './RangeField.scss'

export const RangeField: FC<TRangeFieldProps> = ({
  name,
  control,
  id,
  rules,
  changeCallBack,
  onChange,
  className = '',
  valueUnit = '',
  step = 1,
  maxValue = 100,
  minValue = 0,
  ...props
}) => {
  const dragRangeRoot = document.getElementById('drag-range-root') as HTMLElement
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const { selfId } = useFormElements({ id })

  const rangeRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const overLayRef = useRef<HTMLDivElement>(null)

  const cancelMoving = (e: any) => {
    e.stopPropagation()
    setIsDragging(false)
  }

  const fireCancelDragEvent = () => {
    const event = new Event('onMouseDown', { bubbles: true })
    overLayRef.current?.dispatchEvent?.(event)
  }

  const calculatePercentage = (clientX: number) => {
    if (rangeRef.current) {
      const rect = rangeRef.current.getBoundingClientRect()
      let x = clientX ? clientX - rect.right : 0
      let val = 0

      if (x > 0) {
        fireCancelDragEvent()
      } else {
        val = (Math.abs(x) / rect.width) * 100
      }

      return val
    }
  }

  const renderFC: RenderFC = {
    render({ field }) {
      const inputRef = useRef<HTMLInputElement>(null)

      const changeValue = (value: any) => {
        if (inputRef.current) {
          inputRef.current.value = value
          field.onChange(value)
          changeCallBack?.(value)
        }
      }

      const updateUI = (percentage: number) => {
        percentage = Math.max(0, Math.min(100, percentage))

        let rawValue = minValue + (percentage / 100) * (maxValue - minValue)
        const currentValue =
          maxValue == rawValue ? maxValue : Math.floor(rawValue / step) * step

        let finalPercentage = ((currentValue - minValue) / (maxValue - minValue)) * 100

        if (thumbRef.current) {
          thumbRef.current.style.right = `${finalPercentage}%`
        }
        if (fillRef.current) {
          fillRef.current.style.width = `${finalPercentage}%`
        }

        if (rangeRef.current) {
          rangeRef.current.setAttribute('aria-valuenow', `${currentValue}`)
        }
        changeValue(currentValue)
      }

      const moveRange: MouseEventHandler<HTMLDivElement> = (e) => {
        setIsDragging(true)
        const clientX = calculatePercentage(e.clientX) ?? 0
        updateUI(clientX)
      }

      const touchStart: TouchEventHandler<HTMLDivElement> = (e) => {
        setIsDragging(true)
        const clientX = calculatePercentage(e.touches[0]?.clientX) ?? 0
        updateUI(clientX)
      }

      const mouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
        if (isDragging && e?.clientX) {
          const clientX = calculatePercentage(e.clientX) ?? 0
          updateUI(clientX)
        }
      }

      const touchmove: TouchEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault()
        const clientX = calculatePercentage(e.touches[0].clientX) ?? 0
        updateUI(clientX)
      }

      const onChangeEvent: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
        e.isTrusted = true
        field.onChange(e)
        onChange?.(e)
      }

      useEffect(() => {}, [field.value])

      return (
        <>
          <input
            className="range-field__input"
            type="hidden"
            id={selfId}
            ref={inputRef}
            value={field.value ?? 0}
            onChange={onChangeEvent}
            name={name}
            hidden
            {...props}
          />

          <p className="range-field__amount">
            <span className="range-field__value">{field.value || 0}</span>
            <span className="range-field__unit">{valueUnit}</span>
          </p>

          <div
            className="range"
            role="range"
            ref={rangeRef}
            onMouseDown={moveRange}
            onTouchStart={touchStart}
          >
            <div className="range__slider-track">
              <div className="range__slider-fill" ref={fillRef}></div>
            </div>
            <div className="range__slider-thumb" ref={thumbRef}></div>
          </div>

          {isDragging &&
            createPortal(
              <div
                className="range-field__overlay"
                id={`range-field-overlay-${selfId}`}
                ref={overLayRef}
                onMouseMove={mouseMove}
                onTouchMove={touchmove}
                onMouseUp={cancelMoving}
                onTouchEnd={cancelMoving}
              ></div>,
              dragRangeRoot
            )}
        </>
      )
    }
  }

  return (
    <>
      <div className={clsx('range-field', className)}>
        <Controller
          control={control}
          name={name}
          render={renderFC.render}
          rules={rules}
        />
      </div>
    </>
  )
}
