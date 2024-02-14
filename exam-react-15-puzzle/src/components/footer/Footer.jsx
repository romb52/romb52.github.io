import { FaGithub, FaLinkedin  } from "react-icons/fa";
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className={styles.footer}>
          <p>Roman Chertilin</p>
          <a href="https://github.com/romb52" target="_blank" rel="noreferrer"> <FaGithub /></a>
          <a href="https://www.linkedin.com/"  target="_blank" rel="noreferrer"><FaLinkedin /></a>          
        </div>
      </div>
    </footer>
  );
}
