export default `
  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }
  # the schema allows the following query:
  type Query {
    posts: [Post]

  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost (
      postId: Int!
    ): Post
  }
`;
