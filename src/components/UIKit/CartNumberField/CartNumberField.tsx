import { useEffect, useMemo, useRef, useState, type FC } from 'react'
import useFormElements from '@hooks/useFormElements'
import type { TCartNumberFieldProps } from './TCartNumberField'
import { Controller } from 'react-hook-form'
import type { RenderFC } from '@ts/Forms'
import clsx from 'clsx'
import { cartNumber, convertNumbers2English, imgSrc } from '@utils'
import { cartNumberRule } from '@assets/validationsRules'
import CrossCircleIcon from '@assets/svg/cross-circle.svg?react'
import { $t } from '@locales'
import { BANKS_LIST } from '@constants'
import './CartNumberField.scss'

export const CartNumberField: FC<TCartNumberFieldProps> = ({
  control,
  name,
  id,
  onChange,
  rules,
  label = '',
  classNameControl = '',
  className = '',
  disabled = false,
  clearable = true,
  ...props
}) => {
  const { selfId } = useFormElements({ id })

  const renderFC: RenderFC = {
    render({ field, fieldState }) {
      const [maskValue, setMaskValue] = useState<string>(cartNumber(field?.value) || '')

      const inputRef = useRef<HTMLInputElement>(null)

      const icon = useMemo<string>(() => {
        let val = ''

        if (field?.value?.length > 5) {
          const prefix = Number(field.value.substring(0, 6))
          const item = BANKS_LIST.find((item) => item.preFix == prefix)

          if (item?.img) {
            val = item.img
          }
        }

        return val
      }, [field.value])

      const changeMaskValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const str = e?.target?.value
          ? String(e?.target?.value).replaceAll($t('common.cartNumberSeparator'), '')
          : ''
        const fieldValue = str ? convertNumbers2English(String(str)) : ''
        const newChangeEvent = {
          ...e,
          target: { ...e.target, value: fieldValue }
        }

        if (inputRef.current) {
          field.onChange(newChangeEvent)
          onChange?.(newChangeEvent)
        }
      }

      const setValue = () => {
        if (inputRef.current) {
          const fieldValue = field.value
            ? convertNumbers2English(String(field.value))
            : ''
          const value = cartNumber(fieldValue)
          setMaskValue(value)
          inputRef.current.value = value
        }
      }

      const clear = () => {
        field.onChange('')
      }

      useEffect(() => {
        setValue()
      }, [field.value])

      return (
        <div
          className={clsx(
            'control',
            {
              'control--has-value': Boolean(field.value),
              'control--has-icon': Boolean(icon),
              'control--has-clearable': clearable
            },
            classNameControl
          )}
        >
          <div className="control__wrapper">
            {Boolean(icon) && (
              <div className="cart-number-field__icon">
                <img
                  className="cart-number-field__icon-img"
                  src={imgSrc(`banks-logo/${icon}`)}
                />
              </div>
            )}

            <input
              className={clsx([
                'cart-number-field__input',
                'control__input',
                { 'control__input--error': fieldState.invalid }
              ])}
              type="text"
              name={name}
              inputMode="numeric"
              id={`${selfId}-input-control`}
              value={maskValue}
              onChange={changeMaskValue}
              ref={inputRef}
              disabled={disabled}
              {...props}
            />
            <legend className="control__legend">{label}</legend>

            {Boolean(field?.value && clearable && !disabled) && (
              <span className="control__clear" onClick={clear}>
                <CrossCircleIcon className="control__clear-icon" />
              </span>
            )}
          </div>

          {fieldState.invalid && (
            <em className="control__error-message">{fieldState.error?.message || ''}</em>
          )}
        </div>
      )
    }
  }

  return (
    <div className={clsx('cart-number-field', className)}>
      <Controller
        control={control}
        name={name}
        render={renderFC.render}
        rules={{ ...rules, validate: cartNumberRule }}
      />
    </div>
  )
}
