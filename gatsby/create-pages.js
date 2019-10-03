const path = require(`path`);

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`);
  const categoryListTemplate = path.resolve('./src/templates/category-list.js');
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                category
                title
              }
              fields {
                slug
              }
            }
          }
          group(field: frontmatter___category) {
            fieldValue
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const { edges, group } = result.data.allMarkdownRemark;

  edges.forEach((edge, index) => {
    const previous = index === edges.length - 1 ? null : edges[index + 1].node;
    const next = index === 0 ? null : edges[index - 1].node;

    createPage({
      path: edge.node.fields.slug,
      component: blogPostTemplate,
      context: { 
        slug: edge.node.fields.slug,
        previous,
        next, 
      }
    });
  });

  group.forEach((category) => {
    createPage({
      path: `/category/${category.fieldValue}`,
      component: categoryListTemplate,
      context: { 
        category: category.fieldValue,
      }
    });
  });
};

module.exports = createPages;
