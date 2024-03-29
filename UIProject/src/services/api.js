class APIEndPoints {
    static BASE = window.config.APIBaseAddress;
    static GG_BASE = window.config.GGBaseAddress;

    static SIGN_IN = this.BASE + 'SignIn/';
    static GUILD_DATA = this.BASE + `GuildData/`;
    static GUILD_TW_DATA = this.BASE + `GuildData/TW/?guildId=5kekVkXxRf6VgXEUvN16yA`;
    static MEMBER_DATA = (allyCode) => this.BASE + `MemberData/${allyCode}/`;
    static CHARACTER_DATA = `${this.BASE}/MasterData/Characters/`;
    static GET_GG_GUILD = (guildId) => `${this.GG_BASE}guild-profile/${guildId}/`;
}

export default APIEndPoints;