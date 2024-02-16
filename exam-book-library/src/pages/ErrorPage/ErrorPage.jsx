import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from './ErrorPage.module.css';
import { FaHome } from 'react-icons/fa';
import { withLayout } from '../../components/Main/Main';

 function Errorpage() {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => { if (location.pathname !== '/404') {
        navigate ('/404')
     } }, [navigate, location]);
    return <section>
        <div className="container">
            <h1> Ooops! Page not found</h1>
            <Link className={styles.linkHome} to='/'><FaHome className={styles.homeIcon} />Home</Link>
        </div>
    </section>
}

export default withLayout(Errorpage);