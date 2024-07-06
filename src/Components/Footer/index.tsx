import './footer.css'

import { FilterTaskFunction } from '../../types/componentTypes'

import TaskFilter from '../TaskFilter'

type FooterProps = {
  activeTasks: number
  filterTasks: FilterTaskFunction
  removeDone: () => void
}

const Footer: React.FC<FooterProps> = ({
  activeTasks,
  filterTasks,
  removeDone,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">{activeTasks} items left</span>
      <TaskFilter filterTasks={filterTasks} />
      <button className="clear-completed" onClick={removeDone}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
