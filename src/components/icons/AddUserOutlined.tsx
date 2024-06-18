import React, { FC } from 'react';
import { IconProps } from './types';

const AddUserOutlined: FC<IconProps> = (props) => {
  const { width, height } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
      <g fill="#242C33" clipPath="url(#a)">
        <path d="M2.27 22.999c-.42-.11-.834-.23-1.195-.494A2.65 2.65 0 0 1 .064 19.79c.485-2.166 1.508-4.036 3.078-5.601a10.95 10.95 0 0 1 4.09-2.575l.258-.096c-1.519-1.22-2.33-2.773-2.332-4.698-.003-1.596.584-2.98 1.712-4.111 2.272-2.277 5.904-2.273 8.238-.02 2.203 2.127 2.582 6.363-.58 8.821.404.168.808.327 1.205.503.403.179.61.563.532.952-.11.55-.649.832-1.186.633-.583-.215-1.157-.469-1.756-.62-2.299-.58-4.517-.323-6.63.753-1.829.933-3.205 2.333-4.147 4.155a9 9 0 0 0-.812 2.32.874.874 0 0 0 .729 1.056c.105.018.214.019.32.019q5.125 0 10.249.003c.155 0 .32.01.463.063.339.127.521.392.546.753a.845.845 0 0 1-.489.815q-.096.044-.194.085H2.271zM15.12 6.835c-.004-2.273-1.867-4.129-4.134-4.12-2.273.007-4.127 1.872-4.116 4.14.011 2.3 1.869 4.111 4.21 4.107 2.197-.004 4.046-1.893 4.041-4.127" />
        <path d="M17.743 23c-.513-.175-.709-.54-.693-1.073.021-.707.006-1.416.006-2.15h-.242l-2.042-.001c-.55-.002-.933-.352-.938-.85-.006-.506.381-.866.94-.868.75-.002 1.502 0 2.282 0v-.24q-.002-1.02 0-2.042c.002-.558.363-.946.869-.94.498.005.848.39.85.938.002.752 0 1.503 0 2.284h.238c.638 0 1.276.016 1.912-.005.533-.018.898.178 1.073.692v.345c-.175.513-.54.71-1.072.692-.636-.021-1.274-.005-1.911-.005h-.24c0 .737-.016 1.445.005 2.152.017.532-.18.897-.692 1.072h-.344z" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 1h21.998v22H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default AddUserOutlined;
