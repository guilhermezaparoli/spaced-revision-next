
import { TaskService } from "@/api/services/task/taskService"
import { useMutation } from "@tanstack/react-query"
type TaskProps = {
    id: string;
    name?: string;
    description?: string;
    completed?: boolean;
  };
export const useTaskQuery = () => {
    return useMutation({
        mutationFn: ({id, name, description, completed}: TaskProps) => TaskService.update({id, name, description, completed}),
    })
}


export const useTaskQueryCreate = () => {
    return useMutation({
        mutationFn: ( {id, name, description}: TaskProps) => TaskService.create({id, name, description}),
    })
}

export const userTaskQueryUpdate = () => {
    return useMutation({
        mutationFn: ({id, name, description}: TaskProps) => TaskService.update({id, name, description}),
    })
}