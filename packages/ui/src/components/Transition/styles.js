
const defaultTransition = 'all 150ms ease-out';
const sharpTransition = 'all 150ms cubic-bezier(.32,1.03,.53,1.37)';

module.exports = {
  '.transition': {
    overflow: 'hidden',

    '&--fade': {
      '&-enter': {
        opacity: '0.01',
      },
      '&-enter-active': {
        opacity: '1',
        transition: defaultTransition,
      },
      '&-exit': {
        opacity: '1',
      },
      '&-exit-active': {
        opacity: '0.01',
        transition: defaultTransition,
      },
    },

    '&--fade-down': {
      '&-enter': {
        opacity: '0.01',
        transform: 'translateY(-1.25rem)',
      },
      '&-enter-active': {
        opacity: '1',
        transform: 'translateY(0)',
        transition: defaultTransition,
      },
      '&-exit': {
        opacity: '1',
        transform: 'translateY(0)',
      },
      '&-exit-active': {
        opacity: '0.01',
        transform: 'translateY(1.25rem)',
        transition: defaultTransition,
      },
    },

    '&--fade-up': {
      '&-enter': {
        opacity: '0.01',
        transform: 'translateY(1.25rem)',
      },
      '&-enter-active': {
        opacity: '1',
        transform: 'translateY(0)',
        transition: defaultTransition,
      },
      '&-exit': {
        opacity: '1',
        transform: 'translateY(0)',
      },
      '&-exit-active': {
        opacity: '0.01',
        transform: 'translateY(-1.25rem)',
        transition: defaultTransition,
      },
    },

    '&--fade-drop': {
      '&-enter': {
        opacity: '0.01',
        transform: 'translateY(-1.25rem)',
      },
      '&-enter-active': {
        opacity: '1',
        transform: 'translateY(0)',
        transition: sharpTransition,
      },
      '&-exit': {
        opacity: '1',
        transform: 'translateY(0)',
      },
      '&-exit-active': {
        opacity: '0.01',
        transform: 'translateY(1.25rem)',
        transition: sharpTransition,
      },
    },

    '&--down': {
      '&-enter': {
        transform: 'translateY(-1.25rem)',
      },
      '&-enter-active': {
        transform: 'translateY(0)',
        transition: defaultTransition,
      },
      '&-exit': {
        transform: 'translateY(0)',
      },
      '&-exit-active': {
        transform: 'translateY(1.25rem)',
        transition: defaultTransition,
      },
    },

    '&--up': {
      '&-enter': {
        transform: 'translateY(1.25rem)',
      },
      '&-enter-active': {
        transform: 'translateY(0)',
        transition: defaultTransition,
      },
      '&-exit': {
        transform: 'translateY(0)',
      },
      '&-exit-active': {
        transform: 'translateY(-1.25rem)',
        transition: defaultTransition,
      },
    },

    '&--drop': {
      '&-enter': {
        transform: 'translateY(-1.25rem)',
      },
      '&-enter-active': {
        transform: 'translateY(0)',
        transition: sharpTransition,
      },
      '&-exit': {
        transform: 'translateY(0)',
      },
      '&-exit-active': {
        transform: 'translateY(1.25rem)',
        transition: sharpTransition,
      },
    },

    '&--update': {

      '&-fade': {
        animation: 'TransitionFade 200ms ease-out',
        '@keyframes TransitionFade': {
          '0%': { opacity: '1' },
          '50%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },

      '&-fade-down': {
        animation: 'TransitionFadeDown 200ms ease-out',
        '@keyframes TransitionFadeDown': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '50%': { opacity: '0', transform: 'translateY(1.25rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      '&-fade-up': {
        animation: 'TransitionFadeUp 200ms ease-out',
        '@keyframes TransitionFadeUp': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '50%': { opacity: '0', transform: 'translateY(-1.25rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      '&-down': {
        animation: 'TransitionDown 200ms ease-out',
        '@keyframes TransitionDown': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(1.25rem)' },
          '100%': { transform: 'translateY(0)' },
        },
      },

      '&-up': {
        animation: 'TransitionUp 200ms ease-out',
        '@keyframes TransitionUp': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-1.25rem)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
};