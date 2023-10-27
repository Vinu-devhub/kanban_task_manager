import BoardContainer from "./components/views/BoardContainer";
import MiniSidebar from "./components/views/MiniSidebar";
import Sidebar from "./components/views/Sidebar";

function App() {
  return (
    <main className=" flex w-full h-screen min-h-screen">
      <MiniSidebar />
      <Sidebar />
      <BoardContainer />
    </main>
  );
}

export default App;
