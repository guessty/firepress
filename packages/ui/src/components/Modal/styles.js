module.exports = {
  '.modal': {
    'z-index': '30',
    overflow: 'auto',
    position: 'fixed',
    display: 'none',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',

    '&__overlay': {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      'pointer-events': 'none',
      color: 'inherit',

      '&:before': {
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        'pointer-events': 'none',
        opacity: '0.75',
        'background-color': 'currentColor',
      },
    },

    '&__content': {
      width: '100%',
      'min-height': '100%',
      display: 'flex',
      'flex-direction': 'column',
      color: 'initial',
      'pointer-events': 'none',
    },

    '&__head': {
      'z-index': '10',
      left: '0',
      top: '0',
      width: '100%',
      'pointer-events': 'all',
    },

    '&__body': {
      position: 'relative',
      display: 'flex',
      'flex-direction': 'column',
      'flex-grow': '1',
      'align-items': 'center',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      height: '100%',
      'pointer-events': 'none',

      '& > *': {
        'pointer-events': 'all',
      },
    },

    '&--visible': {
      display: 'block',
    },
  },
};
