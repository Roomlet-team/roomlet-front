import React, { FC } from 'react';
import { IconProps } from './types';

const UserGroupOutlined: FC<IconProps> = (props) => {
  const { width, height } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
      <g fill="#242C33" clipPath="url(#a)">
        <path d="M5.794 16.766c-.846-.468-1.673-.423-2.476.015-1.154.63-1.723 1.621-1.713 2.94.004.67-.619 1.08-1.175.774a.78.78 0 0 1-.421-.665c-.148-2.344 1.594-4.539 3.902-4.932.925-.157 1.786.015 2.622.444 1.316-1.915 3.114-3.03 5.456-3.037 2.347-.007 4.147 1.105 5.454 2.996.441-.137.866-.32 1.308-.396 1.392-.235 2.604.209 3.64 1.122 1.12.987 1.643 2.255 1.607 3.75-.011.468-.356.818-.8.817a.79.79 0 0 1-.794-.845 3.206 3.206 0 0 0-2.193-3.176c-.688-.224-1.342-.168-1.973.177.128.479.284.943.37 1.421.09.506.13 1.023.157 1.537a.78.78 0 0 1-.745.837.777.777 0 0 1-.837-.771c-.028-.857-.15-1.693-.487-2.484-.661-1.555-1.721-2.723-3.377-3.204-1.893-.55-3.521-.002-4.858 1.402-1.015 1.066-1.514 2.37-1.61 3.833-.01.15-.009.3-.022.45-.043.477-.389.794-.84.774-.432-.02-.752-.37-.752-.835q0-1.361.454-2.644zM7.95 6.947C7.958 4.755 9.727 2.99 11.906 3a3.956 3.956 0 0 1 3.943 3.991c-.013 2.171-1.801 3.92-3.999 3.908-2.148-.01-3.908-1.793-3.9-3.952M11.882 9.3a2.35 2.35 0 0 0 2.368-2.334A2.357 2.357 0 0 0 11.912 4.6 2.35 2.35 0 0 0 9.55 6.937 2.34 2.34 0 0 0 11.882 9.3M7.465 10.2a3.03 3.03 0 0 1-3.04 3.025c-1.66.008-3.034-1.372-3.027-3.04a3.03 3.03 0 0 1 3.054-3.037c1.669.003 3.017 1.368 3.013 3.052m-1.6-.005a1.43 1.43 0 0 0-1.41-1.447 1.43 1.43 0 0 0-1.457 1.428 1.434 1.434 0 1 0 2.868.019M19.43 13.223c-1.627.07-3.024-1.248-3.108-2.936-.08-1.607 1.248-3.065 2.856-3.135 1.707-.076 3.143 1.205 3.218 2.87.077 1.725-1.22 3.125-2.966 3.2zm-.054-4.475a1.44 1.44 0 0 0-1.456 1.435 1.443 1.443 0 0 0 1.425 1.442 1.437 1.437 0 1 0 .03-2.877" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 3h24v17.599H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default UserGroupOutlined;
