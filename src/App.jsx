import { useState } from 'react'
import InstagramPassFinder from './insta'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <InstagramPassFinder/>
    </>
  )
}

export default App
