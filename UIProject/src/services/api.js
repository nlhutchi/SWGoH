class APIEndPoints {
    static BASE = window.config.APIBaseAddress;

    static SIGN_IN = this.BASE + 'SignIn/';
    static GUILD_DATA = this.BASE + 'GuildData/';
}

export default APIEndPoints;