const TaskItem = ({title}) => {
    return (<div className="flex mb-4 items-center">
                <input 
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                type="checkbox" />
                <p className="w-full text-grey-darkest">{title}</p>                
                <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red">Remove</button>
            </div>);
};

export default TaskItem;