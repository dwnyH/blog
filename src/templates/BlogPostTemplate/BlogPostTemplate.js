import React from "react"
import { Link, graphql } from "gatsby";
import Bio from "../../components/Bio/Bio";
import Layout from "../../components/Layout/Layout";
import SEO from "../../components/Seo";
import './BlogPostTemplate.scss';
import { rhythm, scale } from "../../utils/typography";
import { Disqus, CommentCount } from 'gatsby-plugin-disqus';

function BlogPostTemplate({data, pageContext, location}) {
  const post = data.markdownRemark;
  const { title, siteUrl } = data.site.siteMetadata;
  const { previous, next, slug } = pageContext;
  const disqusConfig = {
    identifier: post.id,
    title: post.frontmatter.title,
    url: `${siteUrl}${slug}`,
  };

  return (
    <Layout location={location} title={title}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1>
            {post.frontmatter.title}
          </h1>
          <p>
            {post.frontmatter.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav> 
      <CommentCount config={disqusConfig} placeholder={'...'} />
      <Disqus config={disqusConfig} />
    </Layout>
  );
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteUrl
        title
        author {
          name
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
