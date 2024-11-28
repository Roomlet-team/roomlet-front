export type MenuListType = {
  id: number;
  name: string;
  icon: React.JSX.Element;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
}[];
