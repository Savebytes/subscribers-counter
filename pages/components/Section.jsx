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
                <div className={styles.userInfo}>
                    <div className={styles.avatarContainer}>
                        <a href={'https://cos.tv/channel/' + props.textId}>
                            <img className={styles.userAvatar} src={props.avatar} alt="Profile picture"></img>
                        </a>
                    </div>
                    <span className={`${styles.spanNickname} ${styles.span}`}>{props.nickname}</span>
                </div>
                <div id={styles.subscribersCount}>
                    <Odometer duration={2000} value={props.odometerValue} format="(.ddd).dd"></Odometer>
                </div>

                <div className={styles.subsDiv}>
                    <a className={styles.subsDivBtn} aria-label="Search" href={'https://cos.tv/channel/' + props.textId}>Subscribe</a>
                </div>
            </div>
            <div className={styles.container}>
                <span className={`${styles.span}`}>Views in the last month</span>
                <p>Coming soon...</p>
            </div>
            <div className={`${styles.loading} ${props.fetchInProgress === true ? '' : styles.hide}`}>
                <div className={styles.spinner} />
                <p>Searching...</p>
            </div>
        </section>
    )
}

export default Section