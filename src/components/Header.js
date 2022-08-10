const Header = ({title}) => {
    return (
        <div className="w-full">
            <div className="main-banner p-4">
                <h4 className="text-center font-bold uppercase text-white">{title}</h4>
            </div>
        </div>
    );
};

export default Header;
