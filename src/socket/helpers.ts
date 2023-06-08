import { player, playerType } from "state/GameData/types";

export const simplifyPlayerData = (player: playerType): player => {
  return {
    userId: player.userId,
    socketId: player.socketId,
    username: player.username,
    userIconSrc: player.userIconSrc,
  };
};
