import { type FC } from 'react'
import type { TTextFieldProps } from './TTextField'
import type { RenderFC } from '@ts/Forms'
import { Controller } from 'react-hook-form'
import useFormElements from '@hooks/useFormElements'
import clsx from 'clsx'
import CrossIcon from '@assets/svg/cross.svg?react'
import './TextField.scss'

export const TextField: FC<TTextFieldProps> = ({
  control,
  name,
  id,
  onChange,
  rules,
  convertValue,
  clearCb,
  clearable = false,
  type = 'text',
  label = '',
  className = '',
  classNameControl = '',
  suffix = '',
  ltr = false,
  disabled = false,
  ...props
}) => {
  const { selfId } = useFormElements({ id })

  const renderFC: RenderFC = {
    render({ field, fieldState }) {
      const onChangeEvent: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const newChangeEvent = convertValue
          ? {
              ...e,
              target: { ...e.target, value: convertValue(e.target.value) }
            }
          : e

        field.onChange(newChangeEvent)
        onChange?.(newChangeEvent)
      }

      const clear = () => {
        field.onChange('')
        clearCb?.()
      }

      return (
        <div
          className={clsx(
            'control',
            {
              'control--has-suffix': Boolean(suffix),
              'control--has-value': Boolean(field.value)
            },
            classNameControl
          )}
        >
          <div className="control__wrapper">
            <input
              className={clsx([
                'control__input',
                {
                  'control__input--error': fieldState.invalid,
                  'control--has-clearable': clearable,
                  'control__input--ltr': ltr,
                  'control--has-label': Boolean(label)
                }
              ])}
              type={type}
              id={selfId}
              name={name}
              value={field.value || ''}
              onChange={onChangeEvent}
              disabled={disabled}
              {...props}
            />
            <legend className="control__legend">{label}</legend>

            {Boolean(suffix) && (
              <span
                className="control__suffix"
                {...{ onClick: clearable ? clear : undefined }}
              >
                {suffix}
              </span>
            )}

            {Boolean(field?.value && clearable && !disabled) && (
              <span className="control__clear" onClick={clear}>
                <CrossIcon className="control__clear-icon" />
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
    <div className={clsx('text-field', className)}>
      <Controller control={control} name={name} render={renderFC.render} rules={rules} />
    </div>
  )
}
