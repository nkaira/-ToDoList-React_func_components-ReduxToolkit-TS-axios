import React from "react";

export interface ITask {
    taskId: number,
    title: string,
    complete: boolean,
}

export interface ITaskList {
    paginatedTasks: Array<ITask>
    onComplete: (taskId: number) => void
    onModalShow: (taskId: number) => void
}

export interface ITaskComponent {
    onComplete: (e: React.MouseEvent<HTMLButtonElement>) => void
    onModalShow: (e: React.MouseEvent<HTMLButtonElement>) => void
    isComplete: boolean
    description: string
    id: number
}