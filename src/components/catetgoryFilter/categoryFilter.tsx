import React, { useRef } from "react"
import { Link } from "gatsby"
import type { GatsbyLinkProps } from "gatsby"
import styled from "styled-components"
import kebabCase from "lodash/kebabCase"

import type { MarkdownRemarkGroupConnection } from "Types/GraphQL"
import useScrollCenter from "./useScrollCenter"
import { constant } from "lodash"


const ACTIVE = "active"

interface CategoryFilterProps {
  categoryList: MarkdownRemarkGroupConnection[]
}

type LinkPropsGetter = GatsbyLinkProps<unknown>["getProps"]

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categoryList }) => {
  const categoryRef = useRef<HTMLUListElement>(null)
  const ALL_CATEGORY_NAME = "Show All"
  const isActive: LinkPropsGetter = ({ isCurrent }) =>
    isCurrent ? { id: ACTIVE, tabIndex: -1 } : {}

  useScrollCenter({ ref: categoryRef, targetId: ACTIVE })

  return (
    <Nav aria-label="Category Filter">
      <CategoryTitle>Category</CategoryTitle>
      <CategoryButton getProps={isActive} to="/">
        {ALL_CATEGORY_NAME} 
      </CategoryButton>
      <Divider />
      <CategoryUl ref={categoryRef} className="invisible-scrollbar">
        {categoryList
          .sort((a, b) => b.totalCount - a.totalCount)
          .map(category => {
            const { fieldValue } = category
            const fieldCount  = category.totalCount
            return (
              <li key={fieldValue}>
                <CategoryButton
                  getProps={isActive}
                  to={`/category/${kebabCase(fieldValue!)}/`}
                >
                  {fieldValue}
                </CategoryButton>
              </li>
            )
          })}
      </CategoryUl>
    </Nav>
  )
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  background-color: var(--color-card);
  margin-bottom: 48px;
  padding: 12px var(--sizing-md);
  border-radius: var(--border-radius-base);

  a#active {
    color: var(--color-white);
    background-color: var(--color-blue);
  }

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    padding: 12px;
    overflow: scroll;
  }
`

const CategoryTitle = styled.em`
  position: static;
  width: auto;
  height: auto;
  clip: auto;
  white-space: auto;

  flex-shrink: 0;
  font-size: var(--text-base);
  font-weight: var(--font-weight-bold);
  font-style: initial;
  margin-right: var(--sizing-lg);

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    white-space: no-wrap;
  }
`

const CategoryButton = styled(Link)`
  cursor: pointer;
  display: block;
  background-color: var(--color-category-button);
  padding: var(--sizing-sm) var(--sizing-base);
  border-radius: var(--border-radius-base);
  font-size: 1rem;
  font-weight: var(--font-weight-semi-bold);

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    font-size: 1rem;
  }

  :focus {
    outline: none;
  }

  &:hover {
    color: var(--color-white);
    background-color: var(--color-blue);
  }

  &:focus-visible {
    color: var(--color-white);
    background-color: var(--color-blue);
  }
`

const Divider = styled.div`
  width: 1px;
  height: 32px;
  margin: 0 var(--sizing-sm);
  transform: translateX(-50%);
  background-color: var(--color-divider);
`

const CategoryUl = styled.ul`
  display: flex;
  list-style: none;
  -ms-overflow-style: none;
  scrollbar-width: none;
  

  li + li {
    margin-left: 6px;
  }
`

export default CategoryFilter
