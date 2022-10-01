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
import project7 from "../images/project7.png"
import project8 from "../images/project8.jpg"
import project9 from "../images/project9.jpg"
import project10 from "../images/project10.png"
import blog from "../images/blog.png"
import bible from "../images/bible.png"
import bible2 from "../images/white_bible.png"
import paper from "../images/deep_paper.png"

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
  const markdown9 = data.allMarkdownRemark.edges[9].node.html
  const markdown10 = data.allMarkdownRemark.edges[10].node.html
  const markdown11 = data.allMarkdownRemark.edges[11].node.html
  const markdown12 = data.allMarkdownRemark.edges[12].node.html
  const markdown13 = data.allMarkdownRemark.edges[13].node.html
  const markdown14 = data.allMarkdownRemark.edges[14].node.html
  const markdown15 = data.allMarkdownRemark.edges[15].node.html
  const markdown16 = data.allMarkdownRemark.edges[16].node.html
  const markdown17 = data.allMarkdownRemark.edges[17].node.html
  const markdown18 = data.allMarkdownRemark.edges[18].node.html
  const markdown19 = data.allMarkdownRemark.edges[19].node.html
  const markdown20 = data.allMarkdownRemark.edges[20].node.html

  return (
    <Layout>
      <SEO title="About" />
        <Main>
          <Introduce><img src={profile} alt="profile" style={{width: 230, float:"right"}}/></Introduce>


          <Container dangerouslySetInnerHTML={{ __html: markdown10 ?? "" }}
            rhythm={rhythm}
          ></Container>

          <Bible>
            <img src={bible} alt="bible"></img>
          </Bible>
          <Bible>
            <img src={bible2} alt="white_bible"></img>
          </Bible>

          <LeftLine1><img src={line1} alt="line"/></LeftLine1>
          <RightLine1><img src={line1} alt="line"/></RightLine1>
          <Container2 dangerouslySetInnerHTML={{ __html: markdown1 ?? "" }}
            rhythm={rhythm}
          ></Container2>

          <ContainerStudy dangerouslySetInnerHTML={{ __html: markdown11 ?? "" }}
            rhythm={rhythm}
          ></ContainerStudy>
          <ContainerStudy dangerouslySetInnerHTML={{ __html: markdown7 ?? "" }}
            rhythm={rhythm}
          ></ContainerStudy>
          <ContainerStudy dangerouslySetInnerHTML={{ __html: markdown8 ?? "" }}
            rhythm={rhythm}
          ></ContainerStudy>
          <ContainerStudy dangerouslySetInnerHTML={{ __html: markdown12 ?? "" }}
            rhythm={rhythm}
          ></ContainerStudy>

          <LeftLine2><img src={line1} alt="line"/></LeftLine2>
          <RightLine2><img src={line1} alt="line"/></RightLine2>
          <Container3 dangerouslySetInnerHTML={{ __html: markdown2 ?? "" }}
            rhythm={rhythm}
          ></Container3>

          <ContainerProjectDate dangerouslySetInnerHTML={{ __html: markdown3 ?? "" }}
            rhythm={rhythm}
          ></ContainerProjectDate>
          <ProjectImg>
            <img src={project2} alt="project2" style={{width: 780}}/>
          </ProjectImg>
          <ContainerProject dangerouslySetInnerHTML={{ __html: markdown6 ?? "" }}
            rhythm={rhythm}
          ></ContainerProject>

          <ContainerProjectDate dangerouslySetInnerHTML={{ __html: markdown4 ?? "" }}
            rhythm={rhythm}
          ></ContainerProjectDate>
          <ProjectImg>
            <img src={project7} alt="project7" style={{width: 780}}/>
          </ProjectImg>
          <ContainerProject dangerouslySetInnerHTML={{ __html: markdown5 ?? "" }}
            rhythm={rhythm}
          ></ContainerProject>
          
          <ContainerProjectDate dangerouslySetInnerHTML={{ __html: markdown9 ?? "" }}
            rhythm={rhythm}
          ></ContainerProjectDate>
          <ProjectImg>
            <img src={blog} alt="blog_img" style={{width: 780}}/>
          </ProjectImg>
          <ContainerProject dangerouslySetInnerHTML={{ __html: markdown ?? "" }}
            rhythm={rhythm}
          ></ContainerProject>

          <ContainerProjectDate dangerouslySetInnerHTML={{ __html: markdown18 ?? "" }}
            rhythm={rhythm}
          ></ContainerProjectDate>
          <ProjectImg>
            <img src={project10} alt="project10" style={{width: 780}}/>
          </ProjectImg>
          <ContainerProject dangerouslySetInnerHTML={{ __html: markdown17 ?? "" }}
            rhythm={rhythm}
          ></ContainerProject>

          <ContainerProjectDate dangerouslySetInnerHTML={{ __html: markdown13 ?? "" }}
            rhythm={rhythm}
          ></ContainerProjectDate>
          <ProjectImg>
            <img src={project8} alt="project8" style={{width: 780}}/>
          </ProjectImg>
          <ContainerProject dangerouslySetInnerHTML={{ __html: markdown14 ?? "" }}
            rhythm={rhythm}
          ></ContainerProject>

          <ContainerProjectDate dangerouslySetInnerHTML={{ __html: markdown15 ?? "" }}
            rhythm={rhythm}
          ></ContainerProjectDate>
          <ProjectImg>
            <img src={project9} alt="project9" style={{width: 780}}/>
          </ProjectImg>
          <ContainerProject dangerouslySetInnerHTML={{ __html: markdown16 ?? "" }}
            rhythm={rhythm}
          ></ContainerProject>

          <ContainerProjectDate dangerouslySetInnerHTML={{ __html: markdown19 ?? "" }}
            rhythm={rhythm}
          ></ContainerProjectDate>
          <ProjectImg>
            <img src={paper} alt="paper" style={{width: 780}}/>
          </ProjectImg>
          <ContainerProject dangerouslySetInnerHTML={{ __html: markdown20 ?? "" }}
            rhythm={rhythm}
          ></ContainerProject>
        </Main>
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

const Bible = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 8%;
  width: 800px;
  height: 50px;
  padding-bottom: 0;
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
  @media (max-width: ${({ theme }) => theme.device.md}) {
    padding-right: 14%;
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
