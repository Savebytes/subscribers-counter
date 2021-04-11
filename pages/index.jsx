import React, { useState, useEffect } from "react";
import {useRouter} from 'next/router'
import Link from 'next/link'
import GlobalStyles from './styles/GlobalStyles';
import styles from './styles/Index.module.css'
import dynamic from 'next/dynamic'
import { FaSearch } from 'react-icons/fa'
import useSwr from 'swr'
/*
const headerStyle = {
    'background-image': 'linear-gradient(260deg, #1f2121 0%, #000000 100%)',
    'box-shadow': '7px 6px 8px #00000078'
}
const navBar = {
    'padding-bottom': '10px;',
    'border': '1px solid rgba(0, 0, 0, 0.2)',
    'font-size': '18px;'
}

const logo = {
    'display': 'inline-block',
    'font-size': '22px',
    'margin-top': '10px',
    'margin-left': '20px'
}

const mainNav = {
    'list-style-type': 'none',
    'display': 'none'
}

const navLinks = {
    'list-style-type': 'none',
    'display': 'none'
}
*/

const Odometer = dynamic(import('react-odometerjs'), {
    ssr: false,
    loading: () => 0
})

const fetcher = (url) => fetch(url).then((res) => res.json());
//const { data, error } = useSwer('https://jsonplaceholder.typicode.com/todos/1', fetcher);
/*
export async function getServerSideProps(context){
    
    async function getSubs(){
        var url = 'https://cos.tv/api/v1/feed/video_user/others_follow_statistic?fuid=27062571695777792';
        
        const result = await fetch(url)
        return (await result).json()
        //var followers = data.data.follower_count;
        
        //.then(result => result.json())
        //.then(result => inscritos = result.data.follower_count);
    }
    var followers = await getSubs()
    return {
        props: {
            followers: followers.data.following_count
        }
    }
}
*/
const Home = () => {
    const {data, error} = useSwr('/api/followers', fetcher);
    const [odometerValue, setOdometerValue] = useState('');

    useEffect(() => {
        function callApi(){
            setOdometerValue(data.followers.data.following_count)
        }
        const subs = setInterval(() => {
            var canCall = false;
            if(canCall)
                callApi();
        }, 3000);
        return () => clearInterval(subs);
    })

    if(error) return <div>Failed to request!</div>
    if(!data) return <div>Loading...</div>
    
    return (
        <div>
            <GlobalStyles />
            <header className={styles.header}>
                <div className={styles.navBar}>
                    <Link href="/">
                        <a className={styles.logo}>Realtime Subscribers</a>
                    </Link>
                </div>
                <div className={styles.searchContainer}>
                    <div className={styles.input}>
                        <form className={styles.idForm} autoComplete="off">
                            <input className={styles.inputId} name="id" type="text" placeholder="Enter a CosTV channel ID here" />
                            <button className={styles.inputSubmit} type="submit"><FaSearch /></button>
                        </form>
                    </div>
                </div>
                <div className={styles.rightNavBar}>
                    <span className={styles.navbarToggle}>
                        <i></i>
                    </span>

                    <ul className={styles.mainNav}>
                        <li className={styles.mainLi}>
                            <a className={styles.navLinks}>Home</a>
                        </li>
                        <li className={styles.mainLi}>
                            <Link href="/about">
                                <a className={styles.navLinks}>About</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>
            <section className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.loading}>
                        <div className={styles.spinner} />
                    </div>
                    <div className={styles.userInfo}>
                        <div className={styles.avatarContainer}>
                            <img className={styles.userAvatar} src={"/profile.png"} ></img>
                        </div>
                    </div>
                    <div id={styles.subscribersCount}>
                        <Odometer duration={2000} value={odometerValue} format="d"></Odometer>
                    </div>

                    <div className={styles.subsDiv}>
                        <a className={styles.subsDivBtn} href="#" target="_blank">Subscribe</a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home

//use state
//<button onClick={this.onButtonClicked}>CLICA</button>
/*    onButtonClicked = () => {
        console.log("cu3")
        this.setState({ odometerValue: 1000 })
    }
*/
