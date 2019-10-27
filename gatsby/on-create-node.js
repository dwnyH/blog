const { createFilePath } = require(`gatsby-source-filesystem`);
const createNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      node,
      name: 'slug',
      value: `/posts${value}`,
    }); 

    if (node.frontmatter.category) {
      createNodeField({ 
        node, 
        name: 'categorySlug', 
        value: `/category/${node.frontmatter.category}/`,
      });
    }
  }
};

module.exports = createNode;
