import "./App.css";
import "./css/design.css";
import { RightSidebar } from "./components/sidebar/right-sidebar";
import { LeftSidebar } from "./components/sidebar/left-sidebar";
import { PageRoutes } from "./pages/routes";

function App() {
    return (
        <div className="app">
            <LeftSidebar />
            <RightSidebar />
            <div className="page-content">
                <PageRoutes />
            </div>
        </div>
    );
}

export default App;
