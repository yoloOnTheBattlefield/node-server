export default {
  Mutation: {
    createAuthor: async (parent, { firstName }, { models }) => {
      try {
        const author = new models.Author();
        author.firstName = firstName;
        const query = await author.save(err => {
          if (err) {
            return false;
          }
        });
        return true;
      } catch (err) {
        return false;
      }
    }
  }
};
