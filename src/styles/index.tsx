import styled from "styled-components"

export const Background = styled.div`
    width: 100vw;
    height: 100dvh;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.black});

    display: grid;
    place-content: center;
`

export const Container = styled.div`
    width: ${({ theme }) => theme.width.lg};
    height: 90dvh;
    padding: 20px;

    border-radius: 35px;
    box-sizing: border-box;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.white+"4f"}, ${({ theme }) => theme.colors.white+"0F"});

    display: flex;
    flex-direction: column;
    justify-content: end;
    gap: ${({theme})=>theme.font.sizes.xl};


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