export interface TokenUtilityProps {
  prefix?: string;
  colors: { [key in string]: string };
  spacing: { [key in string]: string };
  font: { family: string[]; sizes: { [key in string]: string } };
  leading: { [key in string]: string };
}
