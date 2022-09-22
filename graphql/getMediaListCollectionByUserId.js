const GetMediaListCollectionByUserId = function (props) {
    const query = `query($userId: Int) {
  MediaListCollection(userId: $userId, type:ANIME, chunk: 1, perChunk: 500, forceSingleCompletedList: true) {
    lists {
      status
      name
      entries {
        mediaId
      }
    }
  }
}`

    return {
        query,
        variables: {
            userId: props
        }
    }
}

export default GetMediaListCollectionByUserId;