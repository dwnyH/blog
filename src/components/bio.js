/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useSiteMetadata } from '../hooks';
import { rhythm } from "../utils/typography"

const Bio = () => {
  const { author } = useSiteMetadata();

  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <img
        src={author.photo}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          maxWidth: 50,
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
      <p>
        Written by <strong>{author.name}</strong>
        {` `}
        {/* <a href={`https://twitter.com/${social.twitter}`}>
          You should follow him on Twitter
        </a> */}
      </p>
    </div>
  )
}

export default Bio
