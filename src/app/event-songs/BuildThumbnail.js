//https://wfjukebox.b-cdn.net/boss_banners/collab/advent_b_collabo_event_banner.png
//example
const collabIDs = {
    "b_collabo": "advent_b_collabo_event_banner",
    "peco" : "advent_event_banner_04",
    "Gcollab" : "advent_Gcollab_event_banner",
    "k_collab" : "advent_k_collab_event_banner",
    "Rcollab" : "advent_Rcollab_event_banner",
    "scollab" : "advent_scollab_event_banner",
    "u_collabo" : "advent_u_collabo_event_banner",
    "Zcollab" : "advent_Zcollab_event_banner",
}

class BuildThumbnail {
    source = "https://wfjukebox.b-cdn.net/boss_banners/";

    eventTypes = ["advent", "collab", "ddragon", "empress", "raid_event", "spirit_beast", "steam"];
    constructor(type, event, element=null) {
        if (type === "collab") {
            this.type = type;
            this.file = collabIDs[event] + ".png";
        }
    }

    buildURL() {
        return this.source + this.type + "/" + this.file;
    }

}

export default BuildThumbnail;