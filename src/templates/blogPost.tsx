import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import type { Query } from "Types/GraphQL"
import Layout from "Layouts/layout"
import SEO from "Components/seo"
import Comment from "Components/comment"
import { rhythm } from "Styles/typography"
import Category from "Styles/category"
import DateTime from "Styles/dateTime"
import Markdown from "Styles/markdown"
import profile from "../images/profile.png"

interface BlogPostProps {
  data: Query
}

const BlogPost: React.FC<BlogPostProps> = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark!
  const { title, desc, thumbnail, date, category } = frontmatter!

  const ogImagePath = thumbnail && thumbnail?.childImageSharp?.gatsbyImageData?.src

  return (
    <Layout>
      <SEO title={title} desc={desc} image={ogImagePath!} />
      <main>
        <article>
          <OuterWrapper>
          <Introduce><img src={profile} alt="profile" style={{width: 200, float:"right"}}/></Introduce>
            <InnerWrapper>
              <div>
                <header>
                  <Info>
                    <PostCategory>{category}</PostCategory>
                    <Time dateTime={date}>{date}</Time>
                  </Info>
                  <Title>{title}</Title>
                  <Desc>{desc}</Desc>
                </header>
                <Divider />
                <Markdown
                  dangerouslySetInnerHTML={{ __html: html ?? "" }}
                  rhythm={rhythm}
                />
              </div>
              <CommentWrap>
                <Comment />
            </CommentWrap>
            </InnerWrapper>
          </OuterWrapper>
        </article>
      </main>
    </Layout>
  )
}

const Introduce = styled.div`
  padding-right: 22%;
  @media (max-width: ${({ theme }) => theme.device.sm}) {
    padding-right: 5%;
    width: 100;
  }
`

const OuterWrapper = styled.div`
  background-color: #FFCE54;
  padding-bottom: 10%;
  @media (max-width: ${({ theme }) => theme.device.sm}) {
    
  }
`

const InnerWrapper = styled.div`
  width: 60vw;
  margin: 0 auto;
  border-left: solid;
  border-right: solid;
  border-bottom: solid;
  margin-bottom: 0;
  padding-bottom: var(--sizing-xl);
  padding-top: var(--sizing-xl);
  padding-left: 2%;
  padding-right: 2%;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    width: 87.5%;
  }
`

const CommentWrap = styled.section`
  width: 100%;
  padding: 0 var(--padding-sm);
  margin: 0 auto;
  padding-bottom: var(--sizing-xl);

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    width: auto;
  }
`

const PostCategory = styled(Category)`
  font-size: 0.875rem;
  font-weight: var(--font-weight-semi-bold);
`

const Info = styled.div`
  margin-bottom: var(--sizing-md);
`

const Time = styled(DateTime)`
  display: block;
  margin-top: var(--sizing-xs);
`

const Desc = styled.p`
  margin-top: var(--sizing-lg);
  line-height: 1.5;
  font-size: var(--text-lg);

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    line-height: 1.31579;
    font-size: 1.1875rem;
  }
`

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: gray;
  margin-top: var(--sizing-lg);
  margin-bottom: var(--sizing-lg);
`

const Title = styled.h1`
  font-weight: var(--font-weight-bold);
  line-height: 1.1875;
  font-size: var(--text-xl);

  @media (max-width: ${({ theme }) => theme.device.md}) {
    line-height: 1.21875;
    font-size: 2.5rem;
  }

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    line-height: 1.21875;
    font-size: 2rem;
  }
`

export const query = graphql`query ($slug: String!) {
  markdownRemark(fields: {slug: {eq: $slug}}) {
    html
    frontmatter {
      title
      desc
      thumbnail {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, layout: FIXED)
        }
      }
      date(formatString: "YYYY-MM-DD")
      category
    }
  }
}
`

export default BlogPost
