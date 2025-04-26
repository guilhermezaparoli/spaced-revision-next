import { Subject } from "@/@types/subject"
import { SubjectService } from "@/api/services/subject/subjectService"
import { DefinedUseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "../queryKeys"

export const useSubjectQuery = (): DefinedUseQueryResult<Subject[]> => {
    return useQuery({
        queryKey: queryKeys.SUBJECTS,
        queryFn: SubjectService.getAll,
        initialData: [],
    },
    )

}

export const useSubjectQueryMutationUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, name }: Subject) => SubjectService.update(id, name),
        onSuccess: (data) => {
            queryClient.setQueryData(queryKeys.SUBJECTS, (currentData: Subject[]) =>
                currentData.map((subject) => {
                    if (subject.id === data.id) {
                        return {
                            ...subject,
                            name: data.name,
                        };
                    }
                    return subject;
                }),
            );
        }
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