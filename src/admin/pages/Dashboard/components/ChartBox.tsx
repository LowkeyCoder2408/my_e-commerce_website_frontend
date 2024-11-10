import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import styles from '../scss/ChartBox.module.scss';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import { isTokenExpired } from '../../../../utils/Service/JwtService';
import { useAuth } from '../../../../utils/Context/AuthContext';

const cx = classNames.bind(styles);

type ChartBoxProps = {
  color: string;
  title: string;
  icon: string;
  dataKey?: string;
  number: number | string;
  percentage?: number;
  chartData: object[];
  link: string;
};

const ChartBox = (props: ChartBoxProps) => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={cx('chartBox')}>
      <div className={cx('chartBox__boxInfo')}>
        {props.title && (
          <div className={cx('chartBox__boxInfo-title')}>
            <span>{props.title}</span>
          </div>
        )}
        <h1 className={cx('chartBox__boxInfo-number')}>{props.number}</h1>
        <div
          onClick={() => {
            if (!isLoggedIn) {
              toast.error('Bạn cần đăng nhập để thực hiện chức năng này');
              navigate('/admin/login', { state: { from: location } });
              return;
            }
            if (isTokenExpired()) {
              localStorage.removeItem('token');
              setIsLoggedIn(false);
              toast.error(
                'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại để tiếp tục',
              );
              navigate('/admin/login', { state: { from: location } });
              return;
            }
            navigate(`${props.link}`);
          }}
          style={{ color: props.color, cursor: 'pointer' }}
        >
          Xem tất cả
        </div>
      </div>
      {props.dataKey && (
        <div className={cx('chartBox__chartInfo')}>
          <div className={cx('chartBox__chart')}>
            <ResponsiveContainer width="99%" height="100%">
              <LineChart data={props.chartData}>
                <Tooltip
                  contentStyle={{
                    background: 'transparent',
                    border: 'none',
                  }}
                  labelStyle={{ display: 'none' }}
                  position={{ x: 10, y: 70 }}
                />
                <Line
                  type="monotone"
                  dataKey={props.dataKey}
                  stroke={props.color}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {props.percentage && (
            <div className={cx('chartBox__texts')}>
              <span
                className={cx('chartBox__texts-percentage')}
                style={{
                  color: props.percentage < 0 ? 'tomato' : 'limegreen',
                }}
              >
                {props.percentage}%
              </span>
              <span className="text-white">tháng này</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChartBox;
