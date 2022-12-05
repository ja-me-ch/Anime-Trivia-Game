const GetMediaInfoById = function (props) {
    const query = `query($id: Int) {
  Media(id: $id){
    id,
    siteUrl,
    coverImage {
      extraLarge
      large
      medium
      color
    },
    bannerImage,
    title {
      romaji
      english
      native
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