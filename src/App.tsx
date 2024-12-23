import React, { useState } from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import ProductPage from "./Pages/ProductPage";
import Login from "./Pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/products"
          element={isAuthenticated ? <ProductPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;

// import { useEffect } from "react";
// import "./App.css";
// import { useCounterStore } from "./assets/store";

// const setCount = () => {
//   useCounterStore.setState({ count: 1 });
// };

// const App = () => {
//   const count = useCounterStore((state) => state.count);

//   return <OtherComponent count={count} />;
// };

// const OtherComponent = ({ count }: { count: number }) => {
//   const incrementAsync = useCounterStore((state) => state.incrementAsync);
//   const decrement = useCounterStore((state) => state.decrement);

//   useEffect(() => {
//     setCount();
//   }, []);

//   return (
//     <div>
//       {count}
//       <div>
//         <button onClick={incrementAsync}> increment</button>
//         <button onClick={decrement}> decrement</button>
//       </div>
//     </div>
//   );
//   <div></div>;
// };

// export default App;

// import { StarOutlined, UserOutlined } from "@ant-design/icons";
// import {
//   Button,
//   Form,
//   Select,
//   Table,
//   Alert,
//   DatePicker,
//   TimePicker,
//   Spin,
//   Progress,
//   Divider,
//   Avatar,
//   Switch,
//   Space,
// } from "antd";
// import form from "antd/es/form";
// import input from "antd/es/input";
// import { ColumnsType } from "antd/es/table";
// import { useState } from "react";

// interface DataType {
//   name: string;
//   age: number;
//   address: string;
// }

// type FormValues = {
//   password: string;
//   Username: string;
// };

// function App() {
//   const [showAlert, setShowAlert] = useState(false);
//   const onFinish = (e: FormValues) => {
//     console.log(e);
//     setTimeout(() => {
//       setShowAlert(true);
//     }, 2000);
//   };
//   const fruits = ["Mango", "Banana", "Apple", "Grap", "Orange"];

//   const data: DataType[] = [
//     {
//       name: "Name 1",
//       age: 10,
//       address: "Address 1",
//     },
//     {
//       name: "Name 2",
//       age: 20,
//       address: "Address 2",
//     },
//     {
//       name: "Name 2",
//       age: 40,
//       address: "Address 2",
//     },
//   ];

//   const columns: ColumnsType<DataType> = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "key",
//       render: (name) => {
//         return <a>{name}</a>;
//       },
//     },
//     {
//       title: "Age",
//       dataIndex: "age",
//       key: "key",
//       sorter: (a, b) => a.age - b.age,
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "key",
//     },
//     {
//       title: "Graduated?",
//       key: "key",
//       render: (payload) => {
//         return <p>{payload.age > 20 ? "True" : "False"}</p>;
//       },
//     },
//   ];

//   const [loading, setLoading] = useState(false);

//   return (
//     <>
//       <Progress percent={10} />
//       <div style={{ textAlign: "center", marginTop: "15px" }}>
//         <Spin spinning={loading}></Spin>
//         <Button
//           onClick={() => {
//             setLoading((preValue) => !preValue);
//           }}
//         >
//           Toggle Spinning
//         </Button>
//       </div>
//       {showAlert && (
//         <Alert
//           type="error"
//           message="Error"
//           description="There was an error on login"
//           closable
//         />
//       )}
//       <input.Search
//         placeholder="Name"
//         prefix={<UserOutlined />}
//         style={{ width: "30%", margin: "15px 0 0 10px" }}
//       ></input.Search>
//       <Button type="primary" style={{ margin: "15px 0 0 10px" }}>
//         <StarOutlined />
//       </Button>

//       <Avatar style={{ margin: "0 0 7.5px 10px", cursor: "pointer" }}>
//         <UserOutlined />
//       </Avatar>

//       <Space>
//         <Switch />
//         <Switch defaultChecked={true} />
//         <Switch
//           defaultChecked={true}
//           checkedChildren="on"
//           unCheckedChildren="off"
//         />
//         <Switch
//           defaultChecked={true}
//           checkedChildren="on"
//           unCheckedChildren="off"
//           onChange={(checked) => {
//             console.log("switch is checked", checked);
//           }}
//         />
//       </Space>

//       <br />
//       <p style={{ margin: "20px 0 0 10px" }}>What is your favourate fruit</p>
//       <Select
//         placeholder="Select your favourate fruits"
//         style={{ width: "30%", margin: "20px 0 0 10px" }}
//         mode="multiple"
//         maxTagCount={2}
//       >
//         {fruits.map((fruits, index) => {
//           return (
//             <Select.Option value={fruits} key={index}>
//               {fruits}
//             </Select.Option>
//           );
//         })}
//       </Select>

//       <Divider style={{ borderColor: "black" }} orientation="left">
//         Form
//       </Divider>

//       <Form onFinish={onFinish} style={{ margin: "20px 0 0 10px" }}>
//         <form.Item label="Username" name="Username">
//           <input
//             placeholder="Username"
//             required
//             style={{ width: "25%" }}
//           ></input>
//         </form.Item>
//         <form.Item label="Password" name="Password">
//           <input.Password
//             placeholder="Password"
//             style={{ width: "25%" }}
//           ></input.Password>
//         </form.Item>
//         <form.Item>
//           <Button
//             block
//             type="primary"
//             htmlType="submit"
//             style={{ width: "30%" }}
//           >
//             Log in
//           </Button>
//         </form.Item>
//       </Form>

//       <Progress
//         percent={50}
//         type="circle"
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           textAlign: "center",
//           marginTop: "15px",
//         }}
//       />
//       <Divider dashed style={{ borderColor: "lightblue" }} />

//       <Table
//         dataSource={data}
//         columns={columns}
//         style={{ margin: "50px 10px 0 10px" }}
//       ></Table>
//       <br />
//       <div style={{ margin: "0 0 30px 30px" }}>
//         <p>Select your date of birth</p>
//         <DatePicker picker="year" />
//         <DatePicker.RangePicker picker="date" />
//         <TimePicker />
//       </div>

//       <div style={{ textAlign: "center" }}>
//         <span>Link</span>
//         <Divider style={{ borderColor: "black" }} type="vertical" />
//         <span>Link</span>
//       </div>

//       <Progress
//         percent={99}
//         type="line"
//         strokeColor="lightgreen"
//         status="success"
//       />
//     </>
//   );
// }

// export default App;
