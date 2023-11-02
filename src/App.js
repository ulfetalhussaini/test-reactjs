import "./App.css";
import MyTable from "./components/MyTable";

function App() {
  return (
    <div className="App">
      <h2>Test ReactJS</h2>
      <MyTable tableName="users" editable={true} endpoint="users" />
      <MyTable tableName="payment" editable={true} endpoint="payment" />
    </div>
  );
}

export default App;
