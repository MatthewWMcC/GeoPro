import { Observable } from "rxjs";
import { pluck, take, tap } from "rxjs/operators";
import { rootState } from "state/types";
import { socket } from "./socket-main";

export const initSocketDataSetup = (store$: Observable<rootState>) => {
    store$.pipe(
        pluck("UserData", "username"),
        take(1),
        tap(username => socket.emit("set-username", username))
    ).subscribe()

    store$.pipe(
        pluck("UserData", "userId"),
        take(1),
        tap(userId => socket.emit("set-user-id", userId))
    ).subscribe()
}