import './task.css'
import { FormEvent, useCallback, useMemo, useState } from 'react'
import { Todo } from '../../types/componentTypes'

import { formatDistanceToNow } from 'date-fns'

type TaskProps = {
  onDeleted: () => void
  onToggleDone: () => void
  onEdit: (newText: string) => void
} & Omit<Todo, 'id'>

const Task: React.FC<TaskProps> = ({
  onEdit,
  active,
  onToggleDone,
  label,
  time,
  onDeleted,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editingTaskText, setEditingTaskText] = useState('')

  const buildedClassName = useMemo<string>(() => {
    let result = !active ? ' completed' : ''
    return isEditing ? result + '  editing' : result
  }, [active, isEditing])

  const handleClickEdit = useCallback(() => {
    setIsEditing((isEditing) => !isEditing)
  }, [])

  const editTask = useCallback(
    (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault()
      onEdit(editingTaskText)
      setEditingTaskText('')
      setIsEditing(false)
    },
    [editingTaskText, onEdit]
  )

  const handleEdit = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      if (target.value) {
        setEditingTaskText(target.value)
      }
    },
    []
  )

  return (
    <li className={buildedClassName}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={onToggleDone}
          checked={!active}
        ></input>
        <label>
          <span className="description" onClick={onToggleDone}>
            {label}
          </span>
          <span className="created">{formatDistanceToNow(new Date(time))}</span>
        </label>
        <button className="icon icon-edit" onClick={handleClickEdit}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      <form onSubmit={editTask}>
        <input
          className="edit"
          type="text"
          onChange={handleEdit}
          value={editingTaskText}
        ></input>
      </form>
    </li>
  )
}

export default Task
