
type Task = {
    taskText: string;
    isDone: boolean;
}


export const Task = ({taskText, isDone}:Task ) => {

    return (
        <div className="flex gap-2">
            <input type="checkbox" checked={isDone}></input>
            <p>{taskText}</p>
        </div>
    )
}