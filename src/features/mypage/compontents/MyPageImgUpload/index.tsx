import React, { FC, useRef, useState } from 'react';
import stylex from '@stylexjs/stylex';
import ProfileImg from '@src/components/ui/ProfileImg';
import PhotoFilled from '@src/components/icons/PhotoFilled';

type MyPageImgUploadProps = {
  onSelect: (file: Blob) => void;
  initialImgUrl: string;
};

/**
 * 마이페이지용 이미지 업로드 컴포넌트
 * @param onSelect 선택한 값
 */
const MyPageImgUpload: FC<MyPageImgUploadProps> = (props) => {
  const { onSelect, initialImgUrl } = props;

  const [profileImg, setProfileImg] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string | null>(initialImgUrl);
  const imageUploadRef = useRef(null);

  const handleClickImgUpload = () => {
    imageUploadRef.current.click();
  };

  const handleLoadFile = (e) => {
    const file = e.target.files;
    const fileType = file['0']?.type;
    const fileSize = file['0']?.size && file['0'].size;
    const limitSize = 5 * 1024 ** 2; // 파일 용량 제한은 5MB

    if (!file['0']) {
      return false;
    }
    if (fileType === 'image/jpeg' || fileType === 'image/jpg' || fileType === 'image/png') {
      if (fileSize > limitSize) {
        alert('파일 사이즈가 5MB를 초과합니다.');
      } else {
        const reader = new FileReader();

        reader.onload = () => setImgUrl(reader.result as string); // string 타입의 base64 형식
        reader.readAsDataURL(file['0']);
        setProfileImg(file);
        onSelect(file['0']);
      }
    } else {
      alert('이미지 파일만 등록이 가능합니다.');
    }

    return null;
  };

  const handleImgInit = (e) => {
    e.currentTarget.value = null;
  };

  return (
    <div {...stylex.props(Styles.Container)}>
      <div {...stylex.props(Styles.ImgContainer)}>
        {/* [ ] src 타입 수정하기 */}
        <ProfileImg src={imgUrl} size={68} />
        <input
          type="file"
          style={{ display: 'none' }}
          accept=".png, .jpg, .jpeg"
          ref={imageUploadRef}
          onChange={handleLoadFile}
          onClick={handleImgInit}
        />
        <button type="button" onClick={handleClickImgUpload} {...stylex.props(Styles.IconWrapper)}>
          <PhotoFilled width={24} height={24} />
        </button>
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
