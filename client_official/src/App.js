import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Header from "./components/header/Header";
import Pages from "./components/main_pages/Pages";
import Footer from "./components/Footer2/Footer";

function App() {
  return (
    <>
      <DataProvider>
        <Router>
          <div className="App">
            <Header></Header>
            <Pages></Pages>
            <Footer />
          </div>
        </Router>
      </DataProvider>
    </>
  );
}

export default App;
