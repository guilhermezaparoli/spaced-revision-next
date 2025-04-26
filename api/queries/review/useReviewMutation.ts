
import { Review } from "@/@types/review";
import { Subject } from "@/@types/subject";
import { ReviewService } from "@/api/services/review/reviewService";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useReviewUpdateMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, completed }: Review) => ReviewService.update({
            id,
            completed
        }),
        onSuccess: (data) => {
            queryClient.setQueryData(["subjects"], (currentData: Subject[]) =>
                currentData.map((subject) => {
                    if (subject.id === data.subject_id) {
                        return {
                            ...subject,
                            task: subject.task.map((task) => {
                                if (task.id === data.id) {
                                    return {
                                        ...task,
                                        completed: data.completed,
                                        review: data.review,
                                    };
                                }
                                return task;
                            }),
                        };
                    }
                    return subject;
                }),
            );
        }
    })
}