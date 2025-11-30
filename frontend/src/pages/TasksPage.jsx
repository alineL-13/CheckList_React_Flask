import FormNewTask from "../components/FormNewTask.jsx";
import TasksList from "../components/TasksList.jsx";
import icone_clean from "../assets/icon_clean.png";
import { useState } from "react";

function TasksPage() {

  const [listChanged, setListChanged] = useState(false);

  async function deleteAllDoneTasks() {
        const response = await fetch('http://localhost:5000/tasks/deleteAllDone', {
            method: "DELETE"
        })
        if (!response.ok) {
            alert('Failed to delete task');
        }
        else {
            setListChanged(prev => !prev);
        }
    }

  return (
    <div className="h-screen w-screen flex flex-col lg:flex-row justify-around items-center font-serif bg-(--color_4) gap-5 lg:gap-0 2xl:text-xl">
      <div className="h-[70%] w-[40%] rounded-md bg-(--color_1)">
        <div className="text-3xl w-full h-[10%] flex items-center justify-center bg-(--color_2) rounded-md">
          <h1 className="text-white font-semibold">Add task</h1>
        </div>
        <div className="flex-1">
          <FormNewTask 
            listChanged = {listChanged}
            setListChanged = {setListChanged}
          />
        </div>
      </div>
      <div className="h-[70%] w-[40%] rounded-md bg-(--color_1)">
        <div className="relative text-3xl w-full h-[10%] flex items-center justify-center bg-(--color_2) rounded-md">
          <h1 className="text-white font-semibold">Tasks List</h1>
          <img
            src={icone_clean}
            className="cursor-pointer h-7 absolute right-4 hover:opacity-80 transition 2xl:h-[50%]"
            title="Delete all 'Done' tasks"
            onClick={() => deleteAllDoneTasks()}
            ></img>
        </div>
        <div className="w-full h-[90%] flex items-center justify-center">
          <TasksList 
            listChanged = {listChanged}
            setListChanged = {setListChanged}
          />
        </div>
      </div>
    </div>
  );
}

export default TasksPage;