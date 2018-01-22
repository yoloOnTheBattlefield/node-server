export default `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    """
    the list of Posts by this author
    """
    posts: [Post]
  }
  # the schema allows the following query:
  type Query {
    author(id: Int!): Author
  }
  type Mutation {
    createAuthor(firstName: String): Boolean
  }
`;
