import { UIStore } from '@/store/ui/slice';
import { darken } from '@mui/system';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    outline: none;
    font-family: "Helvetica Neue", Helvetica, "Noto Sans", sans-serif;

    &::selection {
      background-color: ${({ theme }) => theme.palette.primary.dark};
      color: ${({ theme }) => theme.palette.primary.contrastText};
    }

    &::-webkit-scrollbar {
      height: 4px;
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background-color: ${({ theme }) =>
        darken(theme.palette.background.default, 0.2)};
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) =>
        darken(theme.palette.primary.dark, 0.4)};
      border-radius: 0.6rem;
    }
  }

  body {
    #__next {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      max-width: 100vw;

      align-items: stretch;
      justify-content: stretch;

      background-color: ${({ theme }) => theme.palette.background.default};
      color: ${({ theme }) => theme.palette.text.primary};
    }
  }

  button {
    cursor: pointer;
  }

  /** Used to define container behavior: width, position: fixed etc... **/
  .Toastify__toast {
    background-color: ${({ theme }) =>
      theme.palette.mode === UIStore.ThemeMode.Light ? '#f1f2f7' : '#171717'};
    color: ${({ theme }) => theme.palette.text.primary};
    box-shadow: ${({ theme }) => theme.shadows[6]};

    .Toastify__close-button {
      color: ${({ theme }) => theme.palette.text.primary};
    }
  }

  .Toastify__toast--info {
    .Toastify__progress-bar--info {
      background-color: ${({ theme }) =>
        theme.palette.info[theme.palette.mode]};
    }

    .Toastify__toast-icon > svg {
      fill: ${({ theme }) => theme.palette.info[theme.palette.mode]};
    }
  }

  .Toastify__toast--success {
    .Toastify__progress-bar--success {
      background-color: ${({ theme }) =>
        theme.palette.success[theme.palette.mode]};
    }

    .Toastify__toast-icon > svg {
      fill: ${({ theme }) => theme.palette.success[theme.palette.mode]};
    }
  }

  .Toastify__toast--warning {
    .Toastify__progress-bar--warning {
      background-color: ${({ theme }) =>
        theme.palette.warning[theme.palette.mode]};
    }

    .Toastify__toast-icon > svg {
      fill: ${({ theme }) => theme.palette.warning[theme.palette.mode]};
    }
  }

  .Toastify__toast--error {
    .Toastify__progress-bar--error {
      background-color: ${({ theme }) =>
        theme.palette.error[theme.palette.mode]};
    }

    .Toastify__toast-icon > svg {
      fill: ${({ theme }) => theme.palette.error[theme.palette.mode]};
    }
  }
`;

export default GlobalStyle;
