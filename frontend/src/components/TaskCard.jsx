import icone_lixo from "../assets/icone_lixo.png";

const TaskCard = ({ task, setListChanged }) => {

    async function changeStatus(taskId, newStatus)
    {
        try {
            const response = await fetch(`http://localhost:5000/tasks/${taskId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: newStatus
                })
            });

            if (!response.ok) {
                alert('Failed to update task status');
            }
            else {
                setListChanged(prev => !prev);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error updating task status:', error);
            alert(error);
        }
    }

    async function deleteTask(id) {
        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: "DELETE"
        })
        if (!response.ok) {
            alert('Failed to delete task');
        }
        else {
            setListChanged(prev => !prev);
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

  return (
    <div className="w-full bg-white/10 border border-white/10 p-4 rounded-lg 
                    flex flex-col md:flex-row font-mono gap-4">
        <div className="flex flex-col justify-between flex-1">
            <div>
                <h3 className="text-lg font-semibold text-white 2xl:text-xl ">{task.title}</h3>
                <p className="text-gray-200 text-sm mb-3 2xl:text-xl ">{task.description}</p>
            </div>
            <div className="flex text-white text-xs 2xl:text-xl ">
                <p>📅 {formatDate(task.expectedDate)}</p>
            </div>
        </div>
        <div className="flex md:flex-col flex-row gap-2 flex-none self-center">
            <button 
            className={`cursor-pointer px-3 h-10 rounded-lg 
                        ${task.status === "pending" ? "bg-red-800" : "bg-gray-200/10"}`}
            onClick={() => changeStatus(task.id, "pending")}
            >To Do</button>

            <button
            className={`cursor-pointer px-3 h-10 rounded-lg 
                        ${task.status === "doing" ? "bg-yellow-600" : "bg-gray-200/10"}`}
            onClick={() => changeStatus(task.id, "doing")}
            >Doing</button>

            <button
            className={`cursor-pointer px-3 h-10 rounded-lg 
                        ${task.status === "done" ? "bg-green-800" : "bg-gray-200/10"}`}
            onClick={() => changeStatus(task.id, "done")}
            >Done</button>
        </div>
        <div className="flex items-start justify-end flex-none">
            <img 
            src={icone_lixo} 
            className="w-6 cursor-pointer hover:opacity-80 transition"
            onClick={() => deleteTask(task.id)} 
            />
        </div>
    </div>
  );
};

export default TaskCard;