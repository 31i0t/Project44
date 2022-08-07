const TaskItem = (props) => {
    return (<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="py-4 px-6">
                    <input type="checkbox" />
                </td>
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {props.title}
                </th>                                           
                <td class="py-4 px-6">
                    {props.priority}
                </td>
                <td class="py-4 px-6">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
                <td class="py-4 px-6">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                </td>
            </tr>);
};

export default TaskItem;