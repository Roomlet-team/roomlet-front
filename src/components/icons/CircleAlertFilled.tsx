import * as React from 'react';

const CircleAlertFilled = (props) => {
  const { width, height } = props;

  return (
    <svg width={width} height={height} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_2766_14236)">
        <path
          d="M64 32C64 36.0515 63.2471 39.9275 61.8728 43.4953C57.5898 54.6197 47.2719 62.747 34.9304 63.8672C33.9648 63.9555 32.9878 64 31.9997 64C14.3268 64 0 49.6733 0 32C0 14.3267 14.3268 0 31.9997 0C49.6726 0 64 14.3273 64 32Z"
          fill="#F0E7E7"
        />
        <path
          d="M30.5 21.5C30.5 20.6716 31.1716 20 32 20C32.8284 20 33.5 20.6716 33.5 21.5V35.5C33.5 36.3284 32.8284 37 32 37C31.1716 37 30.5 36.3284 30.5 35.5V21.5Z"
          fill="#B5312C"
        />
        <circle cx="32" cy="41" r="2" fill="#B5312C" />
      </g>
      <defs>
        <clipPath id="clip0_2766_14236">
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CircleAlertFilled;
