import m from "mithril";
import "../game-settings.css";

export const nukePartyHowTo = () => {
  return m(".nuke-party-how-to-container", [
    m("h4", "Welcome to Nuke Party!"),
    m(
      "label.block",
      "Players will take turns selecting countries that match the given prompt. But don't take too long to decide, because the nuke is always counting down. Get caught holding the nuke and you'll lose a heart. Players who lose all of their hearts will be knocked out until only one player remains."
    ),
    m("br"),
    m(
      "label.block",
      "The time remaining on the nuke carries over between turns but players get a safe window at the beginning of each turn. This safe window is active when the nuke is green. Further deteriorations of the nuke are shown by a color change from Green, to Yellow, to Orange, to Red."
    ),
    m("img.nuke-image", {
      src: "https://storage.googleapis.com/geopro-324602.appspot.com/images/nuke-image.png",
    }),
  ]);
};
