export default async function handler(req, res){
    async function getSubs(){
        var url = 'https://cos.tv/api/v1/feed/video_user/others_follow_statistic?fuid=27062571695777792';
        
        const result = await fetch(url)
        return (await result).json()
        //var followers = data.data.follower_count;
    }
    var followers = await getSubs()
    res.status(200).json({'followers':followers});
}