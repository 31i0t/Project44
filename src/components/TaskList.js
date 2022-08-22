import { useState } from "react";
import { useStore } from "../store";
import { validateInput, trimSpaces } from "../utils";
import useInput from "../hooks/useInput";
import { useAddTask, useUpdateTask, useDeleteTask, useDeleteAllDone } from "../hooks/useTaskRepository";


import BaseButton from "./base/BaseButton";
import BaseInput from "./base/BaseInput";
import BaseListSkeleton from "./base/BaseListSkeleton";

const TaskList = () => {
    const addTask = useAddTask();
    const updateTask = useUpdateTask();
    const deleteTask = useDeleteTask();
    const deleteAllDone = useDeleteAllDone();

    const loadingTasks = useStore(state => state.loadingTasks);
    const tasks = useStore(state =>  Object.values(state.tasks));
    const [input, setInput] = useInput('');
    const [busy, setBusy] = useState({});

    const handleAddTask = async () => {
        if (busy['add']) return;
        setBusy({
            ...busy,
            add: true,
        });
        await addTask(input.value);
        setBusy({
            ...busy,
            add: false,
        });
        setInput({ name: '', error: ''});
    }

    const handleUpdateTask = async (id, prop, value) => {
        if (busy[id]) return;
        setBusy({
            ...busy,
            [id]: true,
        });
        await updateTask(id, {
            [prop]: value,
        });
        setBusy({
            ...busy,
            [id]: false,
        });
    }

    const handleDeleteTask = async (id) => {
        if (busy[id]) return;
        setBusy({
            ...busy,
            [id]: true,
        });
        await deleteTask(id);
        setBusy({
            ...busy,
            [id]: false,
        });
    }

    const handleInputChange = (evt) => setInput(validateInput(evt.target.value, tasks.map(t => t.name)));

    const handleInputKeyDown = (evt) => {
        if (evt.keyCode === 13 && !Boolean(input.error) && trimSpaces(input.value) !== '') {
            handleAddTask();
        }
    }

    const handleDeleteDone = async () => {
        if (busy.allDone) return;
        setBusy({
            ...busy,
            allDone: true,
        });
        await deleteAllDone();
        setBusy({
            ...busy,
            allDone: false,
        });
    }

    if (loadingTasks) return <BaseListSkeleton />;

    return (
        <>
            {/* Add new */}
            <div className="mb-3">
                <div className="flex">
                    <BaseInput
                        className="mr-2"
                        value={input.value}
                        error={input.error}
                        placeholder="Add Task"
                        onKeyDown={handleInputKeyDown}
                        onChange={handleInputChange} />
                    <BaseButton
                        disabled={busy.add || Boolean(input.error) || trimSpaces(input.value) === ''}
                        onClick={handleAddTask}
                        type="primary">+</BaseButton>
                </div>
            </div>
            {/* Task list */}
            <div className="flex flex-col gap-3">
                {tasks.map((task) => (
                    <div key={task.id}className="flex items-center border rounded py-2 px-3">
                        <input
                            disabled={busy[task.id]}
                            className="mr-3 bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                            type="checkbox"
                            checked={task.done}
                            onChange={ () => handleUpdateTask(task.id, 'done', !task.done) }/>
                        <p className={`w-full text-grey-darkest ${ task.done && 'line-through'}`}>{task.name}</p>
                        <BaseButton type="danger-blank" size="sm" disabled={busy[task.id]} onClick={() => handleDeleteTask(task.id)}>Remove</BaseButton>
                    </div>
                ))}
                {
                    tasks.some(t => t.done) &&
                    <BaseButton type="danger-blank" size="sm" disabled={busy.allDone} onClick={() => handleDeleteDone()}>
                        Remove all done
                    </BaseButton>
                }
            </div>
        </>
    );
};

export default TaskList;
