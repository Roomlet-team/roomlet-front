import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import { s3ImgUrlConfig } from '@src/config';
import CircleAdminFilled from '@src/components/icons/CircleAdminFilled';
import CircleOwnerFilled from '@src/components/icons/CircleOwnerFilled';
import { MemberRole } from '@src/shared/types/member';

interface ProfileImgProps extends React.ImgHTMLAttributes<Omit<HTMLImageElement, 'src'>> {
  size: number;
  imgKey: string;
  borderProperties?: {
    width?: string;
    color?: string;
    radius?: string;
  };
  role?: MemberRole;
}

/**
 * 프로필 이미지를 보여주는 컴포넌트
 * @params imgKey 이미지 S3 키
 * @params size 이미지 크기
 * @params borderProperties border를 적용할 경우 border의 스타일
 * @params role 멤버 권한 (owner : 최고 관리자, admin : 중간 관리자, member : 멤버)
 */
const ProfileImg: FC<ProfileImgProps> = (props) => {
  const { imgKey, size, borderProperties, role } = props;

  const roleIcon = {
    member: null,
    admin: <CircleAdminFilled width={20} height={20} />,
    owner: <CircleOwnerFilled width={20} height={20} />,
  };

  return (
    <div {...stylex.props(Styles.imgContainer)}>
      <img
        {...stylex.props(Styles.img(size, borderProperties))}
        src={imgKey ? `${process.env.NEXT_PUBLIC_S3_URL}/${imgKey}` : s3ImgUrlConfig.defaultProfile}
      />
      <div {...stylex.props(Styles.roleIconWrapper, borderProperties?.radius ? Styles.offsetPosition : null)}>
        {roleIcon[role]}
      </div>
    </div>
  );
};

export default ProfileImg;

const Styles = stylex.create({
  imgContainer: {
    position: 'relative',
    flexShrink: 0,
  },
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
  roleIconWrapper: {
    position: 'absolute',
    display: 'flex',
    bottom: '0',
    right: '0',
    flexShrink: 0,
    lineHeight: 1,
    height: 'fit-content',
  },
  offsetPosition: {
    bottom: '-2px',
    right: '-2px',
  },
});
