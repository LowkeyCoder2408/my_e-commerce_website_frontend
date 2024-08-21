// Pages
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

const publicRoutes = [
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
    path: '/enable/:email/:verificationCode',
    component: EnableAccount,
    layout: 'default',
  },
  { path: '/product-list', component: ProductList, layout: 'default' },
  {
    path: '/product-list/:categoryAlias',
    component: ProductList,
    layout: 'default',
  },
  { path: '/product-detail', component: ProductDetail, layout: 'default' },
  { path: '/about-us', component: AboutUs, layout: 'default' },
  { path: '/contact', component: Contact, layout: 'default' },
  { path: '/faq', component: FAQ, layout: 'default' },
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
const privateRoutes: any[] = [];

export { privateRoutes, publicRoutes };
