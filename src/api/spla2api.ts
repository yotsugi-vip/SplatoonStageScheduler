import fetch from 'node-fetch';
import urljoin from 'url-join';
import fs from 'fs';

const endpoint: string = "https://spla2.yuu26.com";
const paramMatch: string = "schedule";
const paramCoop: string = "coop/schedule";
const userAgent: string = "splatoonStageScheduler(twitter @ytg_vip)";

class spla2api {

    constructor() { }

    private async getSchedule(filepath: string, isCoop: boolean) {
        let url = urljoin(endpoint, isCoop ? paramCoop : paramMatch);
        let res = await fetch(url, { method: 'GET', headers: { 'User-Agent': userAgent } });
        let body = await res.json();
        fs.writeFileSync(filepath, JSON.stringify(body, null, "\t"), "utf8");
    }

    // APIに過剰アクセスしないようスケジュールに更新がないかチェックする
    private checkSavedSchedule(filepath: string, isCoop: boolean): boolean {
        if (!fs.existsSync(filepath)) return false;
        let file = fs.readFileSync(filepath, "utf8");
        let schedule = JSON.parse(file);
        let battleSchedule = Date.parse(isCoop ? schedule.result[0].end_utc : schedule.result.regular[0].end_utc);
        if (battleSchedule > Date.now()) return false;
        return true;
    }

    Schedule(isCoop: boolean, filepath: string) {
        if (!this.checkSavedSchedule(filepath, isCoop)) this.getSchedule(filepath, isCoop);
        var file = fs.readFileSync(filepath, "utf8");
        var schedule = JSON.parse(file);
        // match と coop で分けたほうがいいかも
    }
}

export default spla2api;