type Review = {
    id: string;
    review_date: string;
    completed: boolean;
    created_at: string;
    task_id: string;
  };
  
  type Task = {
    id: string;
    name: string;
    description: string;
    review: Review[];
  };
  
  export type Subject = {
    id: string;
    name: string;
    task: Task[];
  };
  
  