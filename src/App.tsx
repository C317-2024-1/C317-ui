import { useState } from "react"
import { ChatBox, Message } from "./components"
import { Background, Container } from "./styles"

const exampleMessages = [
  {
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec. ",
    time: 1713462557427,
    isUserMessage: true, 
  },
  {
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec. ",
    time: 1713462591488,
    isUserMessage: false, 
  },
  {
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    time: 1713462609252,
    isUserMessage: true, 
  },
]

function App() {
  const [messages, setMessages] = useState(exampleMessages)

  const addNewMessage = (message: string) => {
    setMessages([...messages, {
      message,
      time: new Date().getTime(),
      isUserMessage: true,
    }])
  }

  return (
    <Background>
      <Container>
        {messages.sort((a, b)=>a.time-b.time).map((msg, index) => (
          <Message message={msg} key={index}></Message>
        ))}
        <ChatBox sendFunction={addNewMessage}></ChatBox>
      </Container>
    </Background>
  )
}

export default App
