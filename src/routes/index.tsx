// Pages
import { Fragment } from 'react/jsx-runtime';
import AboutUs from '../pages/AboutUs/AboutUs';
import ExchangeReturnRefundPolicy from '../pages/Privacy/components/ExchangeReturnRefundPolicy';
import WarrantyPolicy from '../pages/Privacy/components/WarrantyPolicy';
import ShippingPolicy from '../pages/Privacy/components/ShippingPolicy';
import SecurityPolicy from '../pages/Privacy/components/SecurityPolicy';
import Contact from '../pages/Contact/Contact';
import FAQ from '../pages/FAQ/FAQ';
import Home from '../pages/Home/Home';

const publicRoutes = [
  {
    path: '/',
    component: Home,
    layout: 'default',
  },
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
];

// Login as admin to access
const privateRoutes: any[] = [];

export { privateRoutes, publicRoutes };
