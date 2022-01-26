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
import project2 from "../images/project2.png"
import project3 from "../images/project3.png"
import project4 from "../images/project4.png"
import project5 from "../images/project5.png"
import project7 from "../images/project7.png"

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
  const markdown3 = data.allMarkdownRemark.edges[3].node.html
  const markdown4 = data.allMarkdownRemark.edges[4].node.html
  const markdown5 = data.allMarkdownRemark.edges[5].node.html
  const markdown6 = data.allMarkdownRemark.edges[6].node.html
  const markdown7 = data.allMarkdownRemark.edges[7].node.html
  const markdown8 = data.allMarkdownRemark.edges[8].node.html

  return (
    <Layout>
      <Back>
      <SEO title="About" />
        <Main>
          <Introduce><img src={profile} alt="profile" style={{width: 230, float:"right"}}/></Introduce>
          <Typing>
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
          </Typing>

          <TopMessage>
          <br></br><br></br><br></br>
            "네 마음을 다하고 목숨을 다하고 뜻을 다하여 주 너의 하나님을 사랑하라"
            <br></br><br></br><br></br><br></br>
          </TopMessage>

          <BottomMessage>
          <br></br><br></br><br></br>
            "네 마음을 다하고 목숨을 다하고 뜻을 다하여 주 너의 하나님을 사랑하라"
            <br></br><br></br><br></br><br></br>
          </BottomMessage>
          

          <Container dangerouslySetInnerHTML={{ __html: markdown4 ?? "" }}
            rhythm={rhythm}
          ></Container>

          <LeftLine1><img src={line1} alt="line"/></LeftLine1>
          <RightLine1><img src={line1} alt="line"/></RightLine1>
          <Container2 dangerouslySetInnerHTML={{ __html: markdown ?? "" }}
            rhythm={rhythm}
          ></Container2>

          <ContainerStudy dangerouslySetInnerHTML={{ __html: markdown7 ?? "" }}
            rhythm={rhythm}
          ></ContainerStudy>
          <ContainerStudy dangerouslySetInnerHTML={{ __html: markdown8 ?? "" }}
            rhythm={rhythm}
          ></ContainerStudy>

          <LeftLine2><img src={line1} alt="line"/></LeftLine2>
          <RightLine2><img src={line1} alt="line"/></RightLine2>
          <Container3 dangerouslySetInnerHTML={{ __html: markdown2 ?? "" }}
            rhythm={rhythm}
          ></Container3>

          <ContainerProjectDate dangerouslySetInnerHTML={{ __html: markdown6 ?? "" }}
            rhythm={rhythm}
          ></ContainerProjectDate>
          <ProjectImg>
            <img src={project2} alt="project2" style={{width: 780}}/>
          </ProjectImg>
          <ContainerProject dangerouslySetInnerHTML={{ __html: markdown1 ?? "" }}
            rhythm={rhythm}
          ></ContainerProject>

          <ContainerProjectDate dangerouslySetInnerHTML={{ __html: markdown5 ?? "" }}
            rhythm={rhythm}
          ></ContainerProjectDate>
          <ProjectImg>
            <img src={project7} alt="project7" style={{width: 780}}/>
          </ProjectImg>
          <ContainerProject dangerouslySetInnerHTML={{ __html: markdown3 ?? "" }}
            rhythm={rhythm}
          ></ContainerProject>
          

        </Main>
        </Back>
    </Layout>
  )
}

const ContainerStudy = styled(Markdown).attrs({
  as: "main",
})`
  display: flex;
  justify-content: center;
  width: 800px;
  margin: 0 auto;
  padding-left: 5px;
  padding-top: 0px;
  margin-bottom: 0rem;
  @media (max-width: ${({ theme }) => theme.device.sm}) {
    padding-left: 0px;
    width: 320px;
  }
`

const Back = styled.div`
background: linear-gradient(to right, #fc354c, #0abfbc);
`

const ProjectImg = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 10%;
  margin-right: 10%;
  border: 3px solid;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  margin-bottom: 10px;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    margin-left: 0;
    margin-right: 0;
  }
`

const circleMove = keyframes`
  0%, 100% {
    clip-path: circle(12% at 90% 50%);
  }
  50% {
    clip-path: circle(12% at 10% 50%);
  }
`;

const circleMoveSmall = keyframes`
  0%, 100% {
    clip-path: circle(16% at 90% 50%);
  }
  50% {
    clip-path: circle(16% at 10% 50%);
  }
`;

const TopMessage = styled.div`
  position: absolute;
  left: 370px;
  top: 320px;
  font-size: 1.5rem;
  font-weight: 500;
  word-spacing: 5px;
  font-weight: 500;
  background: linear-gradient(to top, #ff4e50, #f9d423);
  color: white;
  clip-path: circle(7% at 60% 85%);
  animation: ${circleMove} 14s ease-in-out infinite;
  @media (max-width: ${({ theme }) => theme.device.sm}) {
    left: 0px;
    font-size: 1.25rem;
    padding-left: 40px;
    padding-right: 40px;
    top: 430px;
    line-height: 1.75rem;
    font-weight: 550;
    animation: ${circleMoveSmall} 14s ease-in-out infinite;
  }
`
const BottomMessage = styled.div`
  position: absolute;
  left: 370px;
  top: 320px;
  font-size: 1.5rem;
  font-weight: 500;
  word-spacing: 5px;
  font-weight: 500;
  background: linear-gradient(to top, #ff4e50, #f9d423);
  color: white;
  clip-path: circle(7% at 60% 85%);
  animation: ${circleMove} 18s ease-in-out infinite;
  @media (max-width: ${({ theme }) => theme.device.sm}) {
    left: 0px;
    font-size: 1.25rem;
    padding-left: 40px;
    padding-right: 40px;
    top: 430px;
    line-height: 1.75rem;
    font-weight: 550;
    animation: ${circleMoveSmall} 18s ease-in-out infinite;
  }
  `

const Typing = styled.div`
  position: absolute;
  left: 430px;
  top: 165px;
  font-size: 2.8rem;
  font-weight: 800;
  @media (max-width: ${({ theme }) => theme.device.sm}) {
    left: 33px;
    top: 332px;
    font-size: 2.0rem;
  }
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

const RightLine1 = styled.div`
  margin-top: 48px;
  padding-top:100px;
  width: 40%;
  float: right;
  @media (max-width: ${({ theme }) => theme.device.sm}) {
    width: 90px;
  }
`

const LeftLine1 = styled.div`
  margin-top: 48px;
  padding-top: 100px;
  margin-left: 0;
  width: 40%;
  float: left;
  @media (max-width: ${({ theme }) => theme.device.sm}) {
    width: 90px;
  }
`

const RightLine2 = styled.div`
  margin-top: 2px;
  padding-top: 100px;
  width: 40%;
  float: right;
  @media (max-width: ${({ theme }) => theme.device.sm}) {
    width: 90px;
  }
`

const LeftLine2 = styled.div`
  margin-top: 2px;
  padding-top: 100px;
  margin-left: 0;
  width: 40%;
  float: left;
  @media (max-width: ${({ theme }) => theme.device.sm}) {
    width: 90px;
  }
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
  @media (max-width: ${({ theme }) => theme.device.sm}) {
    padding-right: 18%;
  }
`


const Container2 = styled(Markdown).attrs({
  as: "main",
})`
  width: 80px;
  margin: 0 auto;
  margin-top: 40px;
  padding-left: 10px;
  padding-top: 120px;
  margin-bottom: 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container3 = styled(Markdown).attrs({
  as: "main",
})`
  width: 100px;
  margin: 0 auto;
  margin-top: 40px;
  padding-left: 5px;
  padding-top: 35px;
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ContainerProject = styled(Markdown).attrs({
  as: "main",
})`
  width: 800px;
  margin: 0 auto;
  padding-left: 5px;
  padding-top: 0px;
  margin-bottom: 6rem;
  @media (max-width: ${({ theme }) => theme.device.sm}) {
    padding-left: 0px;
    width: 300px;
  }
`

const ContainerProjectDate = styled(Markdown).attrs({
  as: "main",
})`
  width: 800px;
  margin: 0 auto;
  padding-left: 5px;
  padding-top: 0px;
  @media (max-width: ${({ theme }) => theme.device.sm}) {
    padding-left: 0px;
    width: 320px;
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
    padding-left: 0px;
    margin-left: 0px;
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
