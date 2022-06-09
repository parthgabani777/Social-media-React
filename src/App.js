import "./App.css";
import "./css/design.css";
import { RightSidebar } from "./components/sidebar/right-sidebar";
import { LeftSidebar } from "./components/sidebar/left-sidebar";
import { PageRoutes } from "./pages/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <div className="app">
            <LeftSidebar />
            <RightSidebar />
            <div className="page-content">
                <PageRoutes />
            </div>
            <ToastContainer
                style={{
                    fontSize: 16,
                }}
                position={"bottom-right"}
                autoClose={2000}
                theme="dark"
            />
        </div>
    );
}

export default App;
