import styles from './Main.module.css'
import odesa1 from '../../img/odesa1.jpg'
import odesa2 from '../../img/odesa2.jpg'
import odesa3 from '../../img/odesa3.jpg'
import odesa4 from '../../img/odesa4.jpg'
//import potemkinstairs from '../../img/Potemkinstairs.jpg'

const Main = () => {
    return (
        <>            
                <header className='container' >
                    <div>
                        <p>Я живу в найчарівнішому місті в світі, перлині біля моря - Одесі.</p>
                        <p>Днем народження мого міста вважається 22 серпня 1794 року, коли були забиті перші палі порту і закладені перші камені міста </p>
                        <div className={styles.imgBlock}>
                            <img src={odesa1} alt="" />
                            <img src={odesa2} alt="" />
                        </div>
                        <p>Сьогодні це унікальне українське місто  відоме в усьому світі.  Ця унікальність – у її географічному положенні, як вічного мосту між українськими полями та безкрайнім морем, де поєднуються традиції українського чумацтва та міжнародної торгівлі.
                            Ця унікальність – у її мультикультурності, поєднанні культур і традицій, принесених сюди представниками багатьох національностей, що відображено в усіх сферах – від містобудування до менталітету її мешканців.
                            Унікальність Одеси – це одесити різних національностей, які створили неповторну одеську спадщину. </p>
                        <div className={styles.imgBlock}>
                            <img src={odesa3} alt="" />
                            <img src={odesa4} alt="" />
                        </div>
                    </div>
                </header>           
        </>
    )
}
export default Main;