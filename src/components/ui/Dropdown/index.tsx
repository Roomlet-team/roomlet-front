import React, { FC, useState } from 'react';
import EllipsisOutlined from '@src/components/icons/EllipsisOutlined';
import stylex from '@stylexjs/stylex';
import { colors } from '../../../../public/styles/vars.stylex';

interface DropdownProps {
  menuList: {
    id: string;
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
  }[];
}

const Dropdown: FC<DropdownProps> = (props) => {
  const { menuList } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleClickDropdown = () => {
    setIsOpen(!isOpen);
  };

  /**
   * 메뉴 클릭 시 실행되는 함수
   * - 메뉴 클릭 시 모달 닫기
   * @param func 클릭 시 실행되는 함수
   * @returns 없음.
   */
  const handleClickItem = (func: () => void) => async () => {
    await new Promise((resolve) => {
      func();
      resolve(true);
    });
    setIsOpen(false);
  };

  return (
    <>
      <div {...stylex.props(Styles.dropdownContainer)}>
        {/* 드롭박스 */}
        <button type="button" onClick={handleClickDropdown}>
          <EllipsisOutlined width={24} height={24} />
        </button>
        {isOpen && (
          <>
            {/* 뒷배경 */}
            <div {...stylex.props(Styles.dropdownBackground)} onClick={handleClickDropdown} />

            {/* 드롭박스 메뉴 */}
            <div {...stylex.props(Styles.dropdownMenuContainer)}>
              {menuList.map((menu, idx) => (
                <button
                  type="button"
                  key={menu.id}
                  onClick={handleClickItem(menu.onClick)}
                  {...stylex.props(Styles.dropdownMenuButton, menuList.length - 1 === idx && Styles.lastMenuButton)}
                >
                  <span>{menu.label}</span>
                  {menu.icon}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dropdown;

const Styles = stylex.create({
  dropdownContainer: {
    position: 'relative',
  },
  dropdownBackground: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  dropdownMenuContainer: {
    position: 'absolute',
    width: '121px',
    top: '100%',
    right: '0',
    backgroundColor: colors.white500,
    border: `1px solid #eee`,
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 2,
  },
  dropdownMenuButton: {
    width: '100%',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: '400',
    color: '#333',
  },
  lastMenuButton: {
    borderTop: `1px solid #eee`,
  },
});
