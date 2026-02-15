import { KToast } from 'kku-ui'
import { Footer, Main } from '@/layout'
import { DrawCursor, GoogleGA } from '@/components'

export default function App() {
  GoogleGA()

  return (
    <>
      <DrawCursor />
      <div className="flex flex-col min-h-screen">
        <Main />
        <Footer />
      </div>
      <KToast position="bottom-center" offset={48} />
    </>
  )
}
