export default class Utill
{
    static lsSet (key, value) {
        // user can disable localStorage
        try {
            window.localStorage.setItem(key, value)
        } catch (exception) {}
    }
    
    static lsGet (key, parse=true) {
        // some versions of safari disable localStorage in private mode
        try {
            return (parse)?JSON.parse(window.localStorage.getItem(key)):window.localStorage.getItem(key);
        } catch (exception) {
            return null
        }
    }

    static getUrl(path, query=''){
      query = query === ''?'':'&'+query;
      return '/'+path+'?token=pk_ad3873aa037a47e796cd3ffa97e38ce0'+query;
    }

    static timeDiff(from, to, format=3){
        let diff = to - from;
        let msec = diff;
        let d = 0;
        
        switch (format) {
            case 0:
                // seconds
                d = Math.floor(msec / 1000);
                msec -= d * 1000;
                break;

            case 1:
                // hours
                d = Math.floor(msec / 1000 / 60 / 60);
                msec -= d * 1000 * 60 * 60;
                break;
                

            default:
                // Minutes
                d = Math.floor(msec / 1000 / 60);
                msec -= d * 1000 * 60;
                break;
        }

        return d;
    }

    static hasChart(){
        let chart = this.lsGet('chart');
        if(chart !== null){
            let now = new Date();
            if(this.timeDiff(chart.date, now.getTime()) > 15){
                return true;
            }
            return false;
        }
        return true;
    }

    static getChart(){
        return this.lsGet('chart');
    }

    static chartData(rawData){
        let cData = [];
        for (let i = 0; i < rawData.length; i++) {
            const element = rawData[i];
            const date = new Date(element.date);
            cData.push([date.getTime(), element.volume]);
        }
        return cData;
    }
    
}