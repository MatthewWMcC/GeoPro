import { model } from "../game-settings-model";
import m from "mithril";
import { GameSettingsAttrs, GameSettingsState } from "../types";
import "../game-settings.css";

export const capitalProSettings = (
  vnode: m.VnodeDOM<GameSettingsAttrs, GameSettingsState>
) => {
  const { resultsToChooseFrom, maxCountdown, guessLimit } = vnode.state;

  return m(".capital-pro-settings-container", [
    m(".option-row", [
      m(".set-time-per-round.option-container", [
        m(".label-container", [
          m("label.settings-option-label", "Time per round: "),
          m(".display-box", [
            m("label.num-of-cities-number-label", maxCountdown + "s"),
          ]),
        ]),
        m(".set-time-container.slider-setting", [
          m("label.settings-option-label", "5"),
          m("input#set-time-slider.slider", {
            type: "range",
            min: 5,
            max: 60,
            step: 5,
            value: maxCountdown,
            oninput: (e) => model.handleTimeSliderOnInput(vnode, e),
          }),
          m("label.settings-option-label", "60"),
        ]),
      ]),
      m(".set-time-per-round.option-container", [
        m(".label-container", [
          m("label.settings-option-label", "Guesses per round: "),
          m(".display-box", [
            m("label.num-of-cities-number-label", guessLimit),
          ]),
        ]),
        m(".set-guess-container.slider-setting", [
          m("label.settings-option-label", "1"),
          m("input#set-guess-slider.slider", {
            type: "range",
            min: 1,
            max: 8,
            value: guessLimit,
            oninput: (e) => model.handleGuessSliderOnInput(vnode, e),
          }),
          m("label.settings-option-label", "8"),
        ]),
      ]),
    ]),
    m(".set-num-of-locations.option-container", [
      m(".label-container", [
        m("label.settings-option-label", "Show "),
        m(".display-box", [
          m(
            "label.num-of-cities-number-label",
            resultsToChooseFrom && resultsToChooseFrom < 20
              ? resultsToChooseFrom
              : "All"
          ),
        ]),
        m(
          "label.settings-option-label",
          ` most populous cit${
            resultsToChooseFrom === 1 ? "y" : "ies"
          } from each country `
        ),
      ]),
      m(".set-num-of-locations-slider-container.slider-setting", [
        m("label.settings-option-label", "1"),
        m("input#set-num-of-locations-slider.slider", {
          type: "range",
          min: 1,
          max: 20,
          value: resultsToChooseFrom,
          oninput: (e) => model.handleResultsSliderOnInput(vnode, e),
        }),
        m("label.settings-option-label", "All"),
      ]),
    ]),
  ]);
};
