import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <h1>No pages here please go home</h1>
            <Link to="/register">Go Home</Link>
        </div>
    );
}

export default NotFound;