import { useEffect, useState } from 'react';
import ProductModel from '../../../models/ProductModel';
import OrderModel from '../../../models/OrderModel';
import UserModel from '../../../models/UserModel';
import styles from './scss/AdminDashboard.module.scss';
import classNames from 'classnames/bind';
import TopTrading from './components/TopTrading';
import ChartBox from './components/ChartBox';
import ProductPortfolioRatio from './components/ProductPortfolioRatio';
import { getAllUsers } from '../../../api/UserAPI';
import { getAllProductsNoFilter } from '../../../api/ProductAPI';
import { getAllOrders } from '../../../api/OrderAPI';
import MonthlyRevenue from './components/MonthlyRevenue';
import AdminRequirement from '../../../utils/AdminRequirement';
import BlogModel from '../../../models/BlogModel';
import { getAllBlogsNoFilter } from '../../../api/BlogAPI';
import ReviewModel from '../../../models/ReviewModel';
import { getAllReviews } from '../../../api/ReviewAPI';
import OrderStatusRatio from './components/OrderStatusRatio';

const cx = classNames.bind(styles);

const Dashboard = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [blogs, setBlogs] = useState<BlogModel[]>([]);
  const [reviews, setReviews] = useState<ReviewModel[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const productsResult = await getAllProductsNoFilter();
        const usersResult = await getAllUsers();
        const ordersResult = await getAllOrders();
        const blogsResult = await getAllBlogsNoFilter();
        const reviewsResult = await getAllReviews();

        setProducts(productsResult.result);
        setUsers(usersResult);
        setOrders(ordersResult);
        setBlogs(blogsResult.result);
        setReviews(reviewsResult);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const chartBoxProduct = {
    color: 'skyblue',
    icon: '/productIcon.svg',
    title: 'Sản Phẩm',
    link: '/admin/product-management',
    number: products.length,
    dataKey: 'sản phẩm',
    percentage: 21,
    chartData: [
      { name: 'Chủ NhậT', 'sản phẩm': 400 },
      { name: 'Thứ Hai', 'sản phẩm': 600 },
      { name: 'Thứ Ba', 'sản phẩm': 500 },
      { name: 'Thứ Tư', 'sản phẩm': 700 },
      { name: 'Thứ Năm', 'sản phẩm': 400 },
      { name: 'Thứ Sáu', 'sản phẩm': 1500 },
      { name: 'Thứ Bảy', 'sản phẩm': 450 },
    ],
  };

  const chartBoxOrder = {
    color: 'gold',
    icon: '/conversionIcon.svg',
    title: 'Đơn Hàng',
    number: orders.length,
    dataKey: 'đơn hàng',
    link: '/admin/view-orders',
    percentage: 12,
    chartData: [
      { name: 'Chủ Nhật', 'đơn hàng': 400 },
      { name: 'Thứ Hai', 'đơn hàng': 600 },
      { name: 'Thứ Ba', 'đơn hàng': 500 },
      { name: 'Thứ Tư', 'đơn hàng': 700 },
      { name: 'Thứ Năm', 'đơn hàng': 11400 },
      { name: 'Thứ Sáu', 'đơn hàng': 500 },
      { name: 'Thứ Bảy', 'đơn hàng': 450 },
    ],
  };

  const chartBoxReview = {
    color: 'gold',
    icon: '/conversionIcon.svg',
    title: 'Đánh giá',
    number: reviews.length,
    dataKey: 'đánh giá',
    link: '/admin/view-reviews',
    percentage: 12,
    chartData: [
      { name: 'Chủ Nhật', 'đánh giá': 400 },
      { name: 'Thứ Hai', 'đánh giá': 600 },
      { name: 'Thứ Ba', 'đánh giá': 500 },
      { name: 'Thứ Tư', 'đánh giá': 700 },
      { name: 'Thứ Năm', 'đánh giá': 11400 },
      { name: 'Thứ Sáu', 'đánh giá': 500 },
      { name: 'Thứ Bảy', 'đánh giá': 450 },
    ],
  };

  const chartBoxBlog = {
    color: 'gold',
    icon: '/blog.svg',
    title: 'Bài Đăng',
    number: blogs.length,
    dataKey: 'bài đăng',
    link: '/admin/view-blogs',
    percentage: -7,
    chartData: [
      { name: 'Chủ Nhật', 'bài đăng': 4 },
      { name: 'Thứ Hai', 'bài đăng': 6 },
      { name: 'Thứ Ba', 'bài đăng': 5 },
      { name: 'Thứ Tư', 'bài đăng': 7 },
      { name: 'Thứ Năm', 'bài đăng': 14 },
      { name: 'Thứ Sáu', 'bài đăng': 5 },
      { name: 'Thứ Bảy', 'bài đăng': 4 },
    ],
  };

  const barChartBoxOrderStatus = {
    title: 'TRẠNG THÁI ĐƠN HÀNG',
    color: '#FF8042',
    dataKey: 'truy cập',
  };

  const chartBoxUser = {
    color: '#8884d8',
    icon: '/user.svg',
    title: 'Người dùng',
    link: '/admin/user-management',
    number: users.length,
    dataKey: 'Người dùng',
    percentage: 45,
    chartData: [
      { name: 'Chủ Nhật', 'Người dùng': 1400 },
      { name: 'Thứ Hai', 'Người dùng': 600 },
      { name: 'Thứ Ba', 'Người dùng': 500 },
      { name: 'Thứ Tư', 'Người dùng': 700 },
      { name: 'Thứ Năm', 'Người dùng': 400 },
      { name: 'Thứ Sáu', 'Người dùng': 500 },
      { name: 'Thứ Bảy', 'Người dùng': 450 },
    ],
  };

  return (
    <div className={cx('home')}>
      <div className={cx('home__box', 'home__box1')}>
        <TopTrading />
      </div>
      <div className={cx('home__box', 'home__box3')}>
        <ChartBox {...chartBoxProduct} />
      </div>
      <div className={cx('home__box', 'home__box5')}>
        <ChartBox {...chartBoxOrder} />
      </div>
      <div className={cx('home__box', 'home__box2')}>
        <ChartBox {...chartBoxBlog} />
      </div>
      <div className={cx('home__box', 'home__box2')}>
        <ChartBox {...chartBoxBlog} />
      </div>
      <div className={cx('home__box', 'home__box2')}>
        <ChartBox {...chartBoxReview} />
      </div>
      <div className={cx('home__box', 'home__box6')}>
        <ChartBox {...chartBoxUser} />
      </div>
      <div className={cx('home__box', 'home__box4')}>
        <ProductPortfolioRatio />
      </div>
      <div className={cx('home__box', 'home__box7')}>
        <MonthlyRevenue />
      </div>
      <div className={cx('home__box', 'home__box8')}>
        <OrderStatusRatio {...barChartBoxOrderStatus} />
      </div>
    </div>
  );
};

const AdminDashboard = AdminRequirement(Dashboard);
export default AdminDashboard;
