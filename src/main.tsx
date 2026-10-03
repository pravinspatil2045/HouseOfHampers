import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import { IconContext } from '@phosphor-icons/react'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/dm-sans'
import App from './App'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <IconContext.Provider value={{ size: 22, weight: 'regular' }}>
        <App />
      </IconContext.Provider>
    </MotionConfig>
  </StrictMode>,
)
