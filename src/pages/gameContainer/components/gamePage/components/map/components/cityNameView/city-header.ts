import m from 'mithril';
import "./city-header.css"
import { CityHeaderAttrs, CityHeaderState } from './types';
import { model } from './city-header-model';
import { locationHeaderDataKey } from 'state/GameData/types';

export const cityHeader: m.Component<CityHeaderAttrs, CityHeaderState> = {
    oninit: model.handleComponentInit,
    onremove: model.handleComponentRemove,
    oncreate: model.handleComponentCreate,
    view: (vnode: m.VnodeDOM<CityHeaderAttrs, CityHeaderState>): m.Children => {
        const { locationHeaderData, countdown } = vnode.state;
        const locationList = Object.keys(locationHeaderData).map((key: string) => {
            return locationHeaderData[key]
        })

        return  m(".city-header-container", [
            locationList && locationList.map(location => {
                return m(".location-data-holder", [
                    m("label.location-data-label", location)
                ])
            }),
            m(".countdown-holder", [
                m("label.countdown-label", countdown)
            ])
        ])
    }     
}