import React, { useRef } from "react";
import cn from "classnames";

import styles from "./controlPanel.module.scss";

export interface IControlPanel {
    onCompleteAll: () => void
    onDeleteAll: () => void
    onInput: (e: React.ChangeEvent<HTMLInputElement>) => void
    inputValue: string
    onAdd: () => void
}

const ControlPanel: React.FC<IControlPanel> = ({ onCompleteAll, onDeleteAll, onInput, inputValue, onAdd }) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const handleAdd = () => {
        onAdd();
        inputRef.current?.focus();
    };

    const interfaceInput = cn(styles.interface, styles.interface__input);
    const interfaceButton = cn(styles.interface, styles.interface__button);

    return (
        <section className={styles.container}>
            <button className={interfaceButton} onClick={onCompleteAll}> Complete
                all </button>
            <button className={interfaceButton} onClick={onDeleteAll}> Delete
                all </button>
            <input ref={inputRef} type="text" placeholder="Text" value={inputValue} className={interfaceInput} onChange={onInput} />
            <button className={interfaceButton} onClick={handleAdd}> Add </button>
        </section>
    );
};

export default ControlPanel;