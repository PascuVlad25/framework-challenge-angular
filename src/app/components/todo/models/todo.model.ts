export class Todo {
    public title: string;
    public deadline: Date;
    public completed: boolean;
    public color: string;

    constructor(title: string, deadline: Date, color: string) {
        this.title = title;
        this.deadline = deadline;
        this.completed = false;
        this.color = color;
    }
}