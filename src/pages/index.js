import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import styled from 'styled-components';
import PortableText from '../components/PortableText';
import CoffeeDisplay from '../components/CoffeeDisplay';
import GlobalStyles from '../styles/GlobalStyles';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomeWrapper = styled.div`
  height: 100vh;

  main {
    text-align: center;
    padding: 1rem 0;
    margin: 0 auto;
  }
  .whatsFresh {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    text-align: center;
  }
  .bgImg1 {
    display: grid;
    place-items: center;
  }

  .bgImg,
  .bgImg1,
  .bgImg2,
  .bgImg3,
  .bgImg4 {
    position: relative;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;
const TextOverlay = styled.div`
  text-align: center;
  color: #000;
  padding: 1rem 2rem;
  background: hsla(0, 0%, 0%, 0.55);
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 30px;
    color: #d5e5d5;
  }
  p {
    color: #d5e5d5;
    font-size: 20px;
  }
`;
const FooterOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  text-align: center;
  color: #000;
`;
const HomeText = styled.div`
  color: #777;
  background-color: white;
  padding: 50px 80px;
  text-align: justify;
`;
const CoffeeContainer = styled.div`
  padding: 2rem 0;
  h2 {
    padding: 1rem 0;
    margin: 0;
  }
`;
const CoffeeText = styled.div`
  color: white;
  text-align: center;
`;
const TransitionTextContainer = styled.div`
  position: relative;
`;
const TransitionText = styled.div`
  color: #ddd;
  background-color: #282e34;
  padding: 50px 80px;
  text-align: center;
`;

export default function welcomePage({ data }) {
  console.log('data', data);
  const pageHeading = data ? data.homePageText.heading : '';
  const text = data ? data.homePageText._rawContent : [];
  const img1 = data?.content.bgImage1.asset.gatsbyImageData.images.fallback.src;
  const img2 = data?.content.bgImage2.asset.gatsbyImageData.images.fallback.src;
  const img3 = data?.content.bgImage3.asset.gatsbyImageData.images.fallback.src;
  const img4 = data?.content.bgImage4.asset.gatsbyImageData.images.fallback.src;
  const overlayText1 = data?.content.overlayText1._rawChildren;
  const overlayPortableText1 = data?.content._rawOverlayText1;
  const transitionText1 = data?.content._rawTransitionText1;
  const transitionText2 = data?.content._rawTransitionText2;
  const transitionText3 = data?.content._rawTransitionText3;
  return (
    <>
      <GlobalStyles />
      <SEO title={'Home'} />
      <HomeWrapper>
        <Header black={true} />
        <div
          className='bgImg1'
          style={{ minHeight: '100%', backgroundImage: `url(${img1})` }}
        >
          <TextOverlay>
            <PortableText blocks={overlayPortableText1} />
          </TextOverlay>
        </div>
        <HomeText>
          <PortableText blocks={transitionText1} />
        </HomeText>
        <CoffeeContainer
          className='bgImg'
          style={{ minHeight: '400px', backgroundImage: `url(${img2})` }}
        >
          <h2 className='alignCenter pageHeading'>{pageHeading}</h2>
          <CoffeeText>
            <PortableText blocks={text} />
          </CoffeeText>
          <CoffeeDisplay allCoffee={data.coffees.nodes} />
        </CoffeeContainer>
        <TransitionText>
          <PortableText blocks={transitionText2} />
        </TransitionText>
        <div
          className='bgImg'
          style={{ minHeight: '350px', backgroundImage: `url(${img3})` }}
        ></div>
        <TransitionText>
          <PortableText blocks={transitionText3} />
        </TransitionText>
        <div
          className='bgImg'
          style={{ minHeight: '100%', backgroundImage: `url(${img4})` }}
        >
          <FooterOverlay>
            <Footer />
          </FooterOverlay>
        </div>
      </HomeWrapper>
    </>
  );
}

export const query = graphql`
  query WelcomePageQuery {
    coffees: allSanityCoffee(filter: { stock: { gt: 0 } }) {
      nodes {
        _id
        name
        price
        region
        roastLevel
        singleOrigin
        description
        grade
        stock
        roastDate
        slug {
          current
        }
      }
    }
    homePageText: sanityTextBlock(name: { eq: "Home Page Lead" }) {
      id
      heading
      _rawContent
    }
    content: sanityLandingPage(name: { eq: "homePage" }) {
      bgImage1 {
        asset {
          gatsbyImageData(fit: FILL, formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      bgImage2 {
        asset {
          gatsbyImageData(fit: FILL, formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      bgImage3 {
        asset {
          gatsbyImageData(fit: FILL, formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      bgImage4 {
        asset {
          gatsbyImageData(fit: FILL, formats: AUTO, placeholder: DOMINANT_COLOR)
        }
      }
      _rawOverlayText1(resolveReferences: { maxDepth: 10 })
      overlayText1 {
        _rawChildren
      }
      _rawTransitionText1(resolveReferences: { maxDepth: 10 })
      _rawTransitionText2(resolveReferences: { maxDepth: 10 })
      _rawTransitionText3(resolveReferences: { maxDepth: 10 })
    }
  }
`;
