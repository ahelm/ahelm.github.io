import React from 'react';
import { graphql } from 'gatsby';
import Layout from './layout';
import SEO from './seo';

interface MarkdownRemark {
  html: string
  frontmatter: {
    date: string
    path: string
    title: string
  }
}

interface BlogProps {
  data: {
    markdownRemark: MarkdownRemark
  }
}

export default function Template({ data }: BlogProps) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <div>
        <div>
          <div>
            <h1>{frontmatter.title}</h1>
            <h4>{frontmatter.date}</h4>
          </div>
          <div>{html}</div>
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
