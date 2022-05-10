import React from "react";

import Portal from "utils/Portal";
import styles from "./modal.module.scss";

interface IModalPostTasks {
    onClose: () => void
    errorMessage: string
}

const ModalPostTasks: React.FC<IModalPostTasks> = ({ onClose, errorMessage }) => {

    const successfulRequest = 'data successfully saved on the server';

    return (
        <Portal>
            <div className={styles.modal}>
                <div className={styles.modal__window}>
                    <div>
                        <h2>{errorMessage ? errorMessage : successfulRequest}</h2>
                    </div>
                    <div className={styles.modal__footer}>
                        <button className={styles.button} onClick={onClose}> X </button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default ModalPostTasks;