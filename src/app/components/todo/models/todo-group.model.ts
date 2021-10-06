import { Todo } from ".";

export interface TodoGroup {
    title: string;
    filter: (todo: Todo) => boolean;
    todos: Todo[];
}
