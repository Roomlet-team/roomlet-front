import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import ProfileImg from '@src/components/ui/ProfileImg';
import PhotoFilled from '@src/components/icons/PhotoFilled';

type MyPageImgUploadProps = {
  onSelect: () => void;
};

/**
 * 마이페이지용 이미지 업로드 컴포넌트
 * @param onSelect 선택한 값
 */
const MyPageImgUpload: FC<MyPageImgUploadProps> = (props) => {
  const { onSelect } = props;

  return (
    <div {...stylex.props(Styles.Container)}>
      <div {...stylex.props(Styles.ImgContainer)}>
        <ProfileImg src={null} size={68} />
        <div {...stylex.props(Styles.IconWrapper)}>
          <PhotoFilled width={24} height={24} />
        </div>
      </div>
    </div>
  );
};

export default MyPageImgUpload;

const Styles = stylex.create({
  Container: {
    display: 'flex',
  },
  ImgContainer: {
    position: 'relative',
  },
  IconWrapper: {
    position: 'absolute',
    height: '24px',
    right: 0,
    bottom: 0,
  },
});
