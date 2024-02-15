import React from 'react';
import stylex from '@stylexjs/stylex';
import GnbNavLayout from '@src/layouts/GnbNavLayout';

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

  return (
    <GnbNavLayout>
      <div {...stylex.props(styles.base)}>Hello, Next.js</div>
    </GnbNavLayout>
  );
};

export default Home;
