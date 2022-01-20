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

  const markdown1 = data.allMarkdownRemark.edges[0].node.html
  const markdown = data.allMarkdownRemark.edges[1].node.html
  const markdown2 = data.allMarkdownRemark.edges[2].node.html

  return (
    <Layout>
      <SEO title="About" />
        <Main>
          <Introduce><img src={profile} alt="profile" style={{width: 250, float:"right"}}/></Introduce>
          <Typing>
            <Wave>
              <Item>꾸</Item>
              <Item>준</Item>
              <Item>히</Item>
              <Item>성</Item>
              <Item>장</Item>
              <Item>하</Item>
              <Item>는</Item>
              <Item>학</Item>
              <Item>부</Item>
              <Item>생</Item>
            </Wave>
          </Typing>

          <BottomMessage>
            "네 마음을 다하고 목숨을 다하고 뜻을 다하여 주 너의 하나님을 사랑하라"
          </BottomMessage>
          <TopMessage>
            "네 마음을 다하고 목숨을 다하고 뜻을 다하여 주 너의 하나님을 사랑하라"
          </TopMessage>
          

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

const circleMove = keyframes`
  0%, 100% {
    clip-path: circle(13% at 85% 50%);
  }
  50% {
    clip-path: circle(13% at 15% 50%);
  }
`;

const BottomMessage = styled.div`
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 370px;
  top: 400px;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: -2px;
  word-spacing: 5px;
  font-weight: 500;
  color: #232323;
`

const TopMessage = styled.div`
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 370px;
  top: 400px;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: -2px;
  word-spacing: 5px;
  font-weight: 500;
  background-color: blue;
  color: white;
  clip-path: circle(13% at 85% 50%);
  animation: ${circleMove} 20s ease-in-out infinite;
`

const Typing = styled.div`
  position: absolute;
  left: 428px;
  top: 163px;
  font-size: 2.8rem;
  font-weight: 800;
`

const Wave = styled.div`
  position: relative;
`
const flip = keyframes`
  0%, 80% {
    transform: rotateY(360deg)
  }
`;

const Item = styled.span`
  position: relative;
  display: inline-block;
  animation: ${flip} 3s infinite;
  animation-delay: calc(.2s * var(--i))
`

const RightLine = styled.div`
  margin-top: 50px;
  padding-top:100px;
  width: 40%;
  float: right;
`

const LeftLine = styled.div`
  margin-top: 50px;
  padding-top: 100px;
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
  padding-top: 140px;

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
