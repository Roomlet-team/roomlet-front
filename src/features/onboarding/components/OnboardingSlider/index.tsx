import React, { useRef, useState } from 'react';
import MainLayout from '@src/layouts/MainLayout';
import stylex from '@stylexjs/stylex';
import { useRouter } from 'next/router';
import Slider from 'react-slick';

const OnboardingSlider = () => {
  const router = useRouter();
  const [dotIndex, setDotIndex] = useState<number>(0);
  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    arrows: false,
    fade: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      setDotIndex(next);
    },
  };

  const onboardingList = [
    {
      id: 1,
      imgUrl: 'https://roomlet-front.s3.ap-northeast-2.amazonaws.com/public/images/onboarding/CALENDAR.png',
      name: 'onboarding_01',
      title: '실시간 회의실 예약',
      description: (
        <>
          몇 번의 클릭 만으로
          <br />
          회의실을 예약하고 취소할 수 있습니다.
          <br />
          회의실 예약에 필요한 모든 정보를 제공합니다.
        </>
      ),
    },
    {
      id: 2,
      imgUrl: 'https://roomlet-front.s3.ap-northeast-2.amazonaws.com/public/images/onboarding/PICTURES.png',
      name: 'onboarding_02',
      title: '스케쥴 관리 간소화',
      description: (
        <>
          중복 예약과 일정 충돌을 피하며,
          <br />
          프로젝트의 기한을 준수할 수 있게 도와줍니다.
          <br />
          더이상 복잡한 스케쥴 조율에 시간을 낭비하지 마세요!
        </>
      ),
    },
    {
      id: 3,
      imgUrl: 'https://roomlet-front.s3.ap-northeast-2.amazonaws.com/public/images/onboarding/CLOCK.png',
      name: 'onboarding_03',
      title: '효율적인 회의 관리',
      description: (
        <>
          회의 진행부터 회고까지 한번에 관리할 수 있습니다.
          <br />
          룸렛을 이용해 회의시간을 줄이고,
          <br />
          {'더 효율적으로 업무에 집중해보세요! >_<//'}
        </>
      ),
    },
  ];

  const handleChangeDotIndex = (idx) => {
    setDotIndex(idx);
  };

  const handleClickSkip = () => {
    sliderRef.current.slickGoTo(2);
  };

  const handleClickRunMeeting = () => {
    router.push('/login');
  };

  return (
    <div className="onboading" {...stylex.props(SliderStyles.container)}>
      <ul {...stylex.props(SliderStyles.dotList)}>
        {onboardingList.map((_, idx) => (
          <li>
            <button type="button" {...stylex.props(SliderStyles.dotButton(idx === dotIndex))} />
          </li>
        ))}
      </ul>
      <Slider {...settings} ref={sliderRef}>
        {onboardingList.map((item, idx) => (
          <div key={item.id}>
            <div {...stylex.props(SliderStyles.slideContent)}>
              <div {...stylex.props(SliderStyles.imgContent)}>
                <img {...stylex.props(SliderStyles.img)} src={item.imgUrl} alt={item.name} />
              </div>
              <div {...stylex.props(SliderStyles.textContent)}>
                <p {...stylex.props(SliderStyles.title)}>{item.title}</p>
                <p {...stylex.props(SliderStyles.description)}>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div {...stylex.props(SliderStyles.buttonContent)}>
        <button
          {...stylex.props(SliderStyles.button)}
          onClick={dotIndex < onboardingList.length - 1 ? handleClickSkip : handleClickRunMeeting}
          type="button"
        >
          {dotIndex < onboardingList.length - 1 ? 'Skip' : '회의 진행하기'}
        </button>
      </div>
    </div>
  );
};

export default OnboardingSlider;

const SliderStyles = stylex.create({
  container: {
    position: 'relative',
  },
  dotList: {
    margin: 0,
    padding: 0,
    position: 'absolute',
    top: '24px',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    display: 'flex',
    gap: '4px',
    listStyle: 'none',
    zIndex: 3,
  },
  dotButton: (isActivate) => ({
    width: isActivate ? '26px' : '6px',
    height: '6px',
    padding: 0,
    borderRadius: isActivate ? '20px' : '50%',
    background: isActivate ? 'var(--Base-White)' : '#6A7681',
    border: 'none',
  }),
  slideContent: {
    width: '100%',
    height: '100vh',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'justify-content',
    background: 'var(--gradient-01)',
  },
  imgContent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    maxWidth: '304px',
    maxHeight: '304px',
    width: '100%',
    height: '100%',
  },
  textContent: {
    width: '100%',
    padding: '46px 35px 140px',
    background: 'var( --Base-White)',
    borderRadius: '16px 16px  0 0',
  },
  title: {
    marginBottom: '24px',
    fontSize: '3.2rem',
    fontWeight: 700,
    lineHeight: '4rem',
    textAlign: 'center',
  },
  description: {
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: 400,
    textAlign: 'center',
  },
  buttonContent: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    bottom: '48px',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 2,
  },
  button: {
    marginTop: '54px',
    padding: '12px 44px',
    background: '#4A4A4A',
    color: 'var(--Base-White)',
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: 500,
    textAlign: 'center',
    border: 'none',
    borderRadius: '20px',
  },
});
