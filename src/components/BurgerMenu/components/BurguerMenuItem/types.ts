export interface IBurguerMenuItemProps
  extends React.ComponentPropsWithoutRef<'a'> {
  label: string;
  icon?: React.ReactNode;
  link?: string;
  openExternal?: boolean;
  onClick?: () => void;
}
