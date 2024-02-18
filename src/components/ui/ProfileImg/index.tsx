import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import { s3ImgUrlConfig } from '@src/config';

type ProfileImgProps = {
  src: string;
  size: number;
  borderProperties?: {
    width?: string;
    color?: string;
    radius?: string;
  };
};

/**
 * 프로필 이미지를 보여주는 컴포넌트
 * @params src 이미지 주소
 * @params size 이미지 크기
 * @params borderProperties border를 적용할 경우 border의 스타일
 */
const ProfileImg: FC<ProfileImgProps> = (props) => {
  const { src, size, borderProperties } = props;

  return <img {...stylex.props(Styles.img(size, borderProperties))} src={src || s3ImgUrlConfig.defaultProfile} />;
};

export default ProfileImg;

const Styles = stylex.create({
  img: (size, borderProperties) => ({
    width: `${size}px`,
    height: `${size}px`,
    backgroundSize: 'cover',
    borderWidth: borderProperties?.width,
    borderRadius: borderProperties?.radius,
    borderColor: borderProperties?.color,
    borderStyle: borderProperties?.width ? 'solid' : null,
  }),
});
