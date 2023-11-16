import styles from './Main.module.css';


const Main = ({ lang,list }) => {    

    return (
        <>
            <div className={`container ${styles.mainwrap}`}>
                <div className={styles.list}>
                    {list.map((item, i) => <p key={`item - ${i + 1}`}>{item}</p>)}
                </div>
            </div>
        </>
    )
}
export default Main;