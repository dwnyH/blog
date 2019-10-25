import React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/Bio";
import Layout from "../components/Layout/Layout";
import SEO from "../components/Seo";
import Sidebar from '../components/NavMenu';
import { rhythm } from "../utils/typography"

function CategoryListTemplate({location, data, pageContext}) {
  const { edges } = data.allMarkdownRemark;

  return (
    <Layout
      location={location}
      title={pageContext.category}
    >
    <SEO title={pageContext.category} />
    <Bio />
    {/* <Sidebar /> */}
    {edges.map(({ node }) => {
      const title = node.frontmatter.title;
      return (
        <article key={node.fields.slug}>
          <header>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ 
                boxShadow: `none` 
              }} to={node.fields.slug}>
                {title}
              </Link>
            </h3>
            <small>{node.frontmatter.date}</small>
          </header>
          <section>
            <p
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
            />
          </section>
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
            date
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
