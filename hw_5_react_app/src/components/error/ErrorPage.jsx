import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Errorpage() {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => { if (location.pathname !== '/404') {
        navigate ('/404')
     } }, [navigate, location]);
    return <section>
        <div className="container">
            <h1> Ooops! Page not found</h1>
            <Link to='/'>Home</Link>
        </div>
    </section>
}