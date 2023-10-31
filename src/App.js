import "./App.css";
import MyTable from "./components/MyTable";

function App() {
  return (
    <div className="App">
      <p>Test ReactJS</p>
      <MyTable tableName="users" editable={true} endpoint="" />
      <MyTable tableName="payment" editable={true} endpoint="" />
    </div>
  );
}

export default App;
