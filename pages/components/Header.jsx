import React, {useState} from 'react';
import { useRef } from 'react'
import Link from 'next/link'
import styles from './Header.module.css'
import { ImSearch } from 'react-icons/im'
import { GiHamburgerMenu } from 'react-icons/gi'
import { CgClose } from 'react-icons/cg'
import { BiError } from 'react-icons/bi'

function Header(props){
    const [open, setOpen] = useState(null);
    const timer = useRef(null);
    const popupRef = useRef(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [messagePopup, setMessagePopup] = useState({
        active: false
    });
    const [errorText, setErrorText] = useState("This a error example.");

    const timeBetweenFetch = 8 * 1000;
    
    function handleSubmit(event){
        event.preventDefault();
        
        props.setFetch(true);

        function callApi() {  
            if(props.textId == ""){
                props.setFetch(false);
                setErrorText("O id de usuário não pode estar vazio.");
                setMessagePopup({active: true});
                stopTimer();
                return;
            }
            else if(props.textId.length != 17){
                props.setFetch(false);
                setErrorText("O id de usuário precisa ter 17 números.");
                setMessagePopup({active: true});
                stopTimer();
                return;
            }
            fetch("api/" + props.textId).then(response => {
            response.json().then(info => {
                var subsAmount = info.followers;
                var avatar = info.avatar;           
                
                if(avatar != null){
                    props.setOdometerValue(subsAmount);
                    props.setAvatar(avatar)
                    props.setIdText(props.textId);
                    props.setFetch(false);
                    return;
                }
                
                console.log("[client] Error usuario n encotnrado...");
                setErrorText("O id de usuário '" + props.textId + "' não foi encontrado, por favor verifique se ele está correto e tente novamente.");
                setMessagePopup({active: true});
                stopTimer();
                props.setFetch(false);
            });
        });
        }
        
        stopTimer();
        startTimer(callApi);

        callApi();
    }
    
    function startTimer(callback) {
        console.log("[client] Start timer...");
        timer.current = setInterval(() => {
            callback();
        }, timeBetweenFetch);
    }

    function stopTimer() {
        console.log("[client] Stop timer: " + timer.current);
        clearInterval(timer.current);
    }

    function handleClickInside(e) {
        if(!popupRef.current.contains(e.target)){
            setMessagePopup({active: false});
        }
    }

    return(
        <header className={styles.header}>
            <div className={styles.navBar}>
                <Link href="/">
                    <a className={styles.logo}>Realtime Subscribers (Beta)</a>
                </Link>
            </div>

            <div className={`${styles.searchContainer} ${styles.desktop}`}>
                <div className={styles.input}>  
                    <form className={styles.idForm} autoComplete="on" onSubmit={(e) => { handleSubmit(e) }}>
                        <input maxLength={17} onChange={e => props.setIdText(e.target.value)} title="Search" className={styles.inputId} name="id" type="text" placeholder="Enter a CosTV channel ID here"/>
                        <button className={`${styles.inputSubmit} ${styles.desktop}`} aria-label="Search" title="Search id" type="submit"><ImSearch size={24}/></button>
                    </form>
                </div>
            </div>

            {searchOpen &&
            <div className={`${styles.searchContainer} ${styles.mobile}`}>
                <div className={styles.input}>  
                    <form className={styles.idForm} autoComplete="on" onSubmit={(e) => { handleSubmit(e) }}>
                        <input maxLength={17} onChange={(e) => {
                            props.setIdText(e.target.value);
                        }} title="Search" className={styles.inputId} name="id" type="text" placeholder="Enter a CosTV channel ID here" />
                        <button className={styles.inputSubmit} aria-label="Search" title="Search id" type="submit"><ImSearch size={24}/></button>
                        <button className={styles.inputClose} onClick={() => setSearchOpen(!searchOpen)} aria-label="Search" title="Search by id" type="button"><CgClose size={32}/></button>
                    </form>
                </div>
            </div>
            }

            <div className={styles.rightNavBar}>
                <ul className={styles.mainNav}>
                        <li className={styles.mainLi}>
                        <Link href="/#home">
                            <a className={styles.navLinks}>Home</a>
                            </Link>
                        </li>
                    <li className={styles.mainLi}>
                        <Link href="/#about">
                            <a className={styles.navLinks}>About</a>
                        </Link>
                    </li>
                </ul>
                <div className={styles.buttonsWrap}>
                    <a className={styles.closeButton} onClick={() => setOpen(!open)} ><GiHamburgerMenu /></a>
                    <a className={styles.searchButton} onClick={() => setSearchOpen(!searchOpen)}><ImSearch /></a>
                </div>
                <div className={open ? styles.sideNav : styles.sideNavClose}>
                    <a href="#1">Home</a>
                    <a href="#4">About</a>
                </div>
            </div>

            
            <div className={`${styles.errorMessageContainer} ${messagePopup.active ? '' : styles.hidePopup}`} onClick={(e)=>handleClickInside(e)}>
                <div className={styles.errorBox} ref={popupRef}>
                    <BiError size={100}></BiError>
                    <h1>Error</h1>
                    <p>{errorText}</p>
                    <button className={styles.buttonConfirmation} onClick={(e) => {
                        setMessagePopup({active: false});
                    }}>OK</button>
                </div>
            </div>
            
        </header>

    );
}

export default Header;