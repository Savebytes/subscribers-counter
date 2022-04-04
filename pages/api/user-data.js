function createUserData(){
    async function getUserData(id){
        let url = `https://cos.tv/api/v1/common/cos_user_info?uid=${id}`;

        const result = await fetch(url);
        const jsonResult = await result.json();

        return {
            avatar: jsonResult.data.avatar,
            nickname: jsonResult.data.nickname
        };
    }

    return {
        getUserData
    }
}

export default createUserData;