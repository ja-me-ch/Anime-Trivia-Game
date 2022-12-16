import GetMediaInfoById from '../../graphql/getMediaInfoById';
import MakeRequest from '../../graphql/makeRequest';
import ShuffleArray from '../Functions/shuffleArray';

/*Generates the question:
    [voice actor] voices these characters, [5 random characters],
    who do they voice in [anime]?

    If anime doesn't have > 4 characters, return null
*/

const VoiceActorAnimeCharacter = async function (mediaId) {
    const mediaInfo = await MakeRequest(GetMediaInfoById(mediaId))
    .then((res) => {
        console.log(res.data.Media);
        return res.data.Media;
    });

    //Check if anime has 4 or more characters
    if (mediaInfo.characters.edges < 4) return null;

    

}

export default VoiceActorAnimeCharacter;

