export interface ButtonBuilderProps {
  prefix?: string;
  colors: { [key in string]: string };
  base?: { [key in string]: string };
  sizes?: { [key in string]: { [key in string]: string } };
  radius?: { [key in string]: string };
}
