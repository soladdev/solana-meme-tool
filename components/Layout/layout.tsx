import Header from "../Header"
import ProSidebar from "../ProSidebar"

const Layout = ({ children }: any) => {

  return (
    <main className="flex min-h-screen bg-background font-IT w-full text-text">
      <ProSidebar />
      <div className="flex flex-col items-center flex-1 mx-auto sm:gap-4">
        <Header />
        <div className="w-full">
          {children}
        </div>
      </div>
    </main>

  )

}

export default Layout