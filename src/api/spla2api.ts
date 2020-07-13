import fetch from 'node-fetch';
import urljoin from 'url-join';
import fs from 'fs';

const endpoint: string = "https://spla2.yuu26.com";
const paramMatch: string = "schedule";
const paramCoop: string = "coop/schedule";
const userAgent: string = "splatoonStageScheduler(twitter @ytg_vip)";

class spla2api {
    filepath = String();

    constructor(tmpPath: string) {
        this.filepath = tmpPath;
    }

    private async getSchedule(isCoop: boolean) {
        let url = urljoin(endpoint, isCoop ? paramCoop : paramMatch);
        let res = await fetch(url, { method: 'GET', headers: { 'User-Agent': userAgent } });
        let body = await res.json();
        fs.writeFileSync(this.filepath, JSON.stringify(body, null, "\t"), "utf8");
    }

    private checkSavedSchedule(isCoop: boolean): boolean {
        if (!fs.existsSync(this.filepath)) return false;
        let file = fs.readFileSync(this.filepath, "utf8");
        let schedule = JSON.parse(file);
        let battleSchedule = Date.parse(isCoop ? schedule.result[0].end_utc : schedule.result.regular[0].end_utc);
        if (battleSchedule > Date.now()) return false;
        return true;
    }

    getMatchSchedule(): spl2_match {
        if (!this.checkSavedSchedule(false)) this.getSchedule(false);
        let file = fs.readFileSync(this.filepath, "utf8");
        let schedule: spl2_match = JSON.parse(file);
        return schedule;
    }

    getCoopSchedule(): spl2_coop {
        if (!this.checkSavedSchedule(true)) this.getSchedule(true);
        let file = fs.readFileSync(this.filepath, "utf8");
        let schedule: spl2_coop = JSON.parse(file);
        return schedule;
    }

    static getMatchSchedule_debug(): spl2_match {
        let path: string = "./tmp_json/matchSchedule.json";
        let file = fs.readFileSync(path, "utf8");
        let schedule: spl2_match = JSON.parse(file);
        return schedule;
    }

    getCoopSchedule_debug(): spl2_match {
        let path: string = "./tmp_json/coopSchedule.json";
        let file = fs.readFileSync(path, "utf8");
        let schedule: spl2_match = JSON.parse(file);
        return schedule;
    }
}

export default spla2api;