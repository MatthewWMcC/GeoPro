export const getMapboxAPIToken = (): string => {
  return process.env.parsed.PUBLIC_MAPBOX_ACCESS_TOKEN as string;
};
