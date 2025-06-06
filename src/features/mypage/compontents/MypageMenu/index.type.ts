export type MenuListType = {
  id: number;
  name: string;
  icon: React.JSX.Element;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  onClick?: (e: React.MouseEvent) => void;
}[];
