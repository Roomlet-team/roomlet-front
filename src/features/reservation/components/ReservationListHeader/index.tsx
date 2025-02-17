import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import FilterOutlined from '@src/components/icons/FilterOutlined';
import useRenderModal from '@src/hooks/ui/useRenderModal';
import ReservationFilter from '../ReservationFilter';

interface ReservationListHeaderProps {
  totalCount: number;
}

const ReservationListHeader: FC<ReservationListHeaderProps> = ({ totalCount }) => {
  const { renderModal } = useRenderModal();

  const handleClickFilter = () => {
    renderModal(ReservationFilter, null);
  };

  return (
    <div {...stylex.props(Styles.countAndFilterContent)}>
      <p {...stylex.props(Styles.totalCountText)}>
        총 <span {...stylex.props(Styles.totalCountTextEmphasis)}>{totalCount}</span>건의 회의가 있어요
      </p>
      <button type="button" onClick={handleClickFilter}>
        <FilterOutlined width={48} height={48} />
      </button>
    </div>
  );
};

export default ReservationListHeader;

const Styles = stylex.create({
  countAndFilterContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  totalCountText: {
    fontSize: '1.8rem',
    lineHeight: '2.6rem',
    fontWeight: 600,
    color: '#333333',
  },
  totalCountTextEmphasis: {
    color: 'var(--Red-300)',
  },
});
