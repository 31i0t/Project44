import TaskItem from "./TaskItem";
import BaseTitle from "./BaseTitle";

const TaskList = ({tasks, addTasks}) => {
    
    return (
        <div>            
            <div className="mb-2">
                <div className="flex">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 mr-1 text-grey-darker"
                        placeholder="Add Task"/>
                    <button
                        onClick={addTasks}
                        className="flex-no-shrink p-2 border-2 rounded text-teal border-teal">+</button>
                </div>
            </div>
            <div>
                {tasks.map(item => TaskItem(item))}
            </div>
        </div>
    );
};

export default TaskList;