// tag, category는 따로 tagslug, categoryslug 분류해서 붙여주고,
// file들은 post/이름 이런식으로
const { createFilePath } = require(`gatsby-source-filesystem`);
const createNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    console.log('카테고리', node);
    const value = createFilePath({ node, getNode });

    createNodeField({
      node,
      name: 'slug',
      value: `/posts${value}`,
    }); 

    if (node.frontmatter.category) {
      console.log(node.frontmatter.category, '카테고리');
      createNodeField({ 
        node, 
        name: 'categorySlug', 
        value: `/category/${node.frontmatter.category}/`,
      });
    }
  }
};

module.exports = createNode;
