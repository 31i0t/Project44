import TaskItem from "./TaskItem";
import BaseTitle from "./BaseTitle";

const TaskList = ({tasks}) => {        

    const titleLayout = <BaseTitle label="Tasks" classes={["pl-2"]} />

    return (        
        <div className="overflow-x-auto relative shadow-md">
            {titleLayout}
            <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
                <div className="bg-white rounded shadow p-6 w-full">
                    <div className="mb-2">                        
                        <div className="flex">
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-1 text-grey-darker" 
                                   placeholder="Add Task" />
                            <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal">+</button>
                        </div>
                    </div>                        
                    <div>                        
                        {tasks.map(item => TaskItem(item))} 
                    </div>
                </div>
            </div>
        </div>        
        );
};

export default TaskList;