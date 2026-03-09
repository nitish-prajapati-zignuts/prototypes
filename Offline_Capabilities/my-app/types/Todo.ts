export type Todo = {
    id:string,
    name:string,
    description:string
    completed:boolean
}

export type PagedToDos = {
    nextToken?:string
    items:Todo[]
}

export type AddTodoInput = {
    name:string
    description:string
}

export type AddTodoWithIdInput = {
    id:string
    name:string
    description:string
}