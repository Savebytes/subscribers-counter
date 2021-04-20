import React, { useState, useEffect } from "react";
import {useRouter} from 'next/router'
import Link from 'next/link'
import styles from './styles/Index.module.css'
import dynamic from 'next/dynamic'
import { FaSearch } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
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

const Error = props => {
    return(
    <div className={styles.errorAlert}>
        <div>{props.errorMsg}</div>
    </div>
    )
}

//const { data, error } = useSwer('https://jsonplaceholder.typicode.com/todos/1', fetcher);
/*
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
    const [textId, setIdText] = useState('');
    const [errorMsg, setErrorMsg] = useState('Error message.')
    const [avatar, setAvatar] = useState('');
    const [odometerValue, setOdometerValue] = useState(10000);
    const [timer, setTimer] = useState(null);
    const [open, setOpen] = useState(null);

  //  if(error) return <div>Failed to request!</div>
//    if(!data) return <div>Loading...</div>
    
    useEffect(()=>{           
        //return () => clearInterval(subs);
    })

    function onHandleSubmit(event){
        event.preventDefault();
        const url = window.location.origin+'/api/'+textId;
        
        var canCall = true;
        function callApi() {
            if(!canCall) return;
            
            if(textId == ""){
                setErrorMsg("Porfavor, específique um id!");
                return;
            }
            else if(textId.length != 17){
                setErrorMsg("O id precisa de 17 caracteres!" + "\n" + textId.length + "/17");
                return;
            }else{
                setErrorMsg("Carregando perfil...");
            }
            fetch(url).then(response => {
            response.json().then(info => {
                var subsAmount = info.followers.data.follower_count;
                var avatar = info.avatar.data.avatar
                console.log("Subs: "+subsAmount);                
                
                if(subsAmount != null){
                    setOdometerValue(subsAmount);
                }
                
                if(avatar != null && avatar != ""){
                    setAvatar(avatar)
                }else{
                    console.log("Avatar não carregado!");
                }
                setErrorMsg("Carregado com sucesso!");
            });
        });
        }
        if(!timer){
            setTimer(setInterval(callApi, 4000));
            console.log("Timer criado com sucesso!");
        }else{
            setTimer(clearInterval(timer));
            setTimer(setInterval(callApi, 4000));
            console.warn("timer reiniciado " + timer);
        }
    }

    return (
        <div>
            <header className={styles.header}>
                <div className={styles.navBar}>
                    <Link href="/">
                        <a className={styles.logo}>Realtime Subscribers</a>
                    </Link>
                </div>
                <div className={styles.searchContainer}>
                    <div className={styles.input}>
                        <form className={styles.idForm} autoComplete="off" onSubmit={ (e) => {onHandleSubmit(e)}}>
                            <input maxLength="17" onChange={e => setIdText(e.target.value)} title="Search" className={styles.inputId} name="id" type="text" placeholder="Enter a CosTV channel ID here" />
                            <button className={styles.inputSubmit} aria-label="Search" title="Search id" type="submit"><FaSearch /></button>
                        </form>
                    </div>
                </div>
                <Error errorMsg={errorMsg}></Error>
                <div className={styles.rightNavBar}>
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
                    <a className={styles.closeButton} onClick={()=> setOpen(!open)} ><GiHamburgerMenu/></a>
                    <div className={open? styles.sideNav : styles.sideNavClose}>
                        <a href="#1">Home</a>
                        <a href="#2">Services</a>
                        <a href="#3">Prices</a>
                        <a href="#4">About Us</a>
                    </div>
                </div>
            </header>
            <section className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.loading}>
                        <div className={styles.spinner} />
                    </div>
                    <div className={styles.userInfo}>
                        <div className={styles.avatarContainer}>
                            <img className={styles.userAvatar} src={avatar || "/profile.png"} alt="Profile picture"></img>
                        </div>
                    </div>
                    <div id={styles.subscribersCount}>
                        <Odometer duration={2000} value={odometerValue} format="(.ddd).dd"></Odometer>
                    </div>

                    <div className={styles.subsDiv}>
                        <a className={styles.subsDivBtn} aria-label="Search" href={'https://cos.tv/channel/'+textId} target="_blank">Subscribe</a>
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
