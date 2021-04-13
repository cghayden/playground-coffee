import styled from 'styled-components';

const CartPageStyles = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  header {
    border-bottom: 3px solid var(--black);
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    display: flex;
  }
  footer {
    border-top: solid 3px var(--black);
    text-align: right;
    margin-top: 1rem;
    padding-right: 2rem;
    color: green;
    align-items: center;
    p {
      margin: 0;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: scroll;
    li ~ li {
      border-top: 1px solid black;
      padding-top: 1rem;
    }
  }
`;

export default CartPageStyles;