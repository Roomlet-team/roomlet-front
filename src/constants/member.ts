export const MEMBER_ROLE_KOREAN_LABELS = {
  owner: '최고 관리자',
  admin: '중간 관리자',
  member: '멤버',
} as const;

export type MemberKoreanRoleLabel = (typeof MEMBER_ROLE_KOREAN_LABELS)[keyof typeof MEMBER_ROLE_KOREAN_LABELS];
