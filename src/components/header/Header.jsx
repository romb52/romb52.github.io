import styles from './Header.module.css';
// //1.Varaiant
// export default function Header(props) {
//   return (
//     <header>
//       <h2>{props.headerTitle}</h2>
//       <nav>{props.headerMenu}</nav>
//     </header>
//   );
// }

//2.Varaiant
export default function Header({ headerTitle, headerMenu }) {
  const color = 'red';
  return (
    <header>
      <div className={`container ${styles.headerContainer} ${styles[color]}`}>
        <h2>{headerTitle}</h2>
        <nav>{headerMenu}</nav>
      </div>
    </header>
  );
}
