import GetVoiceActorByStaffId from "./getVoiceActorByStaffId";
import MakeRequest from "./makeRequest";

/*
Shelved for the time being
reason: 
-requires too many API calls to get characters
-no reliable way to get all pages, or page length

*/


const GetAllCharactersVoicedByStaffId = function (staffId) {
    return null;
    const characters = [];

    const currentPageCharacters = [];
    let pageCount = 1;
    do {
        MakeRequest(GetVoiceActorByStaffId(95090, pageCount))
            .then((res) => {
                currentPageCharacters = res.data.Staff.characters.edges;
                console.log(currentPageCharacters);
                res.data.Staff.characters.edges.forEach((e) => {
                    characters.push({ id: e.node.id, name: e.node.name });
                })
                pageCount++;
                console.log(pageCount);
                setTimeout(1000);
            })
    } while (currentPageCharacters.length !== 25);
    console.log(characters);
}

export default GetAllCharactersVoicedByStaffId;