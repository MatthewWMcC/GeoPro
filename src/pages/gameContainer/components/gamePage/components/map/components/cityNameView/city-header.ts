import m from 'mithril';
import "./city-header.css"
import { CityHeaderAttrs, CityHeaderState } from './types';
import { model } from './city-header-model';

export const cityHeader: m.Component<CityHeaderAttrs, CityHeaderState> = {
    oninit: model.handleComponentInit,
    onremove: model.handleComponentRemove,
    oncreate: model.handleComponentCreate,
    view: (vnode: m.VnodeDOM<CityHeaderAttrs, CityHeaderState>): m.Children => {
        const { locationHeaderData, countdown, roundNumber } = vnode.state;
        const locationList = Object.keys(locationHeaderData).map((key: string) => {
            return locationHeaderData[key]
        })

        return  m(".city-header-container", [
            locationList && locationList.map(location => {
                return m(".location-data-holder", [
                    m("label.location-data-label", location)
                ])
            }),
            m(".round-holder", [
                m("label.round-label", roundNumber)
            ]),
            m(".countdown-holder", [
                m("label.countdown-label", countdown)
            ])
        ])
    }     
}