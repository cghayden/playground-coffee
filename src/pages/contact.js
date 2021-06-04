import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import GraphQLErrorList from '../components/GraphqlErrorList';
import InstagramSvg from '../components/Icons/InstagramSvg';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const Address = styled.div`
  a {
    color: green;
    padding: 0;
  }
`;
const Contact = styled.p`
  display: flex;
  align-items: center;
  svg {
    margin-bottom: -5px;
    margin-left: 10px;
  }
`;

export default function contactPage({ data, errors }) {
  const bg = data.siteSettings.backgroundImage
    ? `url(${data.siteSettings.backgroundImage.asset.gatsbyImageData.images.fallback.src})`
    : data.siteSettings.backgroundColor.hex;
  if (errors) {
    return <GraphQLErrorList errors={errors} />;
  }
  return (
    <Layout bg={bg}>
      <SEO title={'Contact'} />
      <main>
        {/* <h1>playground coffee</h1> */}
        <div className='contentBox'>
          <Address className='address'>
            <p>westeros coffee</p>
            <p>Winterfell</p>
            <p>westeros</p>
            <Contact>
              <a href='tel:781-752-6486'></a>
              <a
                href='https://www.instagram.com'
                rel='noopener noreferrer'
                target='_blank'
              >
                <span>
                  <InstagramSvg w={24} h={24} />
                </span>
              </a>
            </Contact>
          </Address>
        </div>
      </main>
    </Layout>
  );
}

export const query = graphql`
  query ContactPageQuery {
    # pageContent: sanityContactPage(_id: { eq: "contactPage" }) {
    #   heading
    #   _rawTopText(resolveReferences: { maxDepth: 10 })
    #   _rawBottomText(resolveReferences: { maxDepth: 10 })
    # }
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
