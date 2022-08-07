import TaskItem from "./TaskItem";
import BaseTitle from "./BaseTitle";

const TaskList = ({tasks}) => {        

    const titleLayout = <BaseTitle label="Tasks" classes={["pl-2"]} />

    return (        
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
            {titleLayout}
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r m-1">
                Add
            </button>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="py-3 px-6">
                            Done?
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Task
                        </th>                                                
                        <th scope="col" class="py-3 px-6">
                            Priority
                        </th>
                        <th scope="col" class="py-3 px-6">                            
                        </th>
                        <th scope="col" class="py-3 px-6">                        
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(item => TaskItem(item))}                           
                </tbody>
            </table>
        </div>        
        );
};

export default TaskList;