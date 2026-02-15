import { Outlet } from 'react-router-dom'

export default function Main() {
  return (
    <main className="relative flex-1 p-2 pb-0">
      <Outlet />
    </main>
  )
}
