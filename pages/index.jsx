import React, { useState, useEffect } from "react";
import PopUp from './components/PopUp'
import Header from './components/Header'
import Section from './components/Section'

const Home = () => {
    const [textId, setTextId] = useState('14055021959882752');
    const [avatar, setAvatar] = useState("/profile.png");
    const [odometerValue, setOdometerValue] = useState(100);
    const [errorMsg, setErrorMsg] = useState('Error message.')

    useEffect(()=>{           
        //return () => clearInterval(subs);
    })

    return (
        <div>
            <Header 
            odometerValue={odometerValue}
            setOdometerValue={setOdometerValue}
            setAvatar={setAvatar}
            textId={textId}
            setIdText={setTextId}
            />
            <Section 
            odometerValue={odometerValue} 
            setOdometerValue={setOdometerValue} 
            avatar={avatar} 
            textId={textId}
            />
            <PopUp errorMsg={errorMsg}/>
        </div>
    )
}

export default Home

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