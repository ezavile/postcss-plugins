export const SIZES = {
  sm: {
    padding: '0.25rem 0.5rem',
    fontSize: '0.75rem',
    lineHeight: '1.25rem',
  },
  md: {
    padding: '0.375rem 0.75rem',
    fontSize: '0.875rem',
    lineHeight: '1.5rem',
  },
  lg: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    lineHeight: '1.75rem',
  },
};

export const RADIUS = {
  sm: '0.125rem',
  md: '0.25rem',
  lg: '0.375rem',
  rounded: '9999px',
};

export const BASE = {
  border: '1px solid transparent',
  borderRadius: RADIUS.md,
  color: '#fff',
  cursor: 'pointer',
  display: 'inline-block',
  textAlign: 'center',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  userSelect: 'none',
  ...SIZES.md,
};
