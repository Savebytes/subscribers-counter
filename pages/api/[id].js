//id example: 27062571695777792
import createSubsData from "./subs-data.js";
import createAvatarData from "./avatar-data.js";

function mockSubsData(){
    function getSubs(id){
        console.log('[mock] Getting subs count...');
        return (Math.floor(Math.random() * 10 + 1));
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

export default async function handler(req, res){
    let {id} = req.query;

    const mockSubs = mockSubsData();
    const mockAvatar = mockAvatarData();

    const data = fetchData({
        id: id,
        subs: mockSubs,
        avatar: mockAvatar
    });

    let followers = await data.getSubs();
    let avatarImage = await data.getAvatar();

    console.log("inscritos:" + followers);
    
    res.status(200).json({
        'followers':followers,
        'avatar':avatarImage
    });
}

function fetchData(configurations = {}){
    const id = configurations.id || 27062571695777792;
    const subsData = configurations.subs || createSubsData();
    const avatarData = configurations.avatar || createAvatarData();

    async function getSubs(){
        console.log('[data] Getting subs of id: ' + String(id));
        
        return subsData.getSubs(id);
    }

    async function getAvatar(){
        console.log('[data] Getting avatar...');

        return avatarData.getAvatar(id);
    }

    return {
        getSubs,
        getAvatar
    }
}