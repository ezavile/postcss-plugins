export const kebabCase = (str: string): string =>
  str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
    .toLowerCase();

export type Appearance = 'solid' | 'outline' | 'stroke' | 'flat';

export const getAppearances = (
  color: string
): {
  [key in Appearance]: {
    initial: { [key in string]: string };
    hover: { [key in string]: string };
  };
} => {
  const blackness = `color-mod(${color} blackness(35%))`;

  return {
    solid: {
      initial: {
        backgroundColor: color,
      },
      hover: {
        backgroundColor: blackness,
      },
    },
    outline: {
      initial: {
        backgroundColor: 'transparent',
        borderColor: color,
        color: color,
      },
      hover: {
        backgroundColor: color,
        color: '#fff',
      },
    },
    stroke: {
      initial: {
        backgroundColor: 'transparent',
        borderColor: color,
        color: color,
      },
      hover: {
        color: blackness,
        borderColor: blackness,
      },
    },
    flat: {
      initial: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: color,
      },
      hover: {
        color: blackness,
      },
    },
  };
};
