export type AddItemFunction = (value: string) => void

export type DeleteItemFunction = (id: number) => void

export type ToggleDoneFunction = (id: number) => void

export type FilterTaskFunction = (action: TodoFilterAction) => void

export type EditItemFunction = (id: number, newText: string) => void

export type ActiveCountFunction = (data: Todo[]) => number

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U]

export type Todo = {
  label: string
  time: Date
  active: boolean
  id: string
}

export enum TodoFilterAction {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}
