//id exemplo: 27062571695777792
export default async function handler(req, res){
    var {subs} = req.query;
    async function getSubs(){
        var url = 'https://cos.tv/api/v1/feed/video_user/others_follow_statistic?fuid=' + subs;
        const result = await fetch(url)
        try {
            return (await result).json()
        } catch (error) {
            throw new Error("Error, invalid json.");
        }

        //var followers = data.data.follower_count;
    }
    async function getAvatar(){
        var url = 'https://cos.tv/api/v1/common/cos_user_info?uid=' + subs;

        const result = await fetch(url)
        return (await result).json()
        //var followers = data.data.follower_count;
    }
    var followers = await getSubs();
    var avatarImage = await getAvatar();
    res.status(200).json({'followers':followers, 'avatar':avatarImage});
}

/*

export default async function handler(req, res){
    const {id} = req.query
    res.end(`id: ${id}`);
}
*/