export interface CurrentPageState {
    showRoundEndModal: boolean;
}

export interface ChangeShowRoundEndModalAction {
    type: CurrentPageActions.CHANGE_SHOW_ROUND_END_MODAL_ACTION,
    payload: {
        showRoundEndModal: boolean
    }
}

export enum CurrentPageActions {
    CHANGE_SHOW_ROUND_END_MODAL_ACTION = "currentPageStateActions/CHANGE_SHOW_ROUND_END_MODAL_ACTION"
}

export type CurrentPageActionsTypes = ChangeShowRoundEndModalAction;