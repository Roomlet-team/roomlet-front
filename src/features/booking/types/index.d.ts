export type TimeItemType = { name: string; value: string };

type AutoCompleteItemKeyName = 'id' | 'name'; // 컬럼 이름

export type AutoCompleteItemInfo = {
  [key in AutoCompleteItemKeyName]?: {
    dataName: string; // 서버에서 전달받은 데이터에서 로드할 값
    render?: (value: any, itemData?) => React.ReactChild | React.ReactChild[] | string; // 데이터를 가공하거나 별도의 스타일을 적용시킬 떄 사용, value는 해당 key의 데이터, itemData는 해당 key의 데이터
  };
};
