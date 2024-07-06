import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'

import {
  AddItemFunction,
  Todo,
  TodoFilterAction,
  DeleteItemFunction,
  ToggleDoneFunction,
  EditItemFunction,
  FilterTaskFunction,
  ActiveCountFunction,
} from './types/componentTypes'

import Header from './Components/Header'
import TaskList from './Components/TaskList'
import Footer from './Components/Footer'

const LOCAL_STORAGE_KEY = 'Tasks'

type DataStorage = {
  dataArray: Todo[]
  filteredArray: Todo[]
}

const countActiveTasks: ActiveCountFunction = (data) =>
  data.filter((el) => el.active).length

const createToDoItem = (label: string, active = true): Todo => {
  return {
    label,
    time: new Date(),
    active,
    id: `${new Date().getTime()}`,
  }
}

function App(): JSX.Element {
  const [data, setData] = useState<DataStorage>(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY)
    return storedData
      ? JSON.parse(storedData)
      : { dataArray: [], filteredArray: [] }
  })

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const findIndex = useCallback(
    (id: number) =>
      data.dataArray.findIndex((el: Todo): boolean => el.id === id.toString()),
    [data.dataArray]
  )

  const toggleDone: ToggleDoneFunction = useCallback(
    (id) => {
      setData((prevState: DataStorage) => {
        const idx: number = findIndex(id)
        const newArr: Todo[] = [...prevState.dataArray]
        newArr[idx] = { ...newArr[idx], active: !newArr[idx].active }
        return {
          dataArray: newArr,
          filteredArray: newArr,
        }
      })
    },
    [findIndex]
  )

  const deleteItem: DeleteItemFunction = useCallback(
    (id) => {
      setData(({ dataArray }) => {
        const idx: number = findIndex(id)
        const newArr: Todo[] = [
          ...dataArray.slice(0, idx),
          ...dataArray.slice(idx + 1),
        ]
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newArr))
        return {
          dataArray: newArr,
          filteredArray: newArr,
        }
      })
    },
    [findIndex]
  )

  const addItem: AddItemFunction = useCallback((value) => {
    const newItem: Todo = createToDoItem(value)

    setData(({ dataArray }) => {
      const newArr: Todo[] = [...dataArray, newItem]
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newArr))
      return {
        dataArray: newArr,
        filteredArray: newArr,
      }
    })
  }, [])

  const filterTasks: FilterTaskFunction = useCallback(
    (action: TodoFilterAction = TodoFilterAction.All): void => {
      switch (action) {
        case TodoFilterAction.Active:
          setData(({ dataArray }) => ({
            dataArray,
            filteredArray: dataArray.filter((el) => el.active),
          }))
          break
        case TodoFilterAction.Completed:
          setData(({ dataArray }) => ({
            dataArray,
            filteredArray: dataArray.filter((el) => !el.active),
          }))
          break
        default:
          setData(({ dataArray }) => ({
            dataArray,
            filteredArray: [...dataArray],
          }))
          break
      }
    },
    [setData]
  )

  const removeDone = useCallback(() => {
    setData(({ dataArray }) => {
      const newArr = dataArray.filter((el) => el.active)
      return {
        dataArray: newArr,
        filteredArray: newArr,
      }
    })
  }, [])

  const editItem: EditItemFunction = useCallback(
    (id, newText) => {
      const { dataArray } = data
      const newArr: Todo[] = [...dataArray]
      const todo = dataArray.find((el) => el.id === id.toString())
      if (todo) {
        todo.label = newText
      }
      setData({
        dataArray: newArr,
        filteredArray: newArr,
      })
    },
    [data]
  )

  const activeTasks = useMemo<number>(
    () => (data.filteredArray ? countActiveTasks(data.filteredArray) : 0),
    [data]
  )

  return (
    <section className="todoapp">
      <Header addItem={addItem} />
      <section className="main">
        <TaskList
          dataArray={data.filteredArray}
          onDeleted={deleteItem}
          onToggleDone={toggleDone}
          filterTasks={filterTasks}
          onEdit={editItem}
        />
        <Footer
          activeTasks={activeTasks}
          filterTasks={filterTasks}
          removeDone={removeDone}
        />
      </section>
    </section>
  )
}

export default App
