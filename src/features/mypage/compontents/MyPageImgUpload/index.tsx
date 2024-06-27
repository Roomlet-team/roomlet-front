import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import ProfileImg from '@src/components/ui/ProfileImg';

type MyPageImgUploadProps = {
  onSelect: () => void;
};

const MyPageImgUpload: FC<MyPageImgUploadProps> = (props) => {
  const { onSelect } = props;

  return (
    <div {...stylex.props(Styles.Container)}>
      <ProfileImg src={null} size={68} />
    </div>
  );
};

export default MyPageImgUpload;

const Styles = stylex.create({
  Container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    margin: '24px 0',
  },
});
