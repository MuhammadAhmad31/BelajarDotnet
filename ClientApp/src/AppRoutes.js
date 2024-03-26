import { AddProduct } from "./components/product/AddProduct";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Product } from "./components/product/Product";
import EditProduct from "./components/product/EditProduct";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/fetch-products',
    element: <Product />
  },
  {
    path: '/add-product',
    element: <AddProduct />
  },
  {
    path: '/edit-product/:id',
    element: <EditProduct />
  },
  {
    path: '/delete-product/:id',
    element: <Product />
  }
];

export default AppRoutes;
