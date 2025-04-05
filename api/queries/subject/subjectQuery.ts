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

export const useSubjectQueryMutationUpdate = () => {
    return useMutation({
        mutationFn: ({id, name}: Subject) => SubjectService.update(id, name),
    })
}


export const useSubjectQueryMutationCreate = () => {
    return useMutation({
        mutationFn: (data: Partial<Subject>) => SubjectService.create(data),
    })
}

export const useSubjectQueryMutationDelete = () => {
    return useMutation({
        mutationFn: (id: string) => SubjectService.delete(id),
    })
}