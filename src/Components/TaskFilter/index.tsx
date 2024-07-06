import './taskFilter.css'
import {
  TodoFilterAction,
  FilterTaskFunction,
  AtLeastOne,
} from '../../types/componentTypes'
import { useCallback, useState } from 'react'

type TaskFilterProps = {
  filterTasks: FilterTaskFunction
}

type StateFilter = AtLeastOne<{
  all?: boolean
  active?: boolean
  completed?: boolean
}>

const TaskFilter: React.FC<TaskFilterProps> = ({ filterTasks }) => {
  const [filter, setFilter] = useState<StateFilter>({
    all: true,
    active: false,
    completed: false,
  })

  const handleClick = useCallback(
    (evt: React.MouseEvent<HTMLUListElement>) => {
      const target = evt.target as HTMLElement
      const button = target.closest('button')
      if (button) {
        const action = button.textContent?.toLowerCase() as keyof StateFilter
        if (action && ['all', 'active', 'completed'].includes(action)) {
          filterTasks(action as TodoFilterAction) // Исправлено на передачу enum
          setFilter({
            all: action === 'all',
            active: action === 'active',
            completed: action === 'completed',
          })
        }
      }
    },
    [filterTasks]
  )

  const highlightElement = useCallback(
    (action: TodoFilterAction) => {
      if (action) {
        return filter[action] ? 'selected' : ''
      }
    },
    [filter]
  )

  return (
    <ul className="filters" onClick={handleClick}>
      <li>
        <button className={highlightElement(TodoFilterAction.All)}>All</button>
      </li>
      <li>
        <button className={highlightElement(TodoFilterAction.Active)}>
          Active
        </button>
      </li>
      <li>
        <button className={highlightElement(TodoFilterAction.Completed)}>
          Completed
        </button>
      </li>
    </ul>
  )
}

export default TaskFilter
