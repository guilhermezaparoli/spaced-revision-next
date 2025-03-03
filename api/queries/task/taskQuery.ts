
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