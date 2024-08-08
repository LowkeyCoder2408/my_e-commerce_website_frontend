import { Link } from 'react-router-dom';
import styles from '../scss/SecurityPolicy.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SecurityPolicy() {
  return (
    <div className="container">
      <div className={`${cx('security-policy')} bg-light border`}>
        <h1 className={`${cx('security-policy__title')} color-text mb-4`}>
          <strong>CHÍNH SÁCH BẢO MẬT</strong>
        </h1>
        <p>
          Chào mừng bạn đến với trang <strong>Chính sách Bảo mật</strong> của
          <Link to={'/'} className="text-primary">
            <strong> Tech Hub</strong>
          </Link>
          . Tại đây, chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và cung
          cấp cho bạn thông tin về cách chúng tôi thu thập, sử dụng, bảo vệ và
          tiết lộ thông tin cá nhân của bạn khi bạn sử dụng dịch vụ của
          <Link to={'/'} className="text-primary">
            <strong> Tech Hub</strong>
          </Link>
          .
        </p>
        <p>
          Tại đây, chúng tôi cam kết bảo vệ quyền riêng tư và bảo mật thông tin
          của bạn. Mọi thông tin cá nhân được thu thập sẽ được sử dụng hợp lý và
          an toàn. Hãy dành thời gian đọc kỹ <strong>Chính sách Bảo mật</strong>{' '}
          này để hiểu rõ hơn về cách thức chúng tôi thu thập, sử dụng và bảo vệ
          thông tin của bạn.
        </p>
        <div className={`${cx('security-policy__item')} mt-5`}>
          <h3 className="mb-3">
            <strong>1. Mục đích và phạm vi thu thập thông tin:</strong>
          </h3>
          <p>
            Chúng tôi có thể thu thập thông tin cá nhân của bạn khi bạn đăng ký
            tài khoản, thực hiện đơn đặt hàng, tham gia khảo sát hoặc điều tra,
            đăng ký nhận bản tin, hoặc tương tác với trang web của chúng tôi
            bằng cách sử dụng các công cụ và tính năng có sẵn trên trang web.
          </p>
          <p>
            <strong>Mục đích:</strong>
            <ul>
              <li>
                Xử lý và giao hàng, gửi thông tin về đơn hàng, sản phẩm và dịch
                vụ liên quan
              </li>
              <li>
                Cung cấp dịch vụ mua bán thiết bị công nghệ, thông tin quảng
                cáo, khuyến mãi và thông tin sản phẩm mới
              </li>
              <li>Phản hồi yêu cầu hỗ trợ khách hàng</li>
              <li>Tăng trải nghiệm và dịch vụ cho bạn</li>
              <li>Cải thiện trải nghiệm sử dụng website</li>
            </ul>
          </p>
          <p>
            <strong>Phạm vu thu thập:</strong>
            <ul>
              <li>
                Thông tin cá nhân: Họ tên, email, số điện thoại, địa chỉ, thông
                tin thanh toán,...
              </li>
              <li>Thông tin đăng nhập: Tên đăng nhập, mật khẩu,...</li>
              <li>
                Thông tin sử dụng website: Dữ liệu truy cập, hành vi mua sắm,
                phản hồi của khách hàng,...
              </li>
            </ul>
          </p>
        </div>
        <div className={`${cx('security-policy__item')} mt-5`}>
          <h3 className="mb-3">
            <strong>2. Chia sẻ thông tin:</strong>
          </h3>
          <p>
            Chúng tôi cam kết không bán hoặc chia sẻ thông tin cá nhân của khách
            hàng cho bên thứ ba. Tuy nhiên, chúng vẫn được chia sẻ với các đối
            tác liên quan để thực hiện dịch vụ (giao hàng, thanh toán). Đồng
            thời, nếu có yêu cầu từ cơ quan chức năng có thẩm quyền, thông tin
            vẫn được chia sẻ theo đúng quy định của pháp luật.
          </p>
          <p>
            Bạn có quyền yêu cầu truy cập, sửa đổi hoặc xóa thông tin cá nhân
            của mình bất kỳ lúc nào bằng cách liên hệ với chúng tôi qua thông
            tin liên lạc được cung cấp.
          </p>
        </div>
        <div className={`${cx('security-policy__item')} mt-5`}>
          <h3 className="mb-3">
            <strong>3. Bảo mật thông tin:</strong>
          </h3>
          <p>
            Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và sử dụng các
            biện pháp bảo mật phù hợp để bảo vệ thông tin đó khỏi mất mát, lạc
            hướng, truy cập trái phép, tiết lộ, sửa đổi hoặc hủy bỏ. Tuy nhiên,
            không có phương tiện truyền thông nào hoặc truyền thông trên
            internet có thể đảm bảo 100% an toàn và chúng tôi không thể cam kết
            hoặc đảm bảo an ninh của thông tin cá nhân của bạn.
          </p>
        </div>
        <div className={`${cx('security-policy__item')} mt-5`}>
          <h3 className="mb-3">
            <strong>4. Cookies:</strong>
          </h3>
          <p>
            "Cookie" là các mã danh định được lưu trữ trên máy tính hoặc thiết
            bị di động của bạn lưu trữ các dữ liệu về máy tính hoặc thiết bị,
            bằng cách nào và khi nào Các Dịch Vụ hoặc Nền tảng được sử dụng hay
            truy cập, bởi bao nhiêu người và để theo dõi những hoạt động trong
            Các Nền tảng của chúng tôi.
          </p>
          <p>
            Đôi khi chúng tôi hoặc các nhà cung cấp dịch vụ được cho phép và các
            đối tác quảng cáo của chúng tôi có thể sử dụng "cookie" hoặc các
            tính năng khác để cho phép chúng tôi hoặc các bên thứ ba thu thập
            hoặc chia sẻ thông tin liên quan đến việc sử dụng của bạn đối với
            Dịch vụ hoặc Nền tảng của chúng tôi.
          </p>
          <p>
            Các tính năng này sẽ giúp chúng tôi cải thiện Nền tảng và Các Dịch
            Vụ chúng tôi cung cấp, giúp chúng tôi đề xuất các dịch vụ và tính
            năng mới, và/hoặc cho phép chúng tôi và các đối tác quảng cáo của
            chúng tôi cung cấp các nội dung có liên quan hơn đến bạn.
          </p>
          <p>
            Chúng tôi có thể liên kết thông tin cookie với dữ liệu cá nhân.
            Cookie cũng liên kết với thông tin về những nội dung bạn đã chọn để
            mua sắm và các trang web mà bạn đã xem. Thông tin này được sử dụng
            để theo dõi giỏ hàng, để chuyển tải nội dung phù hợp với sở thích
            của bạn, để cho phép các đối tác cung cấp dịch vụ quảng cáo cung cấp
            dịch vụ quảng cáo trên các trang thông qua mạng Internet và để thực
            hiện phân tích dữ liệu và hoặc theo dõi việc sử dụng Dịch vụ.
          </p>
        </div>
        <div className={`${cx('security-policy__item')} mt-5`}>
          <h3 className="mb-3">
            <strong>5. Quyền lợi của khách hàng:</strong>
          </h3>
          <ul>
            <li>Truy cập, chỉnh sửa, xóa thông tin cá nhân</li>
            <li>Yêu cầu ngừng gửi thông tin quảng cáo</li>
            <li>Khiếu nại về việc thu thập, sử dụng thông tin</li>
          </ul>
        </div>
        <div className={`${cx('security-policy__item')} mt-5`}>
          <h3 className="mb-3">
            <strong>
              6. Thắc mắc, quan ngại hay khiếu nại? Liên hệ với chúng tôi:
            </strong>
          </h3>
          <p>
            <strong>Số điện thoại - Zalo: </strong>033.2426.055 (Mr. Lam)
            <br />
            <strong>Email: </strong>21h1120042@ut.edu.vn (Mr. Lam)
          </p>
          <p>
            CÔNG TY TNHH TECH HUB
            <br />
            <strong>Địa chỉ: </strong>
            <ul>
              <li>
                Số 249, đường Đinh Bộ Lĩnh, P. 26, Q. Bình Thạnh, TP. Hồ Chí
                Minh <strong>(Trụ sở chính)</strong>
              </li>
              <li>
                Số 02, đường Võ Oanh, P. 25, Q. Bình Thạnh, TP. Hồ Chí Minh{' '}
                <strong>(Chi nhánh 1)</strong>
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SecurityPolicy;
