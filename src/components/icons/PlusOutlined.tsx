import React from 'react';

const PlusOutlined = (props) => {
  const { width, height } = props;

  return (
    <svg width={width} height={height} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.5 5v14m-7-7h14" />
    </svg>
  );
};

export default PlusOutlined;
