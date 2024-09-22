import React, { FC, ReactElement } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactElement | string | number;
};

const Portal: FC<PortalProps> = (props) => {
  const { children } = props;

  return createPortal(children, document.body);
};

export default Portal;
