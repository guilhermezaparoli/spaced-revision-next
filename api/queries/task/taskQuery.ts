
import { Subject } from "@/@types/subject";
import { TaskService } from "@/api/services/task/taskService"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";
import { queryKeys } from "../queryKeys";
type TaskProps = {
    id: string;
    name?: string;
    description?: string;
    completed?: boolean;
};
export const useTaskQuery = () => {
    return useMutation({
        mutationFn: ({ id, name, description, completed }: TaskProps) => TaskService.update({ id, name, description, completed }),
    })
}


export const useTaskQueryCreate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, name, description }: TaskProps) => TaskService.create({ id, name, description }),

        onSuccess: (data) => {
            queryClient.setQueryData(queryKeys.SUBJECTS, (currentData: Subject[]) =>
                currentData.map((subject) => {
                    if (subject.id === data.subject_id) {
                        return {
                            ...subject,
                            task: [...subject.task, data],
                        };
                    }
                    return subject;
                }),
            );
        },

    })
}

export const userTaskQueryUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, name, description }: TaskProps) => TaskService.update({ id, name, description }),
        onSuccess: (data) => {
            queryClient.setQueryData(queryKeys.SUBJECTS, (currentData: Subject[]) =>
                currentData.map((subject) => {
                    if (subject.id === data.subject_id) {
                        return {
                            ...subject,
                            task: subject.task.map((task) => {
                                if (task.id === data.id) {
                                    return {
                                        ...task,
                                        ...data,
                                    };
                                }
                                return task;
                            }
                            ),
                        };
                    }
                    return subject;
                }),
            );
            toast.success("Tarefa editada com sucesso")

        }
    })
}

export const useTaskQueryDelete = (idSubject: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => TaskService.delete(id),
        onSuccess: () => {
            queryClient.setQueryData(queryKeys.SUBJECTS, (currentData: Subject[]) =>
                currentData.map((subject) => {
                    if (subject.id === idSubject) {
                        return {
                            ...subject,
                            task: subject.task.filter((task) => task.id !== id),
                        };
                    }
                    return subject;
                }),
            );

            toast.success("Tarefa deletada com sucesso")
        },
    })
}