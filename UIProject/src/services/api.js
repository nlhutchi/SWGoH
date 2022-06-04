class APIEndPoints {
    static BASE = window.config.APIBaseAddress;
    static GG_BASE = window.config.GGBaseAddress;

    static SIGN_IN = this.BASE + 'SignIn/';
    static GUILD_DATA = (guildId) => this.BASE + `GuildData/${guildId}/`;
    static GET_GG_GUILD = (guildId) => `${this.GG_BASE}guild-profile/${guildId}/`;
}

export default APIEndPoints;