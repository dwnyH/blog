import React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../../components/Bio/Bio";
import Layout from "../../components/Layout/Layout";
import SEO from "../../components/Seo";
import { rhythm } from "../../utils/typography";
import "./CategoryListTemplate.scss";

function CategoryListTemplate({
  location, 
  data, 
  pageContext,
  title
}) {
  const isCategoryPage = Boolean(pageContext);
  const { edges } = data.allMarkdownRemark;

  return (
    <Layout
      location={location}
      title={isCategoryPage ? pageContext.category : title}
    >
    <SEO title={isCategoryPage ? pageContext.category : title} />
    {!isCategoryPage && <Bio />}
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
