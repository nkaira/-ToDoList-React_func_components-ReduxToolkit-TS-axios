import { ITask } from './ITask'

export interface IPaginationButton {
    onClick: (taskId: number) => void
    pageNumbers: Array<number>
}

export interface IPagination {
    onClick: (taskId: number) => void
    filteredTasks: Array<ITask>
}