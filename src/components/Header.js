// Header Component
const Header = ({title}) => {   
    return (
        <div className="w-full bg-cover bg-center">
            <div className="flex justify-start h-full w-full bg-blue-900">
                <div className="flex p-3">
                    <h1 className="text-white text-xl font-semibold uppercase md:text-l">
                        {title}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Header;
