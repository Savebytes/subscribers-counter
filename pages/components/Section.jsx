import React, {useState} from 'react';
import dynamic from 'next/dynamic'
import styles from '../styles/Index.module.css'

const Odometer = dynamic(import('react-odometerjs'), {
    ssr: false,
    loading: () => 0
})

function Section(props){
    return(
        <section className={styles.main}>
            <div className={styles.container}>
                <div className={styles.loading}>
                    <div className={styles.spinner} />
                </div>
                <div className={styles.userInfo}>
                    <div className={styles.avatarContainer}>
                        <img className={styles.userAvatar} src={props.avatar} alt="Profile picture"></img>
                    </div>
                </div>
                <div id={styles.subscribersCount}>
                    <Odometer duration={2000} value={props.odometerValue} format="(.ddd).dd"></Odometer>
                </div>

                <div className={styles.subsDiv}>
                    <a className={styles.subsDivBtn} aria-label="Search" href={'https://cos.tv/channel/' + props.textId} target="_blank">Subscribe</a>
                </div>
            </div>
        </section>
    )
}

export default Section