import { Subject } from "@/@types/subject"
import { SubjectService } from "@/api/services/subject/subjectService"
import { DefinedUseQueryResult, useMutation, useQuery } from "@tanstack/react-query"

export const useSubjectQuery =  (): DefinedUseQueryResult<Subject[]> => {
    return useQuery({
        queryKey: ["subjects"],
        queryFn: SubjectService.getAll,
        initialData: [],
    },
 )
    
}

type UpdateSubject = {
    id: string;
    data: {
        name: string;
    }
}
export const useSubjectQueryMutationUpdate = () => {
    return useMutation({
        mutationFn: ({id, data}: UpdateSubject) => SubjectService.update(id, data),
    })
}


export const useSubjectQueryMutationCreate = () => {
    return useMutation({
        mutationFn: (data: {name: string}) => SubjectService.create(data),
    })
}

export const useSubjectQueryMutationDelete = () => {
    return useMutation({
        mutationFn: (id: string) => SubjectService.delete(id),
    })
}