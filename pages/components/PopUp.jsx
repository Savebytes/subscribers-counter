import React from "react";
import styles from "./PopUp.module.css"

const PopUp = (props) => {
    return (
        <div className={styles.popUp}>
            <div>{props.errorMsg}</div>
        </div>
    )
}

export default PopUp