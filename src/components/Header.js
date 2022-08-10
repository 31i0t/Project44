const Header = ({title}) => {
    return (
        <div class="w-full">
            <div class="main-banner p-4">
                <h4 class="text-center font-bold uppercase text-white">{title}</h4>
            </div>
        </div>
    );
};

export default Header;