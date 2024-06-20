import clsx from 'clsx'
import { FC } from 'react'

enum ESubmitButtonType {
  'submit',
  'reset'
}

interface ISubmitButton {
  value: string
  className?: string
  type?: ESubmitButtonType
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
}
`bg-primary
 hover:bg-secondary`
const SubmitButton: FC<ISubmitButton> = (props: ISubmitButton) => {
  return (
    <>
      <input
        type={props.type == ESubmitButtonType.reset ? 'reset' : 'submit'} 
        value={props.value}
        className={clsx(
        props.className, 
        "text-white", 
        "rounded", 
        "justify-center", 
        "items-center", 
        "transition-all",
        {"bg-red-500 hover:bg-red-700" : props.type==ESubmitButtonType.reset},
        {"bg-primary hover:bg-secondary" : props.type==ESubmitButtonType.submit || ESubmitButtonType==undefined}
        )}
        onClick={props.onClick}
      />
    </>
  )
}

export { ESubmitButtonType }
export default SubmitButton
