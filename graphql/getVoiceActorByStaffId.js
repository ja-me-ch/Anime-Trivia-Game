const GetVoiceActorByStaffId = function (props, page) {
    const query = `query($id: Int, $page: Int) {
  Staff (id: $id) {
    name {
      first
      middle
      last
      full
      native
    },
    languageV2,
    characters (page: $page) {
      edges {
        node{
          id,
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
}`

    return {
        query,
        variables: {
            id: props,
            page: page
        }
    }
}

export default GetVoiceActorByStaffId;