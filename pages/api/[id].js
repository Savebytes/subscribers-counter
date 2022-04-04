//id example: 27062571695777792
import createSubsData from "./subs-data.js";
import createUserData from "./user-data.js";

export default async function handler(req, res){
    let {id} = req.query;

    const mockSubs = createSubsData();
    const mockUserData = createUserData();

    const data = fetchData({
        id: id,
        subs: mockSubs,
        userData: mockUserData
    });

    let followers = await data.getSubs();
    let userData = await data.getUserData();

    res.status(200).json({
        followers: followers,
        userData: userData
    });
}

function mockSubsData(){
    let fakeSubs = 0;
    function getSubs(id){
        console.log('[mock] Getting subs count...');
        fakeSubs = new Date().getSeconds();

        return fakeSubs;
    }

    return{
        getSubs
    }
}

function mockAvatarData(){
    function getAvatar(id){
        console.log('[mock] Getting avatar...');
        return "https://i.ibb.co/JcdFvH5/avatar-example.png";
    }

    return{
        getAvatar
    }
}

function fetchData(configurations = {}){
    const id = configurations.id || 27062571695777792;
    const subsData = configurations.subs || createSubsData();
    const userData = configurations.userData || createUserData();

    async function getSubs(){
        console.log('[data] Getting subs of id: ' + String(id));
        
        return subsData.getSubs(id);
    }

    async function getUserData(){
        console.log('[data] Getting avatar...');

        return userData.getUserData(id);
    }

    return {
        getSubs,
        getUserData
    }
}