import { Provider } from "react-redux";
import "./App.css";
import Builder from "./components/builder/Builder";
import store from "./components/redux/store";
import ChatbotSetting from "./components/SettingsPage/ChatbotSetting";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ChatbotSetting />
      </Provider>
    </div>
  );
}

export default App;
