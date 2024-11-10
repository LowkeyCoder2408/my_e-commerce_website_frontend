import { useEffect, useState } from 'react';
import styles from '../scss/TopTrading.module.scss';
import UserModel from '../../../../models/UserModel';
import { calculateTotalAmountByUsers } from '../../../../api/OrderAPI';
import { getAllUsers, getUserById } from '../../../../api/UserAPI';
import FormatPrice from '../../../../utils/Service/FormatPrice';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const TopTrading = () => {
  const [topUserByTotalAmount, setTopUserByTotalAmount] = useState<
    { userId: number; totalAmount: number }[]
  >([]);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [topDealUsers, setTopDealUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    getAllUsers()
      .then((result) => {
        setUsers(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const topUsers = await calculateTotalAmountByUsers(users, 7);
        setTopUserByTotalAmount(topUsers);
        const topDealUsers = await getUsersByArray(topUsers);
        setTopDealUsers(topDealUsers);
      } catch (error) {
        console.error('Lỗi khi lấy top khách hàng:', error);
      }
    }
    fetchData();
  }, [users]);

  async function getUsersByArray(
    userArray: { userId: number; totalAmount: number }[],
  ): Promise<UserModel[]> {
    const userList: UserModel[] = [];

    for (const item of userArray) {
      try {
        const user = await getUserById(item.userId);
        if (user) {
          userList.push(user);
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin khách hàng:', error);
      }
    }

    return userList;
  }

  return (
    <div className={cx('topBox')}>
      <h1 className={cx('topBox__title')}>GIAO DỊCH HÀNG ĐẦU</h1>
      <div className={cx('topBox__list')}>
        {topDealUsers.map((user) => {
          const userWithTotalAmount = topUserByTotalAmount.find(
            (item) => item.userId === user.id,
          );
          return (
            <div className={cx('topBox__listItem')} key={user.id}>
              <div className={cx('topBox__user')}>
                <img
                  className={cx('topBox__userImg')}
                  src={
                    user.photo ||
                    'https://res.cloudinary.com/dgdn13yur/image/upload/v1710904428/avatar_sjugj8.png'
                  }
                  alt=""
                />
                <div className={cx('topBox__userTexts')}>
                  <span className={cx('topBox__username')}>
                    {user.firstName + ' ' + user.lastName}
                  </span>
                  <span className={cx('topBox__infor')}>
                    {user.phoneNumber || 'Chưa cập nhật'}
                  </span>
                </div>
              </div>
              <span className={cx('topBox__amount')}>
                {userWithTotalAmount && (
                  <FormatPrice price={userWithTotalAmount.totalAmount} />
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopTrading;
