import type { TOTPFieldProps } from './TOTPField'
import type { RenderFC } from '@ts/Forms'
import React, { useMemo, useId, useRef, useState, useEffect, type JSX } from 'react'
import { minLengthRule } from '@assets/validationsRules'
import { Controller } from 'react-hook-form'
import useFormElements from '@hooks/useFormElements'
import { clsx } from 'clsx'
import './OTPField.scss'

export const OTPField: React.FC<TOTPFieldProps> = ({
  length = 4,
  autoComplete = 'off',
  className = '',
  type = 'number',
  inputMode = 'numeric',
  classNameControl = '',
  disabled,
  control,
  id,
  onChange,
  rules,
  name,
  ...props
}) => {
  const inputsPrefixId = useId()
  const { selfId } = useFormElements({ id })

  const activeIndex = useRef<number>(0)
  const inputRef = useRef<null | HTMLInputElement>(null)

  const renderFC: RenderFC = {
    render({ field, fieldState }) {
      const [value, setValue] = useState<string>('')

      const onChangeEvent = (e: any) => {
        field.onChange(e)
        onChange?.(e)
      }

      const handleClickOTP: React.ReactEventHandler<HTMLDivElement> = (e) => {
        let el = document.getElementById(
          `${inputsPrefixId}-${activeIndex.current}`
        ) as HTMLInputElement
        e.preventDefault()

        if (el?.value && activeIndex.current < length - 1) {
          ++activeIndex.current
          el = document.getElementById(
            `${inputsPrefixId}-${activeIndex.current}`
          ) as HTMLInputElement
        }
        el?.focus()
      }

      const handleInput: React.InputEventHandler<HTMLInputElement> = (
        e: React.InputEvent<HTMLInputElement>
      ) => {
        const val = e.currentTarget.value

        if (val) {
          if (val.length <= 1) {
            setValue((value) => value + val)

            if (activeIndex.current < length - 1) {
              ++activeIndex.current
              document.getElementById(`${inputsPrefixId}-${activeIndex.current}`)?.focus()
            }
          } else {
            e.currentTarget.value = e.currentTarget.value?.split('')?.[0] || ''
          }
        }
      }

      const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.code === 'Backspace') {
          const lastChar = value[activeIndex?.current]

          if (activeIndex.current > 0) {
            document.getElementById(`${inputsPrefixId}-${activeIndex.current}`)?.blur()
            --activeIndex.current
            document.getElementById(`${inputsPrefixId}-${activeIndex.current}`)?.focus()
          }

          if (lastChar) {
            setValue((value) => value.substring(0, value.length - 1))
          }
        }
      }

      const createOtpInputs = (): JSX.Element[] => {
        return Array.from(new Array(length), (_el, index) => (
          <input
            key={`${inputsPrefixId}-${index}`}
            className={clsx([
              'otp-field__input',

              {
                'otp-field__input--has-value': Boolean(String(value)?.[index]),
                'control__input--error': fieldState.invalid,
                'input--disabled': disabled
              }
            ])}
            onInput={handleInput}
            onKeyUp={handleKeyDown}
            id={`${inputsPrefixId}-${index}`}
            type={type}
            inputMode={inputMode}
            disabled={disabled}
            value={value[index] ?? ''}
            autoComplete={autoComplete}
            {...props}
          />
        ))
      }

      const otpInputs = createOtpInputs()

      useEffect(() => {
        if (inputRef.current) {
          const event = new Event('change', { bubbles: true })
          inputRef.current.value = value || ''
          inputRef.current.dispatchEvent(event)
          onChangeEvent(event)
        }
      }, [value])

      return (
        <>
          <div
            className={clsx(
              'control',
              'control--has-suffix',
              {
                'control--has-value': Boolean(field.value)
              },
              classNameControl
            )}
            onClick={handleClickOTP}
          >
            <div className="otp-field__wrapper">{otpInputs}</div>

            <input
              type="hidden"
              id={selfId}
              name={name}
              onChange={onChangeEvent}
              ref={inputRef}
            />
          </div>

          {fieldState.invalid && (
            <em className="control__error-message">{fieldState.error?.message || ''}</em>
          )}
        </>
      )
    }
  }

  return (
    <div className={clsx('otp-field', className)}>
      <Controller
        control={control}
        name={name}
        render={renderFC.render}
        rules={{ ...rules, minLength: minLengthRule(length) }}
      />
    </div>
  )
}
