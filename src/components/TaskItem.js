const TaskItem = ({title, addTasks}) => {
    return (
        <div className="flex mb-4 items-center border rounded shadow p-2">
            <div className="flex items-start items-center mr-4">
                <input className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" id="flowbite" aria-describedby="flowbite" type="checkbox" />                
            </div>
            <p className="w-full text-grey-darkest">{title}</p>
            <button className="text-pink-500 background-transparent font-bold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Remove</button>
        </div>        
    );
};

export default TaskItem;