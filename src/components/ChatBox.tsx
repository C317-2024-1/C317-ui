import { useEffect, useRef, useState } from 'react'
import { ReactSVG } from 'react-svg'
import { Tooltip } from 'react-tooltip'
import styled, { useTheme } from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white + "4f"};
  border-radius: 25px;
  padding: 10px 10px;
`

const Input = styled.textarea`
  width: 90%;
  background-color: transparent;
  padding: 0 15px;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  font-size:  ${({ theme }) => theme.font.sizes.lg};
  border-radius: ${({ theme }) => theme.font.sizes.lg};
  resize: none;
  
  &::placeholder{
    color: ${({ theme }) => theme.colors.white};
  font-size:  ${({ theme }) => theme.font.sizes.lg};
  }

  &:active, &:focus{
    outline: none;
  }
`

const SendButton = styled.button`
  width: 50px;
  aspect-ratio: 1;
  background-color: transparent;
  border: none;
  display: grid;
  place-content: center;
  align-self: end;
  cursor: pointer;

  & svg, & path{
    width:100%;
    height:100%;
    fill: ${({ theme }) => theme.colors.primary};
  }

  &:hover{
    background-color: ${({ theme }) => theme.colors.white + "4f"};
    border-radius: 50%;
  
  }
`

type Props = {
  sendFunction: (message: string) => void
}

export const ChatBox = ({ sendFunction }: Props) => {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const theme = useTheme()

  useEffect(() => {
    const ref = textareaRef.current
    if (!ref) return
    ref.style.height = "auto"
    ref.style.height = Math.min(ref.scrollHeight, 10 * parseInt(theme.font.sizes.lg.replaceAll(/\D/g, ""))) + "px"
  }, [message])

  const sendMessage = () => {
    if (message === "") return
    sendFunction(message)
    setMessage("")
  }

  return (
    <Wrapper>
      <Input value={message} ref={textareaRef} rows={1} onChange={(event) => setMessage(event.target.value)} placeholder='Digite uma pergunta' />
      <SendButton data-tooltip-id="sendButton" onClick={sendMessage}>
        <ReactSVG src="/arrow.svg" />
      </SendButton>
      <Tooltip
        id="sendButton"
        place="bottom"
        content="Enviar"
      />
    </Wrapper>
  )
}
