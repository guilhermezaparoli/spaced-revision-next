import { Review } from "./review";

export type Task = {
    id: string;
    name: string;
    description: string;
    completed: boolean;
    review: Review[];
  };