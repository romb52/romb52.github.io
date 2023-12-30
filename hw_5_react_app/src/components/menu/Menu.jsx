import { Link, useLocation } from "react-router-dom";

export default function Menu() {
    const location = useLocation();
    return (
        <nav > 
            <ul className="d-flex gap-3">
                <li key='home'><Link to='/'  className={location.pathname==='/'&& 'active'} >Home</Link></li>
                <li key='posts'><Link to='/posts' className={location.pathname==='/posts'&& 'active'}>Posts</Link></li>
            </ul>
        </nav>
    );
}