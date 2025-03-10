import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="p-4 bg-gray-800 text-white flex justify-center gap-4">
            <Link to="/">Home</Link>
            <Link to="/diary">Diary</Link>
            <Link to="/calculator">Calculator</Link>
        </nav>
    );
};

export default Navigation;
