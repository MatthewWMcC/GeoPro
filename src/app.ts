import m from "mithril";
import { header } from "components/header/header";
import { gamePage } from "pages/gamePage/game-page";
import { enterInfo } from "pages/enterInfo/enter-info";

const bodyContentContainer = document.getElementById("body-content-container")
const headerContentContainer = document.getElementById("header-content-container");

if(headerContentContainer === null){
    throw new Error("The header-content-container was not found")
}

if(bodyContentContainer === null){
    throw new Error("The content-container was not found")
}

m.mount(headerContentContainer, {
    view: () => m(header, 
        {

        }) 

});

m.route.prefix = "#";

m.route(bodyContentContainer, "/", {
    "/": enterInfo,
    "/game-page": gamePage,
})