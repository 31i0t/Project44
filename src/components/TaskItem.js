const TaskItem = ({title}) => {
    return (
        <div className="flex items-center border rounded py-2 px-3">
            <input
                className="mr-3 bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                id="flowbite"
                aria-describedby="flowbite"
                type="checkbox"/>
            <p className="w-full text-grey-darkest">{title}</p>
            <button
                className="text-pink-500 background-transparent font-bold px-3 py-2 text-sm outline-none focus:outline-none"
                type="button">Remove</button>
        </div>
    );
};

export default TaskItem;
