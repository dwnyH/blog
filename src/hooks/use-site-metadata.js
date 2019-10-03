import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            description
            author {
              name
              photo
            }
            menu {
              label
              path
            }
          }
        }
      }
    `
  );

  return site.siteMetadata;
};


export default useSiteMetadata;
