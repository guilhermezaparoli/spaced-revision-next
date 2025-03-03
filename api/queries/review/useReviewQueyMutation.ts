
import { Review } from "@/@types/review";
import { ReviewService } from "@/api/services/review/reviewService";
import { useMutation } from "@tanstack/react-query"

export const useReviewQueryMutation = () => {
    return useMutation({
        mutationFn: ({id, completed}: Review) => ReviewService.update({
            id,
            completed
        }),
    })
}