import { Observable } from "rxjs";
import { distinctUntilChanged, pluck, tap, map } from "rxjs/operators";
import { rootState } from "state/types";
import { socket } from "./socket-main";

export const initSocketDataSetup = (store$: Observable<rootState>) => {
  store$
    .pipe(
      pluck("UserData"),
      distinctUntilChanged(),
      map(({ username, userIconSrc, userId }) => {
        console.log(username);
        return {
          username,
          userIconSrc,
          userId,
        };
      }),
      tap((data) => socket.emit("set-player-data", data))
    )
    .subscribe();
};
