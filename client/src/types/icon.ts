export type IconName =
  | "sun" | "moon" | "plus" | "search" | "trash"
  | "edit" | "download" | "x" | "eye" | "logout"
  | "chevL" | "chevR" | "check" | "user" | "leads";

export interface IconProps {
  name: IconName;
  className?: string;
}
