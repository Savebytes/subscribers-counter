function createAvatarData(){
    async function getAvatar(id){
        let url = `https://cos.tv/api/v1/common/cos_user_info?uid=${id}`;

        const result = await fetch(url);
        const avatar = await result.json();

        return avatar.data.avatar;
    }

    return {
        getAvatar
    }
}

export default createAvatarData;