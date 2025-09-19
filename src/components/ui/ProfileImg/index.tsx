import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import { s3ImgUrlConfig } from '@src/config';

interface ProfileImgProps extends React.ImgHTMLAttributes<Omit<HTMLImageElement, 'src'>> {
  size: number;
  imgKey: string;
  borderProperties?: {
    width?: string;
    color?: string;
    radius?: string;
  };
}

/**
 * 프로필 이미지를 보여주는 컴포넌트
 * @params imgKey 이미지 S3 키
 * @params size 이미지 크기
 * @params borderProperties border를 적용할 경우 border의 스타일
 */
const ProfileImg: FC<ProfileImgProps> = (props) => {
  const { imgKey, size, borderProperties } = props;

  return (
    <img
      {...stylex.props(Styles.img(size, borderProperties))}
      src={imgKey ? `${process.env.NEXT_PUBLIC_S3_URL}/${imgKey}` : s3ImgUrlConfig.defaultProfile}
    />
  );
};

export default ProfileImg;

const Styles = stylex.create({
  img: (size, borderProperties) => ({
    width: `${size}px`,
    height: `${size}px`,
    objectFit: 'cover',
    objectPosition: 'center',
    flexShrink: 0,
    borderWidth: borderProperties?.width,
    borderRadius: borderProperties?.radius || '50%',
    borderColor: borderProperties?.color,
    borderStyle: borderProperties?.width ? 'solid' : null,
  }),
});
