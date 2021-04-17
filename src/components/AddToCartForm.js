import React, { useState } from 'react';
import styled from 'styled-components';
import useForm from '../utils/useForm';
import { useCart } from './CartContext';
import MinusSvg from './Icons/MinusSvg';
import PlusSvg from './Icons/PlusSvg';

const FormStyles = styled.form`
  width: 100%;
  /* max-width: 350px; */
  padding: 0.5rem;
  width: max-content;
  margin: 0 auto;

  fieldset {
    border: none;
    padding: 0;
    margin: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: baseline;
    width: max-content;
    margin: 0 auto;
  }
  .input-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 10px 0;
    .input-item-label {
      padding-right: 1em;
    }
    .radioChoices {
      label {
        margin: 0 5px;
      }
      input {
        margin-right: 5px;
      }
    }
  }
  p.errorMessage {
    font-size: 13px;
    color: red;
  }
  button {
    width: 80%;
    place-self: center;
    padding: 4px 8px;
  }
  .errorDisplay {
    height: 16px;
    width: 100%;
  }
`;
const QuantitySelector = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 40px);
  align-items: center;
  width: 60%;
  button {
    padding: 0;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.5rem;
    padding-bottom: 4px;
  }
`;
const initialInputValues = { size: 'half pound' };

function AddToCartForm({ coffee }) {
  const { addToCart, totalCartPounds, openCart } = useCart();
  const { inputs, handleChange, resetForm, clearForm } = useForm(
    initialInputValues
  );
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState();

  function submitToCart(e) {
    console.log('add to cart');
    e.preventDefault();
    const poundsToAdd =
      inputs.size === 'half pound' ? quantity * 0.5 : quantity;
    if (!inputs.grind) {
      setError('Please Choose A Grind');
      return;
    }
    if (totalCartPounds[coffee.name] + poundsToAdd > coffee.stock) {
      setError('There is not sufficient quantity available in stock');
      return;
    }
    addToCart({
      quantity: quantity,
      coffee: coffee.name,
      grind: inputs.grind,
      unitPrice: inputs.size === 'half pound' ? coffee.price / 2 : coffee.price,
      size: inputs.size,
    });
    openCart();
  }
  return (
    <FormStyles action='POST' onSubmit={submitToCart}>
      <fieldset>
        <div className='input-item'>
          <label htmlFor='grind' className='input-item-label'>
            Grind:
          </label>
          <select
            required
            id='grind'
            name='grind'
            value={inputs.grind}
            onChange={(e) => {
              setError();
              handleChange(e);
            }}
            defaultValue='Select ...'
          >
            <option value='Select ...' default disabled>
              Select ...
            </option>
            <option value='whole bean'>Whole Bean</option>
            <option value='coarse ground'>Coarse</option>
            <option value='medium ground'>Medium</option>
            <option value='fine ground'>Fine</option>
          </select>
        </div>
        <div className='input-item'>
          <p className='input-item-label'>Size:</p>
          <div className='radioChoices'>
            <label htmlFor='size8' className='input-item-label'>
              <input
                id='size8'
                type='radio'
                name='size'
                value='half pound'
                checked={inputs.size === 'half pound'}
                onChange={handleChange}
              />
              8 oz.
            </label>
            <label htmlFor='size16' className='input-item-label'>
              <input
                id='size16'
                type='radio'
                name='size'
                value='one pound'
                checked={inputs.size === 'one pound'}
                onChange={handleChange}
              />
              16 oz.
            </label>
          </div>
        </div>
        <div className='input-item'>
          <label className='input-item-label'>Quantity:</label>
          <QuantitySelector>
            <button
              type='button'
              disabled={quantity === 1}
              onClick={() => setQuantity((q) => (q -= 1))}
            >
              <MinusSvg w={'18'} h={'18'} />
            </button>
            <p>{quantity}</p>
            <button
              type='button'
              onClick={() =>
                setQuantity((q) => {
                  //if q <= in stock, add 1
                  return (q += 1);
                })
              }
            >
              <PlusSvg w={'18'} h={'18'} />
            </button>
          </QuantitySelector>
        </div>
        <div className='errorDisplay'>
          {error && <p className='errorMessage'>{error}</p>}
        </div>
        <button className='action-secondary' type='submit'>
          Add {quantity} {inputs.size} bag{quantity > 1 ? `s` : null} to Cart
        </button>
      </fieldset>
    </FormStyles>
  );
}

export default AddToCartForm;