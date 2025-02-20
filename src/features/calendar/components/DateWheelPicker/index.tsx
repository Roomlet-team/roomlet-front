import Modal from '@src/components/ui/Modal';
import React, { FC, useState } from 'react';
import stylex from '@stylexjs/stylex';
import dayjs from 'dayjs';
import Picker from 'react-mobile-picker';
import { colors, Typography } from '../../../../../public/styles/vars.stylex';

type PickerType = { year: string; month: string; day: string };

interface DateWheelPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (date: PickerType) => void;
  defaultValue: PickerType;
}

const selections = {
  year: Array(50)
    .fill(2024)
    .map((value, index) => String(value + index)),
  month: Array(12)
    .fill(0)
    .map((_, index) => String(index + 1)),
  day: Array(31)
    .fill(0)
    .map((_, index) => String(index + 1)),
};

/**
 * Wheel 형태로 날짜를 선택하는 Picker
 */
const DateWheelPicker: FC<DateWheelPickerProps> = (props) => {
  const { isOpen, onClose, onSelect, defaultValue } = props;
  console.log({ defaultValue }, dayjs(`${defaultValue.year}.${defaultValue.month}.${defaultValue.day}}`));
  const todayDate = dayjs(`${defaultValue.year}-${defaultValue.month}-${defaultValue.day}`).format(
    'YYYY년 M월 D일 ddd요일'
  );
  const [pickerValue, setPickerValue] = useState({
    year: `${defaultValue.year}`,
    month: `${defaultValue.month}`,
    day: `${defaultValue.day}`,
  });

  const handleChangePicker = (data) => {
    setPickerValue(data);
  };

  const handleClickCancel = () => {
    onClose();
  };

  const handleClickOk = () => {
    onSelect(pickerValue);
    onClose();
  };

  return (
    <Modal isOpen={isOpen}>
      <div {...stylex.props(Styles.container)}>
        <div {...stylex.props(Typography.TextSmallMedium, Styles.selectDateWrapper)}>{todayDate}</div>
        <div {...stylex.props(Styles.pickerContainer)}>
          {/* 날짜 선택 Picker */}
          {Object.keys(selections).map((name) => (
            <Picker value={pickerValue} onChange={handleChangePicker} height={120} style={{ width: '55px' }}>
              <Picker.Column key={name} name={name}>
                {selections[name].map((option) => (
                  <Picker.Item key={option} value={option}>
                    {({ selected }) => (
                      // 선택된 아이템인지 체크하여 스타일 적용
                      <div
                        {...stylex.props(
                          Typography.TextSmallMedium,
                          selected ? Styles.selectedPickerItemWrapper : Styles.primaryPickerItemWrapper
                        )}
                      >
                        {option}
                      </div>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>
            </Picker>
          ))}
        </div>
        <div {...stylex.props(Styles.btnContainer)}>
          <button
            type="button"
            onClick={handleClickCancel}
            {...stylex.props(Styles.primaryBtn, Typography.TextSmallRegular, Styles.cancelBtn)}
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleClickOk}
            {...stylex.props(Styles.primaryBtn, Typography.TextSmallRegular)}
          >
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DateWheelPicker;

const Styles = stylex.create({
  container: {
    width: '312px',
    background: colors.white500,
    borderRadius: '4px',
    border: `1px solid ${colors.gray40}`,
  },
  selectDateWrapper: {
    color: colors.red500,
    borderBottom: `1px solid ${colors.red500}`,
    padding: '8px 16px',
    textAlign: 'center',
  },
  pickerContainer: {
    width: '181px',
    margin: '0 auto',
    padding: '0 32px',
    gap: '8px',
    display: 'flex',
  },
  selectedPickerItemWrapper: {
    color: colors.black400,
  },
  primaryPickerItemWrapper: {
    color: colors.gray40,
  },
  btnContainer: {
    display: 'flex',
    borderTop: `1px solid ${colors.gray40}`,
    borderRadius: '0 0 4px 4px',
  },
  primaryBtn: {
    width: '100%',
    padding: '12px 4px',
    borderRadius: '4px',
  },
  cancelBtn: {
    borderRight: `1px solid ${colors.gray40}`,
    borderRadius: '4px',
  },
});
