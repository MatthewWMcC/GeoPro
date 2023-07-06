import { IWikiModalData } from "global/types";
import m from "mithril";

export const getPageDataWithWikiId = async (
  wikiId: string
): Promise<IWikiModalData> => {
  const title = await m
    .request({
      method: "GET",
      url: `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&origin=*&ids=${wikiId}`,
    })
    .then((result: any) => result.entities[wikiId].sitelinks.enwiki.title);

  return await m
    .request({
      method: "GET",
      url: `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`,
    })
    .then((response: any) => {
      return {
        link: response.content_urls.desktop.page,
        title,
        summary: response.extract,
        photourl: response.thumbnail.source,
      };
    });
};
