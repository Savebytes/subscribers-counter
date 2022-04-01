import React, {useState} from 'react';
import Link from 'next/link'
import styles from './Header.module.css'
import { ImSearch } from 'react-icons/im'
import { GiHamburgerMenu } from 'react-icons/gi'
import { CgClose } from 'react-icons/cg'

function Header(props){
    const [open, setOpen] = useState(null);
    const [timer, setTimer] = useState(null);
    const [errorMsg, setErrorMsg] = useState('Error message.');
    const [searchOpen, setSearchOpen] = useState(false);
    
    function handleSubmit(event){
        event.preventDefault();
        
        props.setFetch(true);
        function callApi() {  
            if(props.textId == ""){
                setErrorMsg("Por favor, específique um id!");
                props.setFetch(false);
                return;
            }
            else if(props.textId.length != 17){
                setErrorMsg("O id precisa ser 17 caracteres!" + "\n" + props.textId.length + "/17");
                props.setFetch(false);
                return;
            }else{
                setErrorMsg("Carregando perfil...");
            }
            fetch("api/" + props.textId).then(response => {
            response.json().then(info => {
                var subsAmount = info.followers;
                var avatar = info.avatar;           
                
                if(subsAmount != null){
                    props.setOdometerValue(subsAmount);
                    props.setAvatar(avatar)
                    props.setIdText(props.textId);
                    props.setFetch(false);
                    return;
                }
                
                console.log("Avatar não carregado!");
                setErrorMsg("Carregado com sucesso!");
                props.setFetch(false);
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

    // todo: fix search bar when browser resize 
    // (the bar disappears because of searchOpen)

    return(
        <header className={styles.header}>
            <div className={styles.navBar}>
                <Link href="/">
                    <a className={styles.logo}>Realtime Subscribers</a>
                </Link>
            </div>

            <div className={`${styles.searchContainer} ${styles.desktop}`}>
                <div className={styles.input}>  
                    <form className={styles.idForm} autoComplete="on" onSubmit={(e) => { handleSubmit(e) }}>
                        <input maxLength="17" onChange={e => props.setIdText(e.target.value)} title="Search" className={styles.inputId} name="id" type="text" placeholder="Enter a CosTV channel ID here" />
                        <button className={`${styles.inputSubmit} ${styles.desktop}`} aria-label="Search" title="Search id" type="submit"><ImSearch size={24}/></button>
                    </form>
                </div>
            </div>

            {searchOpen &&
            <div className={`${styles.searchContainer} ${styles.mobile}`}>
                <div className={styles.input}>  
                    <form className={styles.idForm} autoComplete="on" onSubmit={(e) => { handleSubmit(e) }}>
                        <input maxLength="17" onChange={(e) => {
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
                    <a className={styles.searchButton} onClick={() => setSearchOpen(!searchOpen)}><ImSearch /></a>
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