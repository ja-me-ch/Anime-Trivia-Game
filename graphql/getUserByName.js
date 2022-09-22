const GetUserByName = function (props) {
    let query = `query($name: String) {
    User(name: $name) {
        id
        about
        name
    avatar {
            large
            medium
        }
        bannerImage
        siteUrl
    }
}`
    return {
        query,
        variables: {
            name: props
        }
    }
}

export default GetUserByName;

/* Data Structure:

data: {
    User: {
        about: String,
        avatar: {
            large: String,
            medium: String
        },
        bannerImage: String,
        id: Int,
        name: String,
        siteUrl: String
    }
}

*/

