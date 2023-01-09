import { ComponentProps, JSX, ParentProps } from 'solid-js'
import { A as BaseA } from '@solidjs/router'

const classList =
  'bg-slate-100 text-slate-400 hover:bg-slate-200 transform active:translate-y-px px-1 py-2 rounded text-center'

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {}

export function Button(props: ParentProps<ButtonProps>) {
  return (
    <button {...props} class={`${classList} ${props.class}`}>
      {props.children}
    </button>
  )
}

type AProps = ComponentProps<typeof BaseA>

export function Link(props: ParentProps<AProps>) {
  return (
    <BaseA {...props} class={`${classList} ${props.class}`}>
      {props.children}
    </BaseA>
  )
}
