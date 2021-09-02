import type { IRanking2v2, IRanking2v2Format } from '../types'
import { cleanString } from '../util'

export const format2v2Ranking = ({
    rank,
    rating,
    tier,
    games,
    wins,
    region,
    peak_rating: peak,
    teamname,
    brawlhalla_id_one,
    brawlhalla_id_two,
    twitch_name_one,
    twitch_name_two,
}: IRanking2v2): IRanking2v2Format => {
    const playerNames = teamname.split('+')
    return {
        rank,
        rating,
        tier,
        games,
        wins,
        region,
        peak,
        players: [
            {
                name: cleanString(playerNames[0]),
                id: brawlhalla_id_one,
                twitchName: twitch_name_one,
            },
            {
                name: cleanString(playerNames[1]),
                id: brawlhalla_id_two,
                twitchName: twitch_name_two,
            },
        ],
    }
}

export const format2v2Rankings = (rankings: IRanking2v2[]): IRanking2v2Format[] => rankings.map(format2v2Ranking)
