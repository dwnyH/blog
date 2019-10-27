import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/Bio/Bio"
import Layout from "../components/Layout/Layout"
import SEO from "../components/Seo"
import CategoryListTemplate from "../templates/CategoryListTemplate/CategoryListTemplate";
import { rhythm } from "../utils/typography"

function BlogIndex(props) {
  const { data } = props;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <CategoryListTemplate 
      location={props.location}
      title={siteTitle}
      data={data}
    />
  );
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
