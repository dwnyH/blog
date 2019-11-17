const { createFilePath } = require(`gatsby-source-filesystem`);
const createNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const path = createFilePath({ node, getNode });
    let value = path;

    if (node.frontmatter.category && node.frontmatter.template === 'posts') {
      value = `posts${path}`

      createNodeField({ 
        node, 
        name: 'categorySlug', 
        value: `/category/${node.frontmatter.category}/`,
      });
    } 

    createNodeField({
      node,
      name: 'slug',
      value,
    }); 
  }
};

module.exports = createNode;
