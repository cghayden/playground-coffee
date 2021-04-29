import React from 'react';
import { graphql } from 'gatsby';
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
} from '../utils/helpers';
import SEO from '../components/SEO';
import GraphQLErrorList from '../components/GraphqlErrorList';
import BlogPreviewList from '../components/BlogPreviewList';

export default function blogPage({ data, errors }) {
  if (errors) {
    return <GraphQLErrorList errors={errors} />;
  }
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];
  return (
    <>
      <SEO title={'Blog'} />

      {/* <h1>Blog</h1> */}
      {postNodes && <BlogPreviewList nodes={postNodes} />}
    </>
  );
}

export const query = graphql`
  query BlogPageQuery {
    posts: allSanityPost(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            asset {
              gatsbyImageData(
                width: 400
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`;
