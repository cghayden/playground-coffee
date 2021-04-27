import React from 'react';

function ShippingTruckIcon({ w = '18', h = '18' }) {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={w}
        height={h}
        viewBox='0 0 20 20'
        // stroke='currentColor'
      >
        <path
          d='M17.816 14c-.415-1.162-1.514-2-2.816-2-1.302 0-2.4.838-2.816 2H12v-4h6v4h-.184zM15 16c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM5 16c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM2 4h8v10H7.816C7.4 12.838 6.302 12 5 12c-1.302 0-2.4.838-2.816 2H2V4zm13.434 1l1.8 3H12V5h3.434zm4.424 3.485l-3-5C16.678 3.185 16.35 3 16 3h-4c0-.552-.448-1-1-1H1c-.552 0-1 .448-1 1v12c0 .552.448 1 1 1h1.185C2.6 17.162 3.698 18 5 18s2.4-.838 2.816-2h4.37c.413 1.162 1.512 2 2.814 2s2.4-.838 2.816-2H19c.552 0 1-.448 1-1V9c0-.18-.05-.36-.142-.515z'
          fill-rule='evenodd'
        ></path>
      </svg>
    </>
  );
}

export default ShippingTruckIcon;
