import fetch from 'node-fetch';
import urljoin from 'url-join';
import fs from 'fs';

const endpoint: string = "https://spla2.yuu26.com";
const paramMatch: string = "schedule";
const paramCoop: string = "coop/schedule";
const userAgent: string = "splatoonStageScheduler(twitter @ytg_vip)";

const img_cache: string = "img_cache";
const coop_file: string = "coop_schedule.json";
const match_file: string = "match_schedule.json";


class spla2api {
    cache_coop = String();
    cache_match = String();

    constructor(tmpPath: string) {
        this.cache_coop = urljoin(tmpPath, coop_file);
        this.cache_match = urljoin(tmpPath, match_file);
        console.log(this.cache_coop);
        console.log(this.cache_match);
    }

    private async getSchedule(isCoop: boolean) {
        let url = urljoin(endpoint, isCoop ? paramCoop : paramMatch);
        let res = await fetch(url, { method: 'GET', headers: { 'User-Agent': userAgent } });
        let body = await res.json();
        fs.writeFileSync(isCoop ? this.cache_coop : this.cache_match, JSON.stringify(body, null, "\t"), "utf8");
    }

    private checkSavedSchedule(isCoop: boolean): boolean {
        if (!fs.existsSync(isCoop ? this.cache_coop : this.cache_match)) return false;
        let file = fs.readFileSync(isCoop ? this.cache_coop : this.cache_match, "utf8");
        let schedule = JSON.parse(file);
        let battleSchedule = Date.parse(isCoop ? schedule.result[0].end_utc : schedule.result.regular[0].end_utc);
        if (battleSchedule > Date.now()) return false;
        return true;
    }

    getMatchSchedule(): spl2_match {
        if (!this.checkSavedSchedule(false)) this.getSchedule(false);
        let file = fs.readFileSync(this.cache_match, "utf8");
        let schedule: spl2_match = JSON.parse(file);
        return schedule;
    }

    getCoopSchedule(): spl2_coop {
        if (!this.checkSavedSchedule(true)) this.getSchedule(true);
        let file = fs.readFileSync(this.cache_coop, "utf8");
        let schedule: spl2_coop = JSON.parse(file);
        return schedule;
    }

    getMatchSchedule_debug(): spl2_match {
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