import {
  Home,
  Login,
  InfoCorona,
  DetailDate,
  Product,
  ProductDetail,
} from '../pages';

const routes = [
  {
    path: '/product/:productId',
    component: ProductDetail,
    isPublic: false,
  },
  {
    path: '/product',
    component: Product,
    isPublic: false,
  },
  {
    path: '/home',
    component: Home,
    isPublic: true,
  },
  {
    path: '/login',
    component: Login,
    isPublic: true,
  },
  {
    path: '/covid/:dateId',
    component: DetailDate,
    isPublic: true,
  },
  {
    path: '/covid',
    component: InfoCorona,
    isPublic: true,
  },
  {
    path: '/',
    component: Home,
    isPublic: true,
  },
];

export default routes;
