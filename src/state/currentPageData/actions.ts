import { CurrentPageActions } from "./types";

export const changeShowRoundEndModal = (showRoundEndModal: boolean) => {
    return {
        type: CurrentPageActions.CHANGE_SHOW_ROUND_END_MODAL_ACTION,
        payload: {
            showRoundEndModal
        }
    }
}