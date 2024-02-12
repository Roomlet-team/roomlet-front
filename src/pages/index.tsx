import React from 'react';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  base: {
    fontSize: 16,
    lineHeight: 1.5,
    color: 'red',
  },
  highlighted: {
    color: 'rebeccapurple',
  },
});

const Home = () => {
  console.log('');

  return <div {...stylex.props(styles.base)}>Hello, Next.js</div>;
};

export default Home;
