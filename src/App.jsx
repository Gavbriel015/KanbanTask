import SideBar from "./components/page/SideBar"
import TopBar from "./components/page/TopBar"
import { KanbanStore } from "./store/store"

function App() {

  const { boards } = KanbanStore();
  return (
    <>
      {
        boards && boards ? (<div className="flex">
          <SideBar />
          <div className="flex flex-col flex-1 overflow-hidden bg-[#F4F7FD] dark:bg-bgDarkGray">
            <TopBar />
          </div>
        </div> ) : (
          <div>
            No hay Boards
          </div>
        )
      }
    </>
  )
}

export default App
