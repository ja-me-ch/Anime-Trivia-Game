import GetMediaInfoById from "../graphql/getMediaInfoById";
import MakeRequest from "../graphql/makeRequest";

//Generate the question:
//In what season did this anime air in? eg. Fall 2012
//find all related anime (eg. prequel sequel)
//filter all of them from commonList
//proceed with finding random answers for question

//todo: return question template
async function AnimeSeasonAirDate(mediaId) {
        MakeRequest(GetMediaInfoById(mediaId))
            .then(async (res) => {
                console.log(res.data.Media);
                const relatedMedia = [{ id: mediaId, title: res.data.Media.title.romaji }];
                if (res.data.Media.relations.edges.length) {
                    res.data.Media.relations.edges.forEach(async (r) => {
                        if (r.relationType === 'PREQUEL') FindPrequel(await GetMediaInfo(r.node.id), relatedMedia);
                        if (r.relationType === 'SEQUEL') FindSequel(await GetMediaInfo(r.node.id), relatedMedia);
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

const FindPrequel = async function (mediaData, relatedMedia) {
    relatedMedia.push({id: mediaData.id, title: mediaData.title.romaji})
    mediaData.relations.edges.forEach(async (r) => {
        if (r.relationType === 'PREQUEL') {
            console.log(relatedMedia);
            FindPrequel(await GetMediaInfo(r.node.id), relatedMedia);
        }
    })
}

const FindSequel = async function (mediaData, relatedMedia) {
    relatedMedia.push({ id: mediaData.id, title: mediaData.title.romaji })
    mediaData.relations.edges.forEach(async (r) => {
        if (r.relationType === 'SEQUEL') {
            console.log(relatedMedia);
            FindSequel(await GetMediaInfo(r.node.id), relatedMedia);
        }
    })
}



export default AnimeSeasonAirDate;