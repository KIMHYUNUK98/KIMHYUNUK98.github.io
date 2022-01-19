import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled, {keyframes} from "styled-components"

import { MarkdownHeadingLevels, Query } from "Types/GraphQL"
import Layout from "Layouts/layout"
import SEO from "Components/seo"
import Markdown from "Styles/markdown"
import { rhythm } from "Styles/typography"
import profile from "../images/profile.png"
import line1 from "../images/line1.png"

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

  const markdown2 = data.allMarkdownRemark.edges[0].node.html
  const markdown = data.allMarkdownRemark.edges[1].node.html
  const markdown1 = data.allMarkdownRemark.edges[2].node.html

  return (
    <Layout>
      <SEO title="About" />
        <Main>
          <Introduce><img src={profile} alt="profile" style={{width: 250, float:"right"}}/></Introduce>
          <Typing>
            <Listing>
              <Item>꾸준히 성장하는 학부생</Item>
              <Item>하나님의 방향을 따르는</Item>
              <Item>돈보다 가치를 우선시하는</Item>
            </Listing>
          </Typing>
          <TypingA></TypingA>

          <Container dangerouslySetInnerHTML={{ __html: markdown ?? "" }}
            rhythm={rhythm}
          ></Container>

          <LeftLine><img src={line1} alt="line"/></LeftLine>
          <RightLine><img src={line1} alt="line"/></RightLine>
          <Container2 dangerouslySetInnerHTML={{ __html: markdown1 ?? "" }}
            rhythm={rhythm}
          ></Container2>   

          <LeftLine><img src={line1} alt="line"/></LeftLine>
          <RightLine><img src={line1} alt="line"/></RightLine>
          <Container2 dangerouslySetInnerHTML={{ __html: markdown2 ?? "" }}
            rhythm={rhythm}
          ></Container2>
          
        </Main>
    </Layout>
  )
}

const Typing = styled.div`
  position: absolute;
  left: 430px;
  top: 166px;
  font-size: 2.5rem;
  font-weight: 800;
  display: none;
`

const Listing = styled.ul`
  list-style: none;
`
const Item = styled.li`
`
const cursor = keyframes`
  0%{border-right: 1px solid #fff} 
  50%{border-right: 1px solid #000} 
  100%{border-right: 1px solid #fff}
`;

const TypingA = styled.p`
  display: inline-block;
  animation: ${cursor} 0.3s infinite;
`

const RightLine = styled.div`
  padding-top:30px;
  width: 40%;
  float: right;
`

const LeftLine = styled.div`
  padding-top: 30px;
  width: 40%;
  float: left;
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
  padding-right: 8%;
`
const Container2 = styled(Markdown).attrs({
  as: "main",
})`
  text-align: center;  
  padding-top: 20px;

  h2 {
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
    font-weight: 400;
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
