import fetch from 'node-fetch';
import urljoin from 'url-join';
import fs from 'fs';
import path from 'path';
import { ipcRenderer } from 'electron';

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

    constructor() {
        let tmpPath = ipcRenderer.sendSync('request', 'tmpPath');
        this.cache_coop = path.join(tmpPath, coop_file);
        this.cache_match = path.join(tmpPath, match_file);
        this.cache_image = path.join(tmpPath, img_cache)
        if (!fs.existsSync(this.cache_image)) {
            fs.mkdirSync(this.cache_image);
        }
    }

    isExistCache(isCoop: boolean): boolean {
        console.log('キャッシュ確認', isCoop ? ' Coop' : ' Match')
        if (!fs.existsSync(isCoop ? this.cache_coop : this.cache_match)) {
            console.log('ないです');
            return false;
        }
        console.log('あるんご');
        return true;
    }

    isLatestMatchSchedule(): boolean {
        console.log('最新か確認')
        let ret: boolean;
        let file = fs.readFileSync(this.cache_match, "utf8");
        let schedule: spl2_match = JSON.parse(file);
        let battleSchedule = Date.parse(schedule.result.regular[0].end_utc);

        if (battleSchedule < Date.now()) {
            console.log("マッチのスケジュール古いため取得します");
            ret = false;
        } else {
            console.log("マッチのスケジュールは最新です");
            ret = true;
        }
        return ret;
    }

    isLatestCoopSchedule(): boolean {
        console.log('最新か確認')
        let ret: boolean;
        let file = fs.readFileSync(this.cache_coop, "utf8");
        let schedule: base_coop = JSON.parse(file);
        let battleSchedule = Date.parse(schedule.end_utc);

        if (battleSchedule < Date.now()) {
            console.log("サーモンランのスケジュール古いため取得します");
            ret = false;
        } else {
            console.log("サーモンランのスケジュールは最新です");
            ret = true;
        }
        return ret;
    }

    private async getMatch(): Promise<void> {
        let url = urljoin(endpoint, paramMatch);
        let res = await fetch(url, { method: 'GET', headers: { 'User-Agent': userAgent } });
        let body = await res.json();
        fs.writeFileSync(this.cache_match, JSON.stringify(body, null, "\t"), "utf8");
    }

    private async getCoop(): Promise<void> {
        let url = urljoin(endpoint, paramCoop);
        let res = await fetch(url, { method: 'GET', headers: { 'User-Agent': userAgent } });
        let body = await res.json();
        fs.writeFileSync(this.cache_coop, JSON.stringify(body, null, "\t"), "utf8");
    }

    async getMatchSchedule(): Promise<spl2_match> {
        if (!this.isExistCache(false)) {
            await this.getMatch();
            console.log('マッチデータ取得');
        }

        if (!this.isLatestMatchSchedule()) {
            await this.getMatch();
            console.log('マッチデータ取得');
        }

        let file = fs.readFileSync(this.cache_match, "utf8");
        let schedule: spl2_match = JSON.parse(file);
        return schedule;
    }

    async getCoopSchedule(): Promise<spl2_coop> {
        if (!this.isExistCache(true)) {
            await this.getCoop();
            console.log('サーモンランデータ取得');
        }

        if (!this.isLatestCoopSchedule()) {
            await this.getCoop();
            console.log('サーモンランデータ取得');
        }

        let file = fs.readFileSync(this.cache_coop, "utf8");
        let schedule: spl2_coop = JSON.parse(file);

        // 先に画像キャッシュ確認
        this.checkAllWeaponImg(schedule);

        return schedule;
    }

    private checkAllWeaponImg(coop: spl2_coop) {
        coop.result.map(base => {
            if (base.weapons !== null) {
                base.weapons.map(async weapon => {
                    let imgPath = path.join(this.cache_image, weapon.name + ".png");
                    if (!fs.existsSync(imgPath)) {
                        console.log(weapon.name, 'isnot cached');
                        let res = await fetch(weapon.image);
                        let buff = await res.arrayBuffer();
                        fs.writeFileSync(imgPath, new Uint8Array(buff), 'binary');
                    } else {
                        console.log(weapon.name, 'is cached');
                    }
                })
            }
        })
    }

    getWeaponImage(weapon: coop_weapon): string {
        return path.join(this.cache_image, weapon.name + '.png');
    }
}

export default spla2api;