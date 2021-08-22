import { gameModeType, gameTypeId } from "state/GameData/types"

export const capitalPro: gameModeType = {
    id: gameTypeId.CAPITAL_PRO,
    iconSrc: "https://storage.googleapis.com/geo-pro-icons/capital-pro-game-icon.jpeg",
    name: "Capital Pro",
    description: "How much do you know about the biggest cities in the world? A lot? What about some of the smallest? Gather some friends to guess the locations of over 10,000 cities and learn about their populations, cultures, and histories.",
    numOfPlayers: "2-10",
}

export const gameModeList: gameModeType[] = [
    capitalPro,
    capitalPro
]