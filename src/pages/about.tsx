import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import { MarkdownHeadingLevels, Query } from "Types/GraphQL"
import Layout from "Layouts/layout"
import SEO from "Components/seo"
import Markdown from "Styles/markdown"
import { rhythm } from "Styles/typography"
import profile from "../images/profile.png"
import line1 from "../images/line.png"

const About = () => {
  const data = useStaticQuery<Query>(graphql`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/about/" } }) {
        edges {
          node {
            html
          }
        }
      }
    }
  `)

  const markdown = data.allMarkdownRemark.edges[0].node.html
  const markdown1 = data.allMarkdownRemark.edges[1].node.html
  const markdown2 = data.allMarkdownRemark.edges[2].node.html

  return (
    <Layout>
      <SEO title="About" />
        <Main>
          <Introduce>
            <img src={profile} alt="profile" style={{width: 250, float:"right"}}/>
          </Introduce>
          <Container dangerouslySetInnerHTML={{ __html: markdown ?? "" }}
            rhythm={rhythm}
          ></Container>
          <Line>
            <img src={line1} alt="line" style={{width: 380, float:"left"}}/>
            <img src={line1} alt="line" style={{width: 380, float:"right"}}/>
          <Container2 dangerouslySetInnerHTML={{ __html: markdown1 ?? "" }}
            rhythm={rhythm}
          ></Container2>
          </Line>

          <Line>
            <img src={line1} alt="line" style={{width: 380, float:"left"}}/>
            <img src={line1} alt="line" style={{width: 380, float:"right"}}/>
          <Container2 dangerouslySetInnerHTML={{ __html: markdown2 ?? "" }}
            rhythm={rhythm}
          ></Container2>

          </Line>
          
        </Main>
    </Layout>
  )
}

const Line = styled.div`
  padding-top: 30px;
`

const Main = styled.div`
  box-sizing: content-box;
  width: 80%;
  max-width: var(--width);
  padding-top: var(--sizing-xs);
  padding-bottom: var(--sizing-lg);
  margin: 0 auto;
`
const Introduce = styled.div`
  padding-right: 12%;
`
const Container2 = styled(Markdown).attrs({
  as: "main",
})`
  text-align: center;  

  h2 {
    margin-top: 0;
    padding-top: 0;
    font-size: 2rem;

    @media (max-width: ${({ theme }) => theme.device.sm}) {
      font-size: 1.75rem;
    }
  }
`


const Container = styled(Markdown).attrs({
  as: "main",
})`
  width: var(--post-width);
  margin: 0 auto;
  margin-top: 60px;
  padding-left: 20px;
  margin-bottom: 6rem;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    margin-top: var(--sizing-xl);
    width: 87.5%;
  }

  h1 {
    margin-bottom: 0.5rem;
    letter-spacing: -2px;
    word-spacing: 10px;
  }

  h2 {
    margin-top: var(--sizing-lg);

    @media (max-width: ${({ theme }) => theme.device.sm}) {
      font-size: 1.75rem;
    }
  }

  h3 {
    @media (max-width: ${({ theme }) => theme.device.sm}) {
      font-size: 1.25rem;
    }
  }
`

export default About
