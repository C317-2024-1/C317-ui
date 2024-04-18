export const theme = {
    colors: {
        primary: "#4F008C",
        black: "#111",
        white: "#f2f2f2",

    },
    media: {
        xs: '@media screen and (max-width: 576px)',
        sm: '@media screen and (max-width: 768px)',
        md: '@media screen and (max-width: 992px)',
        lg: '@media screen and (max-width: 1200px)',
        xl: '@media screen and (max-width: 1400px)',
    },
    width: {
        xs: '100vw',
        sm: '672px',
        md: '896px',
        lg: '1080px',
        xl: '1320px',
    },
    font: {
        sizes: {
            xs: '10px',
            sm: '12px',
            md: '16px',
            lg: '20px',
            xl: '24px',
            xxl: '32px',
            xxxl: '40px',
        }
    }
}

type Theme = typeof theme;

declare module 'styled-components' {
    export interface DefaultTheme extends Theme { }
}