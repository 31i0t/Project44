import TaskItem from "./TaskItem";
import BaseButton from "./BaseButton";
import BaseInput from "./BaseInput";
import useInput from "../hooks/useInput";
import { validateInput, trimSpaces } from "../utils";

const TaskList = ({tasks, addTasks}) => {
    const [input, setInput] = useInput('');

    return (
        <div>
            <div className="mb-3">
                <div className="flex">
                    <BaseInput
                        className="mr-2"
                        value={input.value}
                        error={input.error}
                        placeholder="Add Task"
                        onChange={(value) => setInput(validateInput(value))} />
                    <BaseButton
                        disabled={Boolean(input.error) || trimSpaces(input.value) === ''}
                        onClick={() => addTasks(input.value)}
                        type="primary">+</BaseButton>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {tasks.map(item => TaskItem(item))}
            </div>
        </div>
    );
};

export default TaskList;
