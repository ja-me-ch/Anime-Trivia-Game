const MakeRequest = function (props) {
    const { query, variables } = props;
    //     var query = `
    // query ($userId: Int){
    //   MediaListCollection(userId: $userId, type:ANIME, chunk: 1, perChunk: 500, forceSingleCompletedList: true) {
    //     lists {
    //       status
    //       name
    //       entries {
    //         mediaId
    //       }
    //     }
    //   }
    // }
    // `;

    //     // Define our query variables and values that will be used in the query request
    //     var variables = {
    //         userId: 1046
    //     };

    // Define the config we'll need for our Api request
    let url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

    // return { url, options };

    // Make the HTTP Api request
    return fetch(url, options)
        .then((response) => {
            return response.json()
                .then(function (json) {
                    return response.ok ? json : { data: { User: null } };
                });
        })
        .then((data) => {
            return data
        })
        .catch((err) => {
            return err;
        });

    function handleResponse(response) {
        return response.json()
            .then(function (json) {
                return response.ok ? json : Promise.reject(json);
            });
    }

    function handleData(data) {
        return data;
    }

    function handleError(error) {
        return (error);
    }
}

export default MakeRequest;