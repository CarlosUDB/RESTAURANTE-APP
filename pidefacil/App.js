import AppNavigation from '@navigation/AppNavigation'
import TabAppNavigation from '@navigation/TabAppNavigation'
import { UserProvider } from '@context/UserContext'

function App() {
  return (
    <UserProvider>
      <AppNavigation />
    </UserProvider>
  )
}

export default App