const GetCharacterVoiceActorByMediaId = function (props) {
  const query = `query($id: Int) {
  Media(id: $id) {
    id
    siteUrl
    coverImage {
      extraLarge
      large
      medium
      color
    }
    bannerImage
    title {
      romaji
      english
      native
    }
    characters {
      edges {
        voiceActors {
          id
          languageV2
          image {
            large
            medium
          }
          name {
            first
            middle
            last
            full
            native
          }
          siteUrl
        }
        node {
          id
          siteUrl
          image {
            large
            medium
          }
          name {
            first
            last
            full
            native
          }
        }
      }
    }
  }
}
`
    const query2 = `query($id: Int) {
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
	nodes{
    id,
    name {
      first
      middle
      last
      full
      native
    },
    image {
      large
      medium
    },
    siteUrl 
  }
      edges {
        voiceActors {
          id,
          languageV2,
          name {
            first
            middle
            last
            full
            native
          }
        }
        node {
          id,
          siteUrl,
          name {
            first
            last
            full
            native,
          },
        }
      }
    },
  }
}`

    return {
        query,
        variables: {
            id: props
        }
    }
}

export default GetCharacterVoiceActorByMediaId;