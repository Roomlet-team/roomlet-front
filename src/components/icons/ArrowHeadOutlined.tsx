import * as React from 'react';

const ArrowHeadOutlined = (props) => {
  const { width, height } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
      <path
        fill="#242C33"
        stroke="#242C33"
        d="M10.06 11.646 9.708 12l.354.354 5.293 5.292a.5.5 0 0 1-.708.708l-6-6-.353.353.353-.353a.5.5 0 0 1 0-.708l-.353-.353.353.353 6-6-.353-.353.353.353a.5.5 0 0 1 .708 0l.353-.353-.353.353a.5.5 0 0 1 0 .708l.26.26-.26-.26z"
      />
    </svg>
  );
};
export default ArrowHeadOutlined;
