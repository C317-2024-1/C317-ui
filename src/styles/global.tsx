import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          'Helvetica Neue', Arial, sans-serif;
      }

    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${({theme})=>theme.colors.primary}7f;
        border-radius: 10px; 
    }

    ::-webkit-scrollbar-track {
        background-color: ${({theme})=>theme.colors.white}4F;
        border-radius: 10px;
    }
`;

export default GlobalStyle;