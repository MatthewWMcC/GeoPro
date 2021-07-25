import { ChangeShowRoundEndModalAction, CurrentPageActions, CurrentPageActionsTypes, CurrentPageState } from "./types";

const initCurrentPageData: CurrentPageState = {
    showRoundEndModal: false
}

export const CurrentPageDataReducer = (state: CurrentPageState = initCurrentPageData, action: CurrentPageActionsTypes): CurrentPageState => {
    switch(action.type) {
        case (CurrentPageActions.CHANGE_SHOW_ROUND_END_MODAL_ACTION):
            return ChangeShowRoundEndModalReducer(state, action)
        default:
            return state
    }
}

const ChangeShowRoundEndModalReducer = (state: CurrentPageState, action: ChangeShowRoundEndModalAction) => {
    return({
        ...state,
        showRoundEndModal: action.payload.showRoundEndModal
    })
}