import React from "react";
import cn from "classnames";

import useTypedSelector from "store/useTypedSelector";
import useTypedDispatch from "store/useTypedDispatch";
import { getTasks, postTasks } from "store/actionAsyncCreators";
import styles from "./fetchPanel.module.scss"

const FetchPanel: React.FC = () => {

    const dispatch = useTypedDispatch();
    const tasks = useTypedSelector(state => state.taskReducer.tasks);
    const interfaceButton = cn(styles.interface, styles.interface__button);

    const handleReplace = async () => {
        dispatch(getTasks());
    };

    const handleSend = async () => {
        dispatch(postTasks(tasks))
    };

    return (
        <section className={styles.container}>
            <button className={interfaceButton} onClick={handleReplace}> replace tasks from server </button>
            <button className={interfaceButton} onClick={handleSend}> send tasks to server </button>
        </section>
    )
};

export default FetchPanel;