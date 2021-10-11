export class Todo {
    public title: string;
    public description: string;
    public deadline: Date;
    public completed: boolean;
    public color: string;

    constructor(title: string, description: string, deadline: Date, color: string) {
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.completed = false;
        this.color = color;
    }
}