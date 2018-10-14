import React from 'react'
import { Link, graphql } from 'gatsby'
//import './post.css'
import Layout from '../components/layout'
import Img from 'gatsby-image'

const LabPage = props => {
  const postList = props.data.allMarkdownRemark

  return (
    <Layout>
      {postList.edges.map(({ node }, i) => (
        <Link to={node.fields.slug} key={node.id} className="link">
          <div className="post-list">
            <h1>{node.frontmatter.title}</h1>
            <Img fluid={node.frontmatter.image.childImageSharp.fluid} />
            <span>{node.frontmatter.date}</span>
            <p>{node.excerpt}</p>
          </div>
        </Link>
      ))}
    </Layout>
  )
}
export default LabPage

export const labQuery = graphql`
  query LabQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          fields {
            slug
          }
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM Do YYYY")
            title
            image {
              childImageSharp {
                fluid(maxWidth: 2000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
