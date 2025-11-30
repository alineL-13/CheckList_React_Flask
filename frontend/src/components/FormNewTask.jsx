import { useState } from "react";

    function FormNewTask({listChanged, setListChanged}) {
    const [newTaskData, setNewTaskData] = useState({
        title: "",
        description: "",
        status: "",
        expectedDate: "",
    });

    async function handleAddTask(event) {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTaskData),
            });

            let data;
            try {
                data = await response.json();
            } catch {
                data = {};
            }

            if (!response.ok) {
            alert(`Error: ${data.error || "Server error. Please try again."}`);
            return;
            }

            setListChanged(!listChanged);

            setNewTaskData({
            title: "",
            description: "",
            status: "",
            expectedDate: "",
            });
            setBtnPending(false);
            setBtnDoing(false);
            setBtnDone(false);
        } catch (error) {
            alert(`Unexpected error: ${error.message}`);
        }
    }


    function handleChange(e) {
        const { name, value } = e.target;
        setNewTaskData({ ...newTaskData, [name]: value });
    }

    const [BtnPending, setBtnPending] = useState(false);
    const [BtnDoing, setBtnDoing] = useState(false);
    const [BtnDone, setBtnDone] = useState(false);

    function handleStatusOption(choosenStatus)
    {
        if (choosenStatus == "pending")
        {
            setBtnPending(true)
            setBtnDoing(false);
            setBtnDone(false);

            setNewTaskData({...newTaskData, status: "pending"});
        }
        if (choosenStatus == "doing")
        {
            setBtnDoing(true)
            setBtnPending(false);
            setBtnDone(false);

            setNewTaskData({...newTaskData, status: "doing"});
        }
        if (choosenStatus == "done")
        {
            setBtnDone(true)
            setBtnDoing(false);
            setBtnPending(false);

            setNewTaskData({...newTaskData, status: "done"});
        }
    }

  return (
    <form onSubmit={handleAddTask} className="h-full w-full flex flex-col items-center text-white font-mono">
        <div className="flex flex-col gap-4 pt-4 w-[90%] 2xl:h-[50%]">
            <input
            type="text"
            name="title"
            placeholder="Task's Title"
            value={newTaskData.title}
            onChange={handleChange}
            className="placeholder-white bg-white/10 focus:bg-white/20 border border-white/20 rounded p-3 outline-none transition w-full flex-1"
            />

            <textarea
            name="description"
            placeholder="Description"
            value={newTaskData.description}
            onChange={handleChange}
            className="placeholder-white bg-white/10 focus:bg-white/20 border border-white/20 rounded p-3 outline-none transition h-24 resize-none w-full flex-2"
            />

            <input
            type="date"
            name="expectedDate"
            value={newTaskData.expectedDate}
            onChange={handleChange}
            className="bg-white/10 focus:bg-white/20 border border-white/20 rounded p-3 outline-none transition text-white w-full flex-1"
            />
        </div>
        
        <div className="flex justify-center items-center h-20 lg:h-[15%] w-full mt-4 max-w-lg">
            <div className="w-full flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 lg:gap-10 px-4">
            <button 
                className={`cursor-pointer sm:px-4 py-2 2xl:py-5 rounded-lg flex-1 text-sm sm:text-base 2xl:text-xl ${BtnPending ? "bg-(--color_2)" : "bg-gray-600/60"}`}
                type="button"
                onClick={() => handleStatusOption("pending")}
            >To Do</button>
            <button
                className={`cursor-pointer sm:px-4 py-2 2xl:py-5 rounded-lg flex-1 text-sm sm:text-base 2xl:text-xl ${BtnDoing ? "bg-(--color_2)" : "bg-gray-600/60"}`}
                type="button"
                onClick={() => handleStatusOption("doing")}
            >Doing</button>
            <button
                className={`cursor-pointer sm:px-4 py-2 2xl:py-5 rounded-lg flex-1 text-sm sm:text-base 2xl:text-xl ${BtnDone ? "bg-(--color_2)" : "bg-gray-600/60"}`}
                type="button"
                onClick={() => handleStatusOption("done")}
            >Done</button>
            </div>
        </div>
        
        <div className="grow flex justify-center items-center w-full p-4">
            <button
            type="submit"
            className="cursor-pointer bg-(--color_2) h-10 lg:h-15 2xl:h-20 w-full max-w-xs rounded-xl text-sm sm:text-base 2xl:text-xl"
            >
            Create Task
            </button>
        </div>
    </form>
  )
}

export default FormNewTask;