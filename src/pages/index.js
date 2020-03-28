import React from "react"
import { Link, graphql } from "gatsby"
import CategoryListTemplate from "../templates/CategoryListTemplate/CategoryListTemplate"

function BlogIndex(props) {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  debugger
  return (
    <CategoryListTemplate
      location={props.location}
      title={siteTitle}
      data={data}
    />
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { category: { ne: null } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
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
