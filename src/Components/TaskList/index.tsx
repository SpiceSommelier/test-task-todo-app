import './taskList.css'

import Task from '../Task'

import {
  DeleteItemFunction,
  EditItemFunction,
  FilterTaskFunction,
  Todo,
  ToggleDoneFunction,
} from '../../types/componentTypes'

type TaskListProps = {
  dataArray: Todo[]
  onDeleted: DeleteItemFunction
  onToggleDone: ToggleDoneFunction
  filterTasks: FilterTaskFunction
  onEdit: EditItemFunction
}

const TaskList: React.FC<TaskListProps> = ({
  dataArray,
  onDeleted,
  onToggleDone,
  onEdit,
}) => {
  const elements = dataArray.map((item) => {
    const { id, ...props } = item
    return (
      <Task
        {...props}
        key={id}
        onDeleted={() => onDeleted(Number(id))}
        onToggleDone={() => onToggleDone(Number(id))}
        onEdit={(newText: string) => onEdit(Number(id), newText)}
      />
    )
  })
  return <ul className="todo-list">{elements}</ul>
}

export default TaskList
