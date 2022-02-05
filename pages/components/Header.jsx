import React, {useState} from 'react';
import Link from 'next/link'
import styles from './Header.module.css'
import { ImSearch } from 'react-icons/im'
import { GiHamburgerMenu } from 'react-icons/gi'

function Header(props){
    const [open, setOpen] = useState(null);
    const [timer, setTimer] = useState(null);
    const [errorMsg, setErrorMsg] = useState('Error message.');
    
    function handleSubmit(event){
        event.preventDefault();
        
        var canCall = true;
        function callApi() {
            if(!canCall) return;
            
            if(props.textId == ""){
                setErrorMsg("Porfavor, específique um id!");
                return;
            }
            else if(props.textId.length != 17){
                setErrorMsg("O id precisa de 17 caracteres!" + "\n" + textId.length + "/17");
                return;
            }else{
                setErrorMsg("Carregando perfil...");
            }
            fetch("api/" + props.textId).then(response => {
            response.json().then(info => {
                var subsAmount = info.followers.data.follower_count;
                var avatar = info.avatar.data.avatar;

                console.log("Subs: "+ avatar);                
                
                if(subsAmount != null){
                    props.setOdometerValue(subsAmount);
                    props.setAvatar(avatar)
                    props.setIdText(props.textId);
                    return;
                }
                
                console.log("Avatar não carregado!");
                setErrorMsg("Carregado com sucesso!");
            });
        });
        }
        if(!timer){
            callApi();
            setTimer(setInterval(callApi, 8000));
            console.log("Timer criado com sucesso!");
        }else{
            callApi();
            setTimer(clearInterval(timer));
            setTimer(setInterval(callApi, 8000));
            console.warn("timer reiniciado " + timer);
        }
    }

    return(
        <header className={styles.header}>
            <div className={styles.navBar}>
                <Link href="/">
                    <a className={styles.logo}>Realtime Subscribers</a>
                </Link>
            </div>
            <div className={styles.searchContainer}>    
                <div className={styles.input}>  
                    <form className={styles.idForm} autoComplete="off" onSubmit={(e) => { handleSubmit(e) }}>
                        <input maxLength="17" onChange={e => props.setIdText(e.target.value)} title="Search" className={styles.inputId} name="id" type="text" placeholder="Enter a CosTV channel ID here" />
                        <button className={styles.inputSubmit} aria-label="Search" title="Search id" type="submit"><ImSearch size={16}/></button>
                    </form>
                </div>
            </div>
            <div className={styles.rightNavBar}>
                <ul className={styles.mainNav}>
                        <li className={styles.mainLi}>
                        <Link href="/home">
                            <a className={styles.navLinks}>Home</a>
                            </Link>
                        </li>
                    <li className={styles.mainLi}>
                        <Link href="/about">
                            <a className={styles.navLinks}>About</a>
                        </Link>
                    </li>
                </ul>
                <div className={styles.buttonsWrap}>
                    <a className={styles.closeButton} onClick={() => setOpen(!open)} ><GiHamburgerMenu /></a>
                    <a className={styles.searchButton}><ImSearch /></a>
                </div>
                <div className={open ? styles.sideNav : styles.sideNavClose}>
                    <a href="#1">Home</a>
                    <a href="#2">Services</a>
                    <a href="#3">Prices</a>
                    <a href="#4">About Us</a>
                </div>
            </div>
        </header>
    );
}

export default Header;