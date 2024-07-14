import React from 'react';
import stylex from '@stylexjs/stylex';
import { colors } from '../../../../public/styles/vars.stylex';

/**
 * 경계선 공통 컴포넌트
 */
const BoundaryArea = () => {
  return <div {...stylex.props(Styles.BoundaryArea)} />;
};

export default BoundaryArea;

const Styles = stylex.create({
  BoundaryArea: {
    width: '100%',
    height: '8px',
    background: '#F2F2F2',
    borderTop: `1px solid ${colors.gray30}`,
  },
});
