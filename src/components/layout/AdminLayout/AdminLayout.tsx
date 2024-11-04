import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styles from '../AdminLayout/scss/AdminLayout.module.scss';
import classNames from 'classnames/bind';
import AdminNavbar from './components/AdminNavbar';
import AdminMenu from './components/AdminMenu';

const cx = classNames.bind(styles);

const queryClient = new QueryClient();

interface AdminLayoutProps {
  children: React.ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="main">
      <AdminNavbar />
      <div className={cx('container-menu')}>
        <div className={cx('menuContainer')}>
          <AdminMenu />
        </div>
        <div className={cx('contentContainer')}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
