import { TeamInfoItem } from '@src/queries/team/useGetTeamListQuery';

/**
 * 팀 편집용 아이템 타입
 */
export interface EditTeamItem extends TeamInfoItem {
  tempTeamId?: number;
}
