import { CongressRoomInfoItem } from '@src/queries/congress/useGetCongressRoomListQuery';

/**
 * 회의실 편집용 아이템 타입
 */
export interface editCongressRoomItem extends CongressRoomInfoItem {
  tempRoomId?: number;
}
