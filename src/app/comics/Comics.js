const comics = require('./comics_en.json')

class Comics {
    constructor(region, episode) {
        this.region = region;
        this.episode = episode;
        this.icon = './small.png';
        this.base = 'base.png';
        this.large = './large.png';
        this.comicSource = "https://wfjukebox.b-cdn.net/comics/";
        this.source = "https://wfjukebox.b-cdn.net/comics/" + this.region + "/" + this.episode + '/';
        this.title = comics[episode-1].title;
    }


    setEpisode(episode) {
        this.episode = episode;
    }

    setRegion(region) {
        this.region = region;
    }

    buildUrl(size, lang = this.region, episode = this.episode, stella = false) {
        let baseSource = false;
        switch (lang) {
            case 'comics-en':
                baseSource = stella ? 'stella-en' : 'comics-en';
                break;
            case 'comics-jp':
                baseSource = stella ? 'stella-jp' : 'comics-jp';
                break;
            case 'comics-tw':
                baseSource = stella ? 'stella-tw' : 'comics-tw';
                break;
            default:
                return '';
        }
    
        switch (size) {
            case 'base':
                return this.comicSource + baseSource + '/' + episode + '/' + this.base;
            case 'large':
                return this.comicSource + baseSource + '/' + episode + '/' + this.large;
            case 'icon':
                return this.comicSource + baseSource + '/' + episode + '/' + this.icon;
            default:
                return '';
        }
    }
    

}

export default Comics;