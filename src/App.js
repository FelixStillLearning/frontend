import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import CategoryList from "./components/CategoryList";
import AddCategory from "./components/AddCategory";
import EditCategory from "./components/EditCategory";
import ExpeditionList from "./components/ExpeditionList";
import AddExpedition from "./components/AddExpedition";
import EditExpedition from "./components/EditExpedition";
import OrderList from "./components/OrderList";
import OrderDetail from "./components/OrderDetail";
import AddOrder from "./components/AddOrder";
import EditOrder from "./components/EditOrder";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SideBar />}>
          <Route path="users" element={<UserList />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="edit-user/:id" element={<EditUser />} />
          <Route path="products" element={<ProductList />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="edit-category/:id" element={<EditCategory />} />
          <Route path="expeditions" element={<ExpeditionList />} />
          <Route path="add-expedition" element={<AddExpedition />} />
          <Route path="edit-expedition/:id" element={<EditExpedition />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="order/:id" element={<OrderDetail />} />
          <Route path="add-order" element={<AddOrder />} />
          <Route path="edit-order/:id" element={<EditOrder />} />
          <Route path="dashboard" element={<Dashboard />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;