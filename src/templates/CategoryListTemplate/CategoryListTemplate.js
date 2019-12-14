import React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../../components/Bio/Bio";
import Layout from "../../components/Layout/Layout";
import SEO from "../../components/Seo";
import "./CategoryListTemplate.scss";

function CategoryListTemplate({
  location, 
  data, 
  pageContext,
  title
}) {
  const { edges } = data.allMarkdownRemark;

  return (
    <Layout
      location={location}
      title={pageContext ? pageContext.category : title}
    >
    <SEO title={pageContext ? pageContext.category : title} />
    {title && <Bio />}
    {edges.map(({ node }) => {
      const title = node.frontmatter.title;
      return (
        <article key={node.fields.slug}>
          <header>
            <h3>
              <Link 
                style={{ boxShadow: `none`}} 
                to={node.fields.slug}
              >
                {title}
              </Link>
            </h3>
          </header>
          <section>
            <p
              className="description"
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
            />
          </section>
          <p className="date">{node.frontmatter.date}</p>
        </article>
      )
    })}
    </Layout>
  )
}

export const query = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
        filter: { frontmatter: { category: { eq: $category } } },
        sort: { order: DESC, fields: [frontmatter___date] }
      ){
      edges {
        node {
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            description
            category
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default CategoryListTemplate;
