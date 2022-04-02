//id example: 27062571695777792
import createSubsData from "./subs-data.js";
import createAvatarData from "./avatar-data.js";

export default async function handler(req, res){
    let {id} = req.query;

    const mockSubs = createSubsData();
    const mockAvatar = createAvatarData();

    const data = fetchData({
        id: id,
        subs: mockSubs,
        avatar: mockAvatar
    });

    let followers = await data.getSubs();
    let avatarImage = await data.getAvatar();

    console.log("avatar " + avatarImage);
    
    // setTimeout(()=>{
        

    // }, 2000);

    res.status(200).json({
        'followers':followers,
        'avatar':avatarImage
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