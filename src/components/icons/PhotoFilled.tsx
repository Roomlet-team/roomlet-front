import * as React from 'react';

const PhotoFilled = (props) => {
  const { width, height } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
      <circle cx={13} cy={13} r={12} fill="#fff" stroke="#E2E2E2" />
      <g fill="#999" clipPath="url(#a)">
        <path d="M13 15.134a2.133 2.133 0 1 0 0-4.267 2.133 2.133 0 0 0 0 4.267" />
        <path d="M11 6.332 9.78 7.665H7.667c-.733 0-1.333.6-1.333 1.334v8c0 .733.6 1.333 1.333 1.333h10.667c.733 0 1.333-.6 1.333-1.333v-8c0-.734-.6-1.334-1.334-1.334H16.22L15 6.332zm2 10a3.335 3.335 0 0 1 0-6.667 3.335 3.335 0 0 1 0 6.667" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M5 5h16v16H5z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PhotoFilled;
