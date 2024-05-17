import styled from 'styled-components';
import { Message as MessageType } from '../types';

const Wrapper = styled.div<{ $alignend: string }>`
    align-self: ${props => props.$alignend};
    max-width: 60%;
    background-color: ${({ theme }) => theme.colors.white + "4f"};
    box-sizing: border-box;
    padding: 8px 16px;

    border-radius: 20px;
    color: ${({ theme }) => theme.colors.white};

    & .time{
        font-size: ${({ theme }) => theme.font.sizes.md};
        color: ${({ theme }) => theme.colors.white + "7f"};
        text-align: right;
    }
`

type Props = {
    message: MessageType
}

export const Message = ({ message }: Props) => {

    const getTimeFormated = (time: number) => {
        const now = new Date().getTime();
        if (now - time > 24 * 60 * 60 * 1000) {
            return new Date(time).toLocaleDateString()
        }
        return new Date(time).toLocaleTimeString()
    }

    return (
        <Wrapper $alignend={message.isUserMessage ? 'flex-end' : 'flex-start'}>
            <div className='message'>{message.message}</div>
            <div className='time'>{getTimeFormated(message.date)}</div>
        </Wrapper>
    )
}
