import styled, { css } from "styled-components"

export const Background = styled.div`
    width: 100vw;
    height: 100dvh;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.black});

    display: grid;
    place-content: center;
`

const containerStyles = css`
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.white + "4f"}, ${({ theme }) => theme.colors.white + "0F"});
    border-radius: 35px;
    box-sizing: border-box;
`

export const Container = styled.div`
    ${containerStyles}

    width: ${({ theme }) => theme.width.lg};
    height: 90dvh;
    padding: 20px;

    display: flex;
    flex-direction: column;
    justify-content: end;
    gap: ${({ theme }) => theme.font.sizes.xl};


    ${({ theme }) => theme.media.lg} {
        width: ${({ theme }) => theme.width.md};
    }

    ${({ theme }) => theme.media.md} {
        width: ${({ theme }) => theme.width.sm};
    }

    ${({ theme }) => theme.media.sm} {
        width: ${({ theme }) => theme.width.xs};
        height: 100dvh;
        border-radius: 0;
    }
`

export const AuthContainer = styled.form`
    ${containerStyles}

    padding: 6em 3em;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: ${({ theme }) => theme.font.sizes.xl};

    ${({ theme }) => theme.media.sm} {
        width: ${({ theme }) => theme.width.xs};
        height: 100dvh;
        border-radius: 0;
    }
`

export const Input = styled.input`
    width: clamp(320px, 20vw, 400px);
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    &::placeholder{
        color: ${({ theme }) => theme.colors.white + "9f"};
    }
    font-size: ${({ theme }) => theme.font.sizes.md};
    box-sizing: border-box;
`

export const LoginButton = styled.button`
    cursor: pointer;
    width: clamp(160px, 10vw, 200px);
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};

    font-size: ${({ theme }) => theme.font.sizes.md};
    box-sizing: border-box;

    &:hover{
        background-color: ${({ theme }) => theme.colors.white + "2f"};
    }
`

export const SignUpButton = styled.button`
    width: clamp(320px, 20vw, 400px);
    padding: 10px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.white + "4f"};
    font-size: ${({ theme }) => theme.font.sizes.md};
    box-sizing: border-box;

    &:hover{
        text-decoration: underline;
        color: ${({ theme }) => theme.colors.white};
    }
`