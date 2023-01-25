const GetCharactersByMediaId = function (props) {
    const query = `query($id: Int) {
  Media(id: $id) {
    id,
    title {
      romaji
      english
      native
      userPreferred
    },
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
      nodes {
        id
        name {
          first
          middle
          last
          full
          native
          userPreferred
        },
        image {
          large
          medium
        },
        siteUrl,
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

export default GetCharactersByMediaId;