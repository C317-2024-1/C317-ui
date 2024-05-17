import { RouterProvider } from "react-router-dom"
import { Background } from "./styles"
import { router } from "./router"
import { UserProvider } from "./contexts/User"



function App() {
  return (
    <Background>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </Background>
  )
}

export default App
