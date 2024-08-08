import { Link } from 'react-router-dom';
import styles from '../scss/ShippingPolicy.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ShippingPolicy() {
  return (
    <div className="container">
      <div className={`${cx('shipping-policy')} bg-light border`}>
        <h1 className={`${cx('shipping-policy__title')} color-text mb-4`}>
          <strong>CHÍNH SÁCH VẬN CHUYỂN</strong>
        </h1>
        <p>
          Chào mừng bạn đến với trang <strong>Chính sách Vận chuyển</strong> của
          <Link to={'/'} className="text-primary">
            <strong> Tech Hub</strong>
          </Link>
          . Tại đây, chúng tôi sẽ cung cấp thông tin chi tiết về quy trình vận
          chuyển sản phẩm, các phương thức vận chuyển có sẵn, và các chính sách
          liên quan của
          <Link to={'/'} className="text-primary">
            <strong> Tech Hub</strong>
          </Link>
          . Hãy dành thời gian đọc kỹ <strong>Chính sách Vận chuyển</strong> này
          để hiểu rõ hơn về cách thức chúng tôi vận hành sản phẩm đến tay người
          dùng nhé!
        </p>
        <div className={`${cx('shipping-policy__item')} mt-5`}>
          <h3 className="mb-3">
            <strong>1. Quy trình vận chuyển:</strong>
          </h3>
          <p>
            Quy trình vận chuyển của chúng tôi bắt đầu ngay sau khi bạn đặt hàng
            thành công trên trang web của chúng tôi. Khi đơn hàng được xác nhận,
            đội ngũ của chúng tôi sẽ bắt đầu quy trình xử lý với mục tiêu cao
            nhất là đảm bảo sản phẩm đến tay bạn trong tình trạng tốt nhất và
            đúng thời gian đã cam kết.
          </p>
          <p>
            Bước đầu tiên trong quy trình này là kiểm tra sản phẩm. Mỗi mặt hàng
            được xác định và kiểm tra kỹ lưỡng để đảm bảo rằng không có lỗi hoặc
            hỏng hóc nào trước khi được đóng gói. Điều này giúp đảm bảo rằng sản
            phẩm mà bạn nhận được sẽ đáp ứng hoặc vượt qua mong đợi của bạn.
          </p>
          <p>
            Tiếp theo, chúng tôi thực hiện việc đóng gói sản phẩm một cách an
            toàn và cẩn thận. Mỗi mặt hàng được đóng gói trong các vật liệu bảo
            vệ chất lượng cao để ngăn chặn sự tổn thương hoặc hỏng hóc trong quá
            trình vận chuyển. Chúng tôi chú trọng đến việc sử dụng các vật liệu
            tái chế và thân thiện với môi trường trong quá trình đóng gói.
          </p>
          <p>
            Sau khi sản phẩm được đóng gói, chúng tôi chuẩn bị cho quá trình vận
            chuyển. Đội ngũ giao hàng của chúng tôi sẽ được thông báo và sẵn
            sàng đưa sản phẩm của bạn từ cơ sở của chúng tôi đến địa chỉ giao
            hàng của bạn một cách an toàn và kịp thời.
          </p>
        </div>
        <div className={`${cx('shipping-policy__item')} mt-5`}>
          <h3 className="mb-3">
            <strong>2. Phương thức vận chuyển:</strong>
          </h3>
          <p>
            Chúng tôi hiểu rằng mỗi khách hàng có những yêu cầu về thời gian vận
            chuyển khác nhau, và vì vậy, chúng tôi cung cấp một loạt các phương
            thức vận chuyển linh hoạt để phù hợp với nhu cầu của bạn.
          </p>
          <p>
            Các phương thức vận chuyển bao gồm:
            <ul>
              <li>
                <strong>Giao hàng tiêu chuẩn:</strong> Đây là phương thức vận
                chuyển phổ biến nhất và được thực hiện bởi các đối tác vận
                chuyển đáng tin cậy. Dịch vụ này có thời gian giao hàng dự kiến,
                đảm bảo rằng sản phẩm của bạn sẽ đến địa chỉ giao hàng một cách
                an toàn và trong thời gian chấp nhận được
              </li>
              <li>
                <strong>Giao hàng nhanh:</strong> Nếu bạn cần sản phẩm một cách
                nhanh chóng, chúng tôi cung cấp dịch vụ giao hàng nhanh để đảm
                bảo rằng sản phẩm sẽ đến tay bạn trong thời gian ngắn nhất có
                thể. Dịch vụ này đặc biệt phù hợp cho những tình huống cần gấp
                hoặc cần một sự ưu tiên cao trong việc nhận hàng
              </li>
            </ul>
          </p>
          <p>
            Chúng tôi cam kết đưa sản phẩm của bạn đến địa chỉ giao hàng một
            cách an toàn và kịp thời, bất kể bạn chọn phương thức vận chuyển
            nào. Hãy chọn phương thức vận chuyển phù hợp với nhu cầu của bạn khi
            hoàn tất đơn hàng để chúng tôi có thể phục vụ bạn tốt nhất.
          </p>
        </div>
        <div className={`${cx('shipping-policy__item')} mt-5`}>
          <h3 className="mb-3">
            <strong>3. Chi phí vận chuyển:</strong>
          </h3>
          <p>
            Khi bạn lựa chọn sản phẩm và địa chỉ giao hàng của mình, chi phí vận
            chuyển sẽ được tính dựa trên các yếu tố cụ thể để đảm bảo bạn nhận
            được thông tin chi phí vận chuyển chính xác và minh bạch. Quá trình
            tính toán chi phí vận chuyển bao gồm các bước sau:
            <ul>
              <li>
                <strong>Phương thức vận chuyển:</strong> Mỗi phương thức vận
                chuyển có một cách tính phí khác nhau, phụ thuộc vào tính nhanh
                chậm, an toàn và ưu tiên của dịch vụ. Chúng tôi cung cấp các
                phương thức vận chuyển đa dạng để bạn có thể lựa chọn phù hợp
                với nhu cầu và ngân sách của mình.
              </li>
              <li>
                <strong>Khoảng cách và địa chỉ giao hàng:</strong> Chi phí vận
                chuyển cũng phụ thuộc vào khoảng cách giữa điểm xuất phát và
                điểm đến, cũng như loại địa chỉ giao hàng. Địa chỉ giao hàng ở
                các khu vực thành thị thường có chi phí vận chuyển thấp hơn so
                với các khu vực ngoại ô hoặc xa xôi.
              </li>
              <li>
                <strong>Kích thước và trọng lượng của đơn hàng:</strong> Đối với
                các đơn hàng có kích thước lớn hoặc trọng lượng nặng, chi phí
                vận chuyển có thể cao hơn do đòi hỏi nhiều công cụ, nhân công và
                nguồn lực hơn để vận chuyển một cách an toàn và hiệu quả.
              </li>
            </ul>
          </p>
          <p>
            Trong quá trình thanh toán, sau khi bạn đã chọn phương thức vận
            chuyển và nhập địa chỉ giao hàng của mình, hệ thống sẽ tự động tính
            toán chi phí vận chuyển cho đơn hàng của bạn. Bạn sẽ nhận được thông
            tin chi tiết và cụ thể về chi phí này, giúp bạn đưa ra quyết định
            mua hàng một cách thông suốt và hiệu quả.
          </p>
        </div>
        <div className={`${cx('shipping-policy__item')} mt-5`}>
          <h3 className="mb-3">
            <strong>4. Theo dõi đơn hàng:</strong>
          </h3>
          <p>
            Khi đơn hàng của bạn đã được chuyển đi, chúng tôi sẽ cung cấp cho
            bạn thông tin chi tiết về quá trình vận chuyển cũng như các cập nhật
            về trạng thái của đơn hàng thông qua hệ thống theo dõi trực tuyến
            của chúng tôi.
            <ul>
              <li>
                <strong>Thông tin vận chuyển:</strong> Bạn sẽ nhận được thông
                tin về công ty vận chuyển, mã số theo dõi đơn hàng (tracking
                number) cùng các thông tin khác liên quan đến quá trình vận
                chuyển.
              </li>
              <li>
                <strong>Theo dõi đơn hàng:</strong> Bằng cách sử dụng mã số theo
                dõi đơn hàng được cung cấp, bạn có thể truy cập vào hệ thống
                theo dõi trực tuyến của chúng tôi để theo dõi vị trí và trạng
                thái của đơn hàng của mình một cách dễ dàng và thuận tiện. giao
                hàng.
              </li>
              <li>
                <strong>Cập nhật trạng thái:</strong> Hệ thống theo dõi trực
                tuyến sẽ cung cấp các cập nhật về trạng thái của đơn hàng, từ
                khi đơn hàng được xử lý cho đến khi đến địa chỉ giao hàng của
                bạn. Bạn sẽ được thông báo về mọi thay đổi trong quá trình vận
                chuyển, bao gồm cả thời gian dự kiến
              </li>
            </ul>
          </p>
        </div>
        <div className={`${cx('shipping-policy__item')} mt-5`}>
          <h3 className="mb-3">
            <strong>5. Địa chỉ giao hàng:</strong>
          </h3>
          <p>
            Khi bạn đặt hàng, bạn có thể chọn địa chỉ giao hàng ở bất kỳ địa
            điểm nào phù hợp với bạn nhất. Chúng tôi chấp nhận địa chỉ giao hàng
            tại nhiều địa điểm khác nhau, bao gồm:
            <ul>
              <li>
                <strong>Địa chỉ nhà riêng:</strong> Nếu bạn muốn sản phẩm được
                giao đến địa chỉ nhà riêng của bạn, vui lòng cung cấp địa chỉ
                chi tiết trong quá trình đặt hàng. Chúng tôi sẽ giao hàng trực
                tiếp đến địa chỉ mà bạn đã cung cấp.
              </li>
              <li>
                <strong>Địa chỉ văn phòng:</strong> Nếu bạn muốn nhận hàng tại
                địa chỉ văn phòng làm việc, hãy cung cấp địa chỉ văn phòng của
                bạn khi đặt hàng. Chúng tôi sẽ giao sản phẩm đến địa chỉ này để
                bạn thuận tiện nhận.
              </li>
              <li>
                <strong>Các điểm nhận hàng khác:</strong> Ngoài ra, chúng tôi
                cũng có thể giao hàng đến các điểm nhận hàng khác như các trạm
                chuyển phát nhanh, bưu cục hoặc các cửa hàng đối tác. Nếu bạn
                muốn sử dụng một trong những điểm nhận hàng này, hãy thông báo
                cho chúng tôi và chọn điểm nhận hàng phù hợp với bạn.
              </li>
            </ul>
          </p>
          <p>
            Vui lòng chắc chắn rằng thông tin địa chỉ giao hàng của bạn là chính
            xác và chi tiết để đảm bảo rằng sản phẩm sẽ được giao đến đúng địa
            chỉ và đúng thời gian.
          </p>
        </div>
        <div className={`${cx('shipping-policy__item')} mt-5`}>
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

export default ShippingPolicy;
