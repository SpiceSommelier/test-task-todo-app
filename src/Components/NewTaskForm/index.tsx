import { ChangeEvent, useCallback, useState } from 'react'
import { AddItemFunction } from '../../types/componentTypes'
import './newTaskForm.css'

type NewTaskFormProps = {
  onTaskAdded: AddItemFunction
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onTaskAdded }) => {
  const [label, setLabel] = useState<string>('')

  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setLabel((label) => (label = target.value))
    },
    []
  )

  const handleSubmit = useCallback(
    (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault()
      if (label) {
        onTaskAdded(label)
        setLabel('')
      }
    },
    [onTaskAdded, label]
  )

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={handleChange}
        value={label}
      ></input>
    </form>
  )
}

export default NewTaskForm
