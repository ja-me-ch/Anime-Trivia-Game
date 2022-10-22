import GetMediaInfoById from "../../graphql/getMediaInfoById";
import MakeRequest from "../../graphql/makeRequest";



/*
    This function finds the related anime of the mediaId that is passed in.
    This function returns an array of the anime and title, 
    and all the sequels and prequels of the anime
    {id, title}
*/
async function GetRelatedAnime(mediaId) {
    MakeRequest(GetMediaInfoById(mediaId))
        .then(async (res) => {
            if (res.data.Media.relations.edges.length) {
                const relatedMedia = [];
                res.data.Media.relations.edges.forEach(async (r) => {
                    if (r.relationType === 'PREQUEL') FindRelated(await GetMediaInfo(mediaId), relatedMedia, 'PREQUEL');
                    if (r.relationType === 'SEQUEL') FindRelated(await GetMediaInfo(mediaId), relatedMedia, 'SEQUEL');
                })
            }
            console.log(relatedMedia);
        })
}

const GetMediaInfo = async function (mediaId) {
    return MakeRequest(GetMediaInfoById(mediaId))
        .then((res) => {
            return res.data.Media;
        })
}

const FindRelated = async function (mediaData, relatedMedia, relationType) {
    if (!relatedMedia.some((r) => r.id === mediaData.id)) {
        relatedMedia.push({ id: mediaData.id, title: mediaData.title.romaji })
    }
    mediaData.relations.edges.forEach(async (r) => {
        if (r.relationType === relationType) {
            FindRelated(await GetMediaInfo(r.node.id), relatedMedia, relationType);
        }
    })
}





export default GetRelatedAnime;