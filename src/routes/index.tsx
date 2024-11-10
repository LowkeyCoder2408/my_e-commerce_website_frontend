import AboutUs from '../pages/AboutUs/AboutUs';
import ExchangeReturnRefundPolicy from '../pages/Privacy/components/ExchangeReturnRefundPolicy';
import WarrantyPolicy from '../pages/Privacy/components/WarrantyPolicy';
import ShippingPolicy from '../pages/Privacy/components/ShippingPolicy';
import SecurityPolicy from '../pages/Privacy/components/SecurityPolicy';
import Contact from '../pages/Contact/Contact';
import FAQ from '../pages/FAQ/FAQ';
import Home from '../pages/Home/Home';
import Error403 from '../pages/Exception/Error403';
import Error404 from '../pages/Exception/Error404';
import ProductList from '../pages/ProductList/ProductList';
import ProductDetail from '../pages/Product/ProductDetail/ProductDetail';
import Register from '../pages/User/Register';
import EnableAccount from '../pages/User/EnableAccount';
import Login from '../pages/User/Login';
import FavoriteProductList from '../pages/Product/FavoriteProduct/FavoriteProductList';
import ShoppingCart from '../pages/ShoppingCart/ShoppingCart';
import CheckOutStatus from '../pages/CheckOut/components/CheckOutStatus';
import { CheckOut } from '../pages/CheckOut/CheckOut';
import MyOrder from '../pages/Order/MyOrders';
import ForgotPassword from '../pages/User/ForgotPassword';
import ChangePassword from '../pages/User/ChangePassword';
import ResetPassword from '../pages/User/ResetPassword';
import MyProfile from '../pages/User/MyProfile';
import BlogList from '../pages/BlogList/BlogList';
import BlogDetail from '../pages/Blog/components/BlogDetail';
import MyBlogs from '../pages/Blog/MyBlogs';
import CreateBlog from '../pages/Blog/components/CreateBlog';
import UserManagementPage from '../admin/pages/User/UserManagement';
import AdminLogin from '../admin/pages/Login/AdminLogin';
import AdminDashboard from '../admin/pages/Dashboard/AdminDashboard';
import ProductManagementPage from '../admin/pages/Product/components/ProductManagement';

const publicRoutes = [
  {
    path: '*',
    component: Error404,
    layout: 'none',
  },
  {
    path: '/',
    component: Home,
    layout: 'default',
  },
  {
    path: '/login',
    component: Login,
    layout: 'default',
  },
  {
    path: '/register',
    component: Register,
    layout: 'default',
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
    layout: 'default',
  },
  {
    path: '/reset-password',
    component: ResetPassword,
    layout: 'default',
  },
  {
    path: '/change-password',
    component: ChangePassword,
    layout: 'default',
  },
  {
    path: '/enable/:email/:verificationCode',
    component: EnableAccount,
    layout: 'default',
  },
  { path: '/my-profile', component: MyProfile, layout: 'default' },
  { path: '/product-list', component: ProductList, layout: 'default' },
  {
    path: '/product-list/:categoryAlias',
    component: ProductList,
    layout: 'default',
  },
  {
    path: '/wish-list',
    component: FavoriteProductList,
    layout: 'default',
  },

  { path: '/product-detail', component: ProductDetail, layout: 'default' },
  { path: '/shopping-cart', component: ShoppingCart, layout: 'default' },
  {
    path: '/check-out',
    component: CheckOut,
    layout: 'default',
  },
  {
    path: '/check-out/status',
    component: CheckOutStatus,
    layout: 'default',
  },
  {
    path: '/my-order',
    component: MyOrder,
    layout: 'default',
  },
  {
    path: '/my-blogs',
    component: MyBlogs,
    layout: 'default',
  },
  {
    path: '/create-blog',
    component: CreateBlog,
    layout: 'default',
  },
  { path: '/about-us', component: AboutUs, layout: 'default' },
  { path: '/contact', component: Contact, layout: 'default' },
  { path: '/faq', component: FAQ, layout: 'default' },
  { path: '/blogs', component: BlogList, layout: 'default' },
  { path: '/blog-detail', component: BlogDetail, layout: 'default' },
  {
    path: '/exchange-return-refund-policy',
    component: ExchangeReturnRefundPolicy,
    layout: 'default',
  },
  {
    path: '/warranty-policy',
    component: WarrantyPolicy,
    layout: 'default',
  },
  {
    path: '/shipping-policy',
    component: ShippingPolicy,
    layout: 'default',
  },
  {
    path: '/security-policy',
    component: SecurityPolicy,
    layout: 'default',
  },
  {
    path: '/403-error',
    component: Error403,
    layout: 'none',
  },
  {
    path: '/404-error',
    component: Error404,
    layout: 'none',
  },
];

// Login as admin to access
const privateRoutes = [
  {
    path: '*',
    component: Error404,
    layout: 'none',
  },
  { path: '/admin/login', component: AdminLogin, layout: 'none' },
  {
    path: '/admin/dashboard',
    component: AdminDashboard,
    layout: 'admin',
  },
  {
    path: '/admin/user-management',
    component: UserManagementPage,
    layout: 'admin',
  },
  {
    path: '/admin/product-management',
    component: ProductManagementPage,
    layout: 'admin',
  },
];

export { privateRoutes, publicRoutes };
