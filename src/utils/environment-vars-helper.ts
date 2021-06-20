export const getMapboxAPIToken = ():string => {
    return process.env.PUBLIC_MAPBOX_ACCESS_TOKEN as string;
}