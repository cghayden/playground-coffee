import React from 'react';
import { graphql } from 'gatsby';
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
} from '../utils/helpers';
import Layout from '../components/Layout';

import SEO from '../components/SEO';
import GraphQLErrorList from '../components/GraphqlErrorList';
import BlogPreviewList from '../components/BlogPreviewList';

export default function blogPage({ data, errors }) {
  // console.log('data', data);
  const bg = data.siteSettings.backgroundImage
    ? `url(${data.siteSettings.backgroundImage.asset.gatsbyImageData.images.fallback.src})`
    : data.siteSettings.backgroundColor.hex;
  if (errors) {
    return <GraphQLErrorList errors={errors} />;
  }
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];
  return (
    <Layout bg={bg}>
      <SEO title={'Blog'} />
      <main>
        {/* <h1>Blog</h1> */}
        {postNodes && <BlogPreviewList nodes={postNodes} />}
      </main>
    </Layout>
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
            alt
            asset {
              gatsbyImageData(fit: FILLMAX, placeholder: DOMINANT_COLOR)
              #   fluid(maxWidth: 600) {
              #     base64
              #     srcWebp
              #     srcSetWebp
              #   }
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
    siteSettings: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      backgroundImage {
        asset {
          gatsbyImageData(fit: FILL, formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      backgroundColor {
        hex
      }
    }
  }
`;
