const GetMediaInfoById = function (props) {
    const query = `query($id: Int) {
  Media(id: $id){
    id,
    title {
      romaji
      english
      native
      userPreferred
    },
    characters {
      edges {
        id,
        voiceActors {
          id
        }
        node {
          id,
          name {
            first
            middle
            last
            full
            native
            userPreferred,
          },
        }
      }
    },
    season,
    seasonYear,
    episodes,
    duration,
    episodes,
    source,
    staff {
      edges {
        id
      }
    },
    studios {
      edges {
        id,
        node {
          name
        }
      }
    },
    relations {
      edges {
        id,
        relationType,
        node {
          id,
          title {
            romaji
            english
            native
            userPreferred
          }
        }
      }
    }
  }
}`

    return {
        query,
        variables: {
            id: props
        }
    }
}

export default GetMediaInfoById;