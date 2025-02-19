import React from 'react';
const FilterOutlined = (props) => {
  const { width, height } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
      <path
        stroke="#616161"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M22.128 18.071a2.62 2.62 0 1 0-4.362-2.902 2.62 2.62 0 0 0 4.362 2.902M22.128 32.806a2.62 2.62 0 1 0-4.362-2.903 2.62 2.62 0 0 0 4.362 2.903M25.871 25.439a2.62 2.62 0 1 1 4.363-2.903 2.62 2.62 0 0 1-4.363 2.903"
        clipRule="evenodd"
      />
      <path
        fill="#616161"
        d="M22.571 15.86a.75.75 0 0 0 0 1.5zM34 17.36a.75.75 0 1 0 0-1.5zm-16.676 0a.75.75 0 0 0 0-1.5zM14 15.86a.75.75 0 0 0 0 1.5zm8.571 14.736a.75.75 0 0 0 0 1.5zM34 32.096a.75.75 0 1 0 0-1.5zm-16.676 0a.75.75 0 0 0 0-1.5zM14 30.596a.75.75 0 0 0 0 1.5zm11.429-5.868a.75.75 0 1 0 0-1.5zM14 23.228a.75.75 0 0 0 0 1.5zm16.675 0a.75.75 0 0 0 0 1.5zm3.325 1.5a.75.75 0 1 0 0-1.5zM22.57 17.36H34v-1.5H22.57zm-5.247-1.5H14v1.5h3.324zm5.247 16.237H34v-1.5H22.57zm-5.247-1.5H14v1.5h3.324zm8.105-7.368H14v1.5h11.429zm5.246 1.5H34v-1.5h-3.325z"
      />
    </svg>
  );
};
export default FilterOutlined;
