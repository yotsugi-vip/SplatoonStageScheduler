import fetch from 'node-fetch';
import urljoin from 'url-join';
import fs from 'fs';
import path from 'path';

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
    cache_image = String();

    constructor(tmpPath: string) {
        this.cache_coop = path.join(tmpPath, coop_file);
        this.cache_match = path.join(tmpPath, match_file);
        this.cache_image = path.join(tmpPath, img_cache)
        if (!fs.existsSync(this.cache_image)) {
            fs.mkdirSync(this.cache_image);
        }
    }

    private async getSchedule(isCoop: boolean) {
        console.log("スケジュール取得");
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
        
        if (battleSchedule < Date.now()) {
            console.log(isCoop ? "サーモンランのスケジュール古いため取得します" : "マッチのスケジュール古いため取得します");
            return false;
        }
        console.log(isCoop ? "サーモンランのスケジュールは最新です" : "マッチのスケジュールは最新です");
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

    /*
    getMatchSchedule_debug(): spl2_match {
        let path: string = "./tmp_json/matchSchedule.json";
        let file = fs.readFileSync(path, "utf8");
        let schedule: spl2_match = JSON.parse(file);
        return schedule;
    }

    getCoopSchedule_debug(): spl2_coop {
        let path: string = "./tmp_json/coopSchedule.json";
        let file = fs.readFileSync(path, "utf8");
        let schedule: spl2_coop = JSON.parse(file);
        return schedule;
    }
    */

    getWeaponImage(weapon: coop_weapon): string {
        const weaponPath = urljoin(this.cache_image, weapon.name + ".png");

        if (!fs.existsSync(weaponPath)) {
            console.log(weapon.name + "is not cashed");
            fetch(weapon.image).then(res => (
                res.arrayBuffer().then(buff => (
                    fs.writeFileSync(weaponPath, new Uint8Array(buff), 'binary')
                ))
            ));
        } else {
            console.log(weapon.name + "is cashed")
        }
        return weaponPath;
    }
}

export default spla2api;