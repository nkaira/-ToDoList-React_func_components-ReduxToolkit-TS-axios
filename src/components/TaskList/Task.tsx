import React from "react";
import cn from "classnames"
import { Link } from "react-router-dom";

import { ITaskComponent } from "Interface/ITask";
import styles from "./taskList.module.scss";

const Task: React.FC<ITaskComponent> = ({ onModalShow, onComplete, isComplete, description, id }) => {

    const taskTextClass = cn(styles.taskText, { [styles.taskComplete]: isComplete });

    return (
        <li className={styles.task}>
            <button className={styles.buttonComplete} onClick={onComplete}> Complete </button>
            <Link to={`/${id}`}>
                <div className={taskTextClass}>
                    {description}
                </div>
            </Link>
            <button className={styles.buttonDelete} onClick={onModalShow}> Delete </button>
        </li>
    );
};

export default Task;
