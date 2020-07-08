interface rule_ex {
    key: string;
    name: string;
    statink: string;
}

interface maps_ex {
    id: number;
    image: string;
    name: string;
    statink: string;
}

interface splaTime {
    start: string;
    start_utc: string;
    start_t: number;
    end: string;
    end_utc: string;
    end_t: number;
}

interface base_match extends splaTime {
    rule: string;
    rule_ex: rule_ex;
    maps: Array<string>;
    maps_ex: Array<maps_ex>;
}

interface spl2_match {
    result: {
        regular: Array<base_match>;
        gachi: Array<base_match>;
        league: Array<base_match>;
    }
}

interface coop_stage {
    image: string;
    name: string;
}

interface coop_weapon {
    id: number;
    image: string;
    name: string;
}

interface base_coop extends splaTime {
    stage: coop_stage;
    weapons: Array<coop_weapon>
}

interface spl2_coop extends splaTime {
    result: Array<base_coop>;
}