import m from "mithril";
import { nukePartyViewStates } from "state/GameData/modes/NukePartyData/types";
import { GameViewStates } from "state/GameData/types";
import { countryDisplay } from "../../components/countryDisplay.ts/country-display";
import { map } from "../../components/map/map";
import { playerList } from "../../components/player-list/player-list";
import { model } from "./nuke-party-model";
import "./nuke-party.css";

import { NukePartyAttrs, NukePartyState } from "./types";

export const nukePartyView: m.Component<NukePartyAttrs, NukePartyState> = {
  oninit: model.handleComponentInit,
  onremove: model.handleComponentRemove,
  view: (vnode: m.VnodeDOM<NukePartyAttrs, NukePartyState>) => {
    const { store$ } = vnode.attrs;
    const {
      selected,
      myTurn,
      question,
      canGuess,
      guessStatus,
      viewState,
      winner,
    } = vnode.state;
    const name = selected?.name;
    const countryCode = selected?.countryCode;

    return m("#nuke-party-container", [
      viewState === GameViewStates.IN_GAME &&
        m(".in-game-container", [
          m(map, { store$ }),
          m("#nuke-party-overlay", [
            question &&
              m("#question-display-placement", [
                m("#question-container", [
                  m("label.question-text", question.question),
                  question.imageSrc &&
                    m("img#question-image", {
                      src: question.imageSrc,
                    }),
                ]),
              ]),
            m("#country-display-placement", [
              m(countryDisplay, { name, countryCode, guessStatus }),
            ]),
            m("#submit-button-placement", [
              selected &&
                myTurn &&
                canGuess &&
                m(
                  "button#submit-nuke-party-guess.styled-button",
                  {
                    onclick: () => model.handleSubmitButtonPress(vnode),
                  },
                  "Submit Guess"
                ),
            ]),
            m("#player-list-placement", [m(playerList, { store$ })]),
          ]),
        ]),
      viewState === nukePartyViewStates.GAME_OVER &&
        m(".nuke-party-game-over", [
          m(".game-end-container", [
            m(".inner-game-end-container", [
              m("#game-end-message-container", [
                m(
                  "h1.game-end-message",
                  `Game over. ${winner ? winner : "no one"} has won.`
                ),
              ]),
              m(".buttons-container", [
                m(
                  "button.secondary-styled-button.end-game-button",
                  {
                    onclick: () => model.handleOnReturnClick(),
                  },
                  "Return to Menu"
                ),
                m(
                  "button.styled-button.end-game-button",
                  {
                    onclick: () => model.handleOnRestartClick(),
                  },
                  "Play Again"
                ),
              ]),
            ]),
          ]),
        ]),
    ]);
  },
};
