const Header = ({title, summary}) => {
    const style = {
        width: "100%",
        height: "80px"        
    };

    return (
        <div className="w-full bg-cover bg-center">
            <div style={style}
                className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
                <div className="text-center">
                    <h1 className="text-white p-2 text-2xl font-semibold uppercase md:text-l">
                        {title}
                    </h1>
                    <h4 className="text-white p-2 font-semibold md:text-l">{summary}</h4>
                </div>
            </div>
        </div>
    );
};

export default Header;
