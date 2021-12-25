module.exports = {
  mode: 'jit',

  theme: {
    boxShadow: {
      card: '0 2px 5px rgba(204, 204, 204, 1)',
    },
    borderColor: () => ({
      card: '#e2e2e2',
    }),
    borderWidth: {
      1: '1px',
    },
    fontSize: {
      reaction: [
        '42px',
        {
          letterSpacing: '-0.01em',
        },
      ],
      date: [
        '0.9rem',
        {
          letterSpacing: '-0.01em',
        },
      ],
    },
  },

  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },

  purge: ['./client/**/*.vue'],
}
