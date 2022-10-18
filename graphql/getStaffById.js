const GetStaffById = function (props) {
    const query = `query($id: Int) {
  Staff(id: $id) {
    name {
      first
      middle
      last
      full
      native
      userPreferred
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

export default GetStaffById;