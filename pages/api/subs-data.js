function createSubsData(){
    async function getSubs(id){
        let url = `https://cos.tv/api/v1/feed/video_user/others_follow_statistic?fuid=${id}`;
        
        const result = await fetch(url)

        const subs = await result.json();
        return subs.data.follower_count;
    }

    return {
        getSubs
    }
}

export default createSubsData;