import {
  Navbar,
  Sidebar,
  Trends,
  Profile,
  Friends
} from "../components"
import FileUpload from "../components/File-upload";
import { useGlobalContext } from "../context/context";

const Home = ({toggleTheme}) => {
  const { isSidebarOpen,videoModal } = useGlobalContext();

  return (
    <>
          {videoModal && <FileUpload/>}
      <Navbar toggleTheme={toggleTheme} />
      <section className="full-page">
        <div className="profile">
          <Profile />
        </div>
        <div className="trends">
          <Trends />
        </div>
        <div className="friends-wrapper">
          <Friends />
        </div>
      </section>
      {isSidebarOpen && <Sidebar />}
    </>
  )
};

export default Home