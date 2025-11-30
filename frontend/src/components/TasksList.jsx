import { useEffect } from "react";
import { useState } from "react";
import TaskCard from "./TaskCard.jsx";

function TasksList({listChanged, setListChanged}) {
    const [tasks, setTasks] = useState([]);

    async function getTasks() {
        try {
            const response = await fetch("http://localhost:5000/tasks");
            if (!response.ok) {
            throw new Error("Error fetching tasks");
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            alert(`Failed to load tasks: ${error.message}`);1
        }
    }

    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        getTasks();
    }, [listChanged]);

    return (
        <div className="text-white h-full w-[95%] flex flex-col gap-4 overflow-y-auto py-5 items-center">
            {
            tasks.length === 0 ? (
                <p>No tasks yet.</p>
            ) : (
            tasks.map((task) => (
                <TaskCard key={task.id} task={task} setListChanged={setListChanged} />
            )))}
        </div>
    )
}

export default TasksList;