class TwitData {
    constructor(data) {
        this.userName = data.includes.users[0].name;
        this.profileImageUrl = data.includes.users[0].profile_image_url;
        this.createdAt = new Date(data.data.created_at).toDateString();
        this.message = data.data.text;
    }
}
export default TwitData;
