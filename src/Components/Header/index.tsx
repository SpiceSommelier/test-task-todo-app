import { AddItemFunction } from '../../types/componentTypes'
import NewTaskForm from '../NewTaskForm'
import './header.css'

type HeaderProps = {
  addItem: AddItemFunction
}

const Header: React.FC<HeaderProps> = ({ addItem }) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onTaskAdded={addItem} />
    </header>
  )
}

export default Header
