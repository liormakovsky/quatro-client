import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Protected } from "./components";
import { Login, Register, ThankYou } from "./pages";

function App() {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/Register" element={<Register />}></Route>
            <Route
              path="/tnx"
              element={
                <Protected
                  Cmp={() => {
                    return (
                      <>
                        <ThankYou />
                      </>
                    );
                  }}
                />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
