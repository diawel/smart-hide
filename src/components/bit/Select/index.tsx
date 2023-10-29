import { select } from './index.css'

export type SelectProps = {
  options: string[]
  value: string
  setValue: (value: string) => void
}

const Select: React.FC<SelectProps> = ({ options, value, setValue }) => {
  return (
    <select
      className={select}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      {...{ value }}
    >
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default Select
