import hokke from "../picture/ホッケふ頭.png";
import ajihurai from "../picture/アジフライスタジアム.png";
import arowana from "../picture/アロワナモール.png";
import anchobi from "../picture/アンチョビットゲームズ.png";
import engawa from "../picture/エンガワ河川敷.png";
import gangaze from "../picture/ガンガゼ野外音楽堂.png";
import komb from "../picture/コンブトラック.png";
import zato from "../picture/ザトウマーケット.png";
import shotturu from "../picture/ショッツル鉱山.png";
import sumeshi from "../picture/スメーシーワールド.png";
import tatiuo from "../picture/タチウオパーキング.png";
import chouzame from "../picture/チョウザメ造船.png";
import debon from "../picture/デボン海洋博物館.png";
import hakohugu from "../picture/ハコフグ倉庫.png";
import battera from "../picture/バッテラストリート.png";
import hujitubo from "../picture/フジツボスポーツクラブ.png";
import otoro from "../picture/ホテルニューオートロ.png";
import manta from "../picture/マンタマリア号.png";
import mutugo from "../picture/ムツゴ楼.png";
import mozuku from "../picture/モズク農園.png";
import mongara from "../picture/モンガラキャンプ場.png";
import amabi from "../picture/海女美術大学.png";
import bbuss from "../picture/Ｂバスパーク.png";

export function stage(stage_name: string): string {
    let str = String();

    switch (stage_name) {
        case "Ｂバスパーク":
            str = bbuss;
            break;

        case "ホッケふ頭":
            str = hokke;
            break;

        case "アジフライスタジアム":
            str = ajihurai;
            break;

        case "アロワナモール":
            str = arowana;
            break;

        case "アンチョビットゲームズ":
            str = anchobi;
            break;

        case "エンガワ河川敷":
            str = engawa;
            break;

        case "ガンガゼ野外音楽堂":
            str = gangaze;
            break;

        case "コンブトラック":
            str = komb;
            break;

        case "ザトウマーケット":
            str = zato;
            break;

        case "ショッツル鉱山":
            str = shotturu;
            break;

        case "スメーシーワールド":
            str = sumeshi;
            break;

        case "タチウオパーキング":
            str = tatiuo;
            break;

        case "チョウザメ造船":
            str = chouzame;
            break;

        case "デボン海洋博物館":
            str = debon;
            break;

        case "ハコフグ倉庫":
            str = hakohugu;
            break;

        case "バッテラストリート":
            str = battera;
            break;

        case "フジツボスポーツクラブ":
            str = hujitubo;
            break;

        case "ホテルニューオートロ":
            str = otoro;
            break;

        case "マンタマリア号":
            str = manta;
            break;

        case "ムツゴ楼":
            str = mutugo;
            break;

        case "モズク農園":
            str = mozuku;
            break;

        case "モンガラキャンプ場":
            str = mongara;
            break;

        case "海女美術大学":
            str = amabi;
            break;

        default:
            str = "none";
            break;
    }
    return str;
}
