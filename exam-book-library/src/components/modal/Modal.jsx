import styles from './Modal.module.css';
import { IoMdClose } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { useEffect } from 'react';

export default function Modal({ isModalOpen, openModal,  children }) {

  useEffect(() => {
    if (isModalOpen) {
        document.body.classList.add('no-scroll');
    } else {
        document.body.classList.remove('no-scroll');
    }
}, [isModalOpen]);


  return (
    <div
      className={`${styles.modalWrap} ${isModalOpen && styles.open} `}
      onClick={() => openModal()}
    >
      <div className={styles.modalInner} onClick={(e) => e.stopPropagation()}>
        <IconContext.Provider
          value={{ size: '35px', className: `icon ${styles.icon}` }}
        >
          <IoMdClose className={styles.closeModal} onClick={() => openModal()} />
        </IconContext.Provider>

        {children}
      </div>
    </div>
  );
}