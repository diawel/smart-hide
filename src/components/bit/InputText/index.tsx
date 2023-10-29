import { input } from './index.css'

export type InputTextProps = {
  text: string
  setText: (text: string) => void
}

const InputText: React.FC<InputTextProps> = ({ text, setText }) => {
  return (
    <input
      className={input}
      type="text"
      value={text}
      onChange={(e) => {
        setText(e.target.value)
      }}
    />
  )
}

export default InputText
