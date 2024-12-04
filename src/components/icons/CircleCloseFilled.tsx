import * as React from 'react';

const CircleCloseFilled = (props) => {
  const { width, height } = props;

  return (
    <svg width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width={24} height={24} fill="#E9E9E9" rx={12} />
      <path stroke="#969696" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m16 8-8 8m0-8 8 8" />
    </svg>
  );
};

export default CircleCloseFilled;
