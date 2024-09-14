import { Link } from 'react-router-dom';
import styles from '../scss/ExchangeReturnRefundPolicy.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ExchangeReturnRefundPolicy() {
  return (
    <div className="container">
      <div className={`${cx('exchange-return-refund-policy')} bg-light border`}>
        <div className="default-title mt-2 mb-4">
          CHÍNH SÁCH ĐỔI/TRẢ/HOÀN TIỀN
        </div>
        <p>
          Chào mừng bạn đến với <strong>Chính sách Đổi/Trả/Hoàn tiền</strong>{' '}
          của chúng tôi tại{' '}
          <Link to={'/'} className="text-primary">
            <strong> Tech Hub</strong>
          </Link>
          . Chúng tôi cam kết mang đến cho khách hàng trải nghiệm mua sắm trực
          tuyến an toàn và thuận lợi nhất có thể.{' '}
          <Link to={'/'} className="text-primary">
            <strong> Tech Hub</strong>
          </Link>{' '}
          luôn cam kết tất cả các thiết bị công nghệ bán tại{' '}
          <Link to={'/'} className="text-primary">
            <strong> Tech Hub</strong>
          </Link>{' '}
          đều là những sản phẩm chất lượng và có nguồn gốc rõ ràng, hợp pháp
          cũng như an toàn cho người tiêu dùng. Chúng tôi hiểu rằng quá trình
          mua sắm của quý khách là một trải nghiệm quan trọng, và với sứ mệnh
          đó, chúng tôi muốn đảm bảo rằng quý khách luôn hài lòng với mỗi giao
          dịch tại{' '}
          <Link to={'/'} className="text-primary">
            <strong> Tech Hub</strong>
          </Link>
          .
        </p>
        <p>
          Để đảm bảo sự hài lòng của quý khách, chúng tôi khuyến nghị quý khách
          kiểm tra kỹ các nội dung sau trước khi nhận thiết bị công nghệ của
          mình:
          <ul>
            <li>
              <strong>Thông tin sản phẩm:</strong> Hãy kiểm tra kỹ tên sản phẩm
              và chất lượng sản phẩm, đảm bảo rằng sản phẩm bạn nhận được đúng
              với thông tin mô tả trên website của chúng tôi.
            </li>
            <li>
              <strong>Số lượng sản phẩm:</strong> Xác nhận số lượng sản phẩm bạn
              nhận được có phù hợp với đơn đặt hàng của bạn. Trong trường hợp có
              bất kỳ sai sót nào, vui lòng liên hệ ngay với bộ phận Chăm sóc
              khách hàng của chúng tôi để được hỗ trợ.
            </li>
          </ul>
        </p>
        <p>
          <Link to={'/'} className="text-primary">
            <strong> Tech Hub</strong>
          </Link>{' '}
          cam kết bảo vệ quyền lợi của khách hàng thông qua chính sách
          đổi/trả/hoàn tiền, nhằm bảo đảm rằng quý khách sẽ luôn nhận được sản
          phẩm chất lượng và dịch vụ tốt nhất từ chúng tôi. Trong trường hợp
          hiếm hoi sản phẩm quý khách nhận được có khiếm khuyết, hư hỏng hoặc
          không như mô tả, chúng tôi cam kết sẽ xử lý vấn đề một cách nhanh
          chóng và hiệu quả, bằng cách đổi sản phẩm hoặc hoàn tiền cho quý
          khách. Để hiểu rõ hơn về các điều khoản và điều kiện áp dụng cho việc
          đổi/trả/hoàn tiền, vui lòng tham khảo nội dung dưới đây:
        </p>
        <div className={`${cx('exchange-return-refund-policy__item')} mt-5`}>
          <h3 className="mb-3">
            <strong>
              1. Phân biệt giữa lỗi từ nhà cung cấp và lỗi từ người dùng:
            </strong>
          </h3>
          <p>
            Lỗi do nhà cung cấp:
            <ul>
              <li>
                <strong>Khái niệm: </strong>Đây là các vấn đề xuất phát từ quá
                trình sản xuất, vận chuyển, hoặc lỗi nguyên vật liệu của sản
                phẩm. Trong một số trường hợp, nhà cung cấp có thể không tuân
                thủ đúng các tiêu chuẩn chất lượng, dẫn đến sản phẩm cuối cùng
                không đạt yêu cầu.
              </li>
              <li>
                <strong>Lỗi do quá trình sản xuất:</strong> Các lỗi có thể bao
                gồm việc sử dụng nguyên liệu không đạt chất lượng, thiết kế sản
                phẩm không chính xác, hoặc quy trình sản xuất không đảm bảo.
              </li>
              <li>
                <strong>Lỗi do vận chuyển:</strong> Trong quá trình vận chuyển,
                sản phẩm có thể gặp phải các vấn đề như hỏng hóc, va đập, hoặc
                ẩm ướt do không đảm bảo điều kiện vận chuyển an toàn.
              </li>
              <li>
                <strong>Các vấn đề khác:</strong> Có thể có những lỗi liên quan
                đến đóng gói không đúng cách, gây ra hỏng hóc hoặc tổn thất.
              </li>
            </ul>
          </p>
          <p>
            Lỗi do người dùng:
            <ul>
              <li>
                <strong>Khái niệm: </strong>Đây là các vấn đề phát sinh sau khi
                sản phẩm được giao đến tay người dùng, thường do sử dụng không
                đúng cách, bảo quản không đúng, hoặc thiếu hiểu biết về cách sử
                dụng sản phẩm.
              </li>
              <li>
                <strong>Sử dụng không đúng cách:</strong> Người dùng có thể gặp
                phải các vấn đề khi không tuân thủ hướng dẫn sử dụng của sản
                phẩm, sử dụng quá tải, hoặc không bảo dưỡng đúng cách.
              </li>
              <li>
                <strong>Bảo quản không đúng:</strong> Việc bảo quản sản phẩm
                không đúng cách có thể dẫn đến việc hỏng hóc, mất hiệu suất hoặc
                giảm tuổi thọ của sản phẩm.
              </li>
              <li>
                <strong>Thiếu hiểu biết:</strong> Đôi khi, người dùng có thể gặp
                phải các vấn đề do thiếu thông tin về sản phẩm hoặc không hiểu
                rõ về cách sử dụng đúng cách.
              </li>
            </ul>
          </p>
          <p>
            Trong mọi trường hợp, việc xác định nguyên nhân của lỗi rất quan
            trọng để có thể áp đặt biện pháp sửa chữa hoặc đảm bảo các quyền lợi
            pháp lý phù hợp cho cả nhà cung cấp và người dùng.
          </p>
        </div>
        <div className={`${cx('exchange-return-refund-policy__item')} mt-5`}>
          <h3 className="mb-3">
            <strong>2. Thời gian áp dụng đổi/trả:</strong>
          </h3>
          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col">Loại sản phẩm</th>
                <th scope="col">Thời gian từ khi nhận được hàng</th>
                <th scope="col">KHÔNG BỊ LỖI</th>
                <th scope="col">BỊ LỖI (do nhà cung cấp)</th>
                <th scope="col">BỊ LỖI (do người dùng)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowSpan={4} scope="row">
                  Có tem phiếu bảo hành từ nhà cung cấp
                </th>
                <td rowSpan={2}>7 ngày đầu tiên</td>
                <td rowSpan={3}>Trả hoàn trả phí</td>
                <td rowSpan={1}>Đổi mới không thu phí</td>
                <td rowSpan={4}>
                  Bảo hành (hoặc sửa chữa) có thu phí (hoặc không nếu vấn đề
                  nhỏ) theo quy định của nhà cung cấp
                </td>
              </tr>
              <tr>
                <td rowSpan={1}>Trả hoàn trả phí</td>
              </tr>
              <tr>
                <td rowSpan={1}>8 - 30 ngày</td>
                <td rowSpan={1}>Bảo hành</td>
              </tr>
              <tr>
                <td rowSpan={1}>30 ngày trở đi</td>
                <td rowSpan={1}>Không hỗ trợ đổi/trả</td>
                <td rowSpan={1}>Bảo hành</td>
              </tr>
              <tr>
                <th rowSpan={3} scope="row">
                  Voucher/E-voucher
                </th>
                <td rowSpan={2}>0 - 30 ngày</td>
                <td rowSpan={2}>Không hỗ trợ đổi/trả</td>
                <td rowSpan={1}>Đổi mới không thu phí</td>
                <td rowSpan={2}>Không hỗ trợ đổi/trả</td>
              </tr>
              <tr>
                <td rowSpan={1}>Trả hoàn trả phí</td>
              </tr>
              <tr>
                <td rowSpan={1}>30 ngày trở đi</td>
                <td rowSpan={1} colSpan={3}>
                  Không hỗ trợ đổi/trả
                </td>
              </tr>
              <tr>
                <th rowSpan={3}>Các loại còn lại</th>
                <td rowSpan={2}>0 - 30 ngày</td>
                <td rowSpan={2}>Trả hoàn trả phí</td>
                <td rowSpan={1}>Đổi mới không thu phí</td>
                <td rowSpan={3}>Không hỗ trợ đổi/trả</td>
              </tr>
              <tr>
                <td rowSpan={1}>Trả hoàn trả phí</td>
              </tr>
              <tr>
                <td rowSpan={1}>30 ngày trở đi</td>
                <td colSpan={2}>Không hỗ trợ đổi/trả</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={`${cx('exchange-return-refund-policy__item')} mt-5`}>
          <h3 className="mb-3">
            <strong>3. Yêu cầu khi đổi trả:</strong>
          </h3>
          <p>
            <Link to={'/'} className="text-primary">
              <strong> Tech Hub</strong>
            </Link>{' '}
            cam kết hỗ trợ đổi/trả sản phẩm cho quý khách hàng nếu các điều kiện
            sau được đáp ứng:
            <ul>
              <li>
                <strong>
                  Sản phẩm vẫn giữ nguyên bao bì như khi được nhận ban đầu:
                </strong>{' '}
                Điều này đảm bảo rằng sản phẩm không bị mất tính mới và nguyên
                vẹn của nó.
              </li>
              <li>
                <strong>
                  Sản phẩm đi kèm đầy đủ các phụ kiện và quà tặng khuyến mãi
                  (nếu có) theo quy định của sản phẩm đó:
                </strong>{' '}
                Chúng tôi luôn mong muốn đảm bảo rằng khách hàng nhận được một
                trải nghiệm mua sắm đầy đủ và đáng tin cậy.
              </li>
              <li>
                <strong>
                  Cung cấp hóa đơn GTGT (nếu có) đi kèm với sản phẩm
                </strong>{' '}
                Thông tin trên hóa đơn sẽ được sử dụng để xác minh thông tin về
                sản phẩm và giao dịch mua bán.
              </li>
              <li>
                <strong>
                  Cung cấp đầy đủ thông tin đối chứng theo yêu cầu của chúng
                  tôi:
                </strong>{' '}
                Điều này bao gồm việc cung cấp thông tin như số hóa đơn, ngày
                mua hàng, và bất kỳ thông tin khác cần thiết để xác minh và xử
                lý yêu cầu đổi/trả sản phẩm một cách chính xác và nhanh chóng.
              </li>
            </ul>
          </p>
          <p>
            Chúng tôi cam kết tuân thủ chính sách đổi/trả sản phẩm của mình một
            cách công bằng và minh bạch, nhằm đảm bảo sự hài lòng và tin tưởng
            của quý khách hàng đối với dịch vụ của chúng tôi.
          </p>
        </div>
        <div className={`${cx('exchange-return-refund-policy__item')} mt-5`}>
          <h3 className="mb-3">
            <strong>4. Quy trình đổi trả:</strong>
          </h3>
          <p>
            Khi quý khách hàng gặp vấn đề với sản phẩm mua tại{' '}
            <Link to={'/'} className="text-primary">
              <strong> Tech Hub</strong>
            </Link>
            , chúng tôi đảm bảo rằng quy trình đổi trả sẽ được thực hiện một
            cách thuận lợi và minh bạch. Dưới đây là các bước chi tiết trong quy
            trình đổi/trả sản phẩm của chúng tôi để đảm bảo rằng quý khách hàng
            nhận được sự hỗ trợ tốt nhất từ chúng tôi:
            <ul>
              <li>
                <strong>Liên hệ và Thông báo vấn đề:</strong> Khách hàng liên hệ
                với bộ phận chăm sóc khách hàng của{' '}
                <Link to={'/'} className="text-primary">
                  <strong> Tech Hub</strong>
                </Link>{' '}
                thông qua điện thoại, email hoặc hệ thống trò chuyện trực tuyến
                để thông báo về vấn đề cụ thể với sản phẩm cần đổi/trả.
              </li>
              <li>
                <strong>Xác nhận thông tin:</strong> Chúng tôi tiếp nhận thông
                tin từ khách hàng và yêu cầu cung cấp các thông tin cần thiết
                như hóa đơn mua hàng, hình ảnh sản phẩm bị lỗi (nếu có) để tiếp
                tục quy trình đổi trả.
              </li>
              <li>
                <strong>Xử lý yêu cầu:</strong> Đội ngũ chuyên viên chăm sóc
                khách hàng của chúng tôi sẽ xem xét yêu cầu và quyết định về
                việc đổi trả sản phẩm dựa trên chính sách đổi trả hiện tại của
                công ty.
              </li>
              <li>
                <strong>Hướng dẫn gửi sản phẩm:</strong> Nếu yêu cầu đổi trả
                được chấp nhận, chúng tôi sẽ hướng dẫn khách hàng về quy trình
                gửi sản phẩm về cửa hàng hoặc trung tâm bảo hành của chúng tôi.
              </li>
              <li>
                <strong>Kiểm tra và xác nhận:</strong> Sau khi nhận được sản
                phẩm đổi trả, chúng tôi sẽ kiểm tra sản phẩm để đảm bảo rằng nó
                đáp ứng các điều kiện đổi trả và thông báo lại cho khách hàng về
                quyết định cuối cùng.
              </li>
              <li>
                <strong>Xử lý đổi trả:</strong> Nếu sản phẩm đáp ứng các tiêu
                chí đổi trả, chúng tôi sẽ tiến hành đổi trả sản phẩm mới hoặc
                hoàn tiền cho khách hàng tùy thuộc vào sự ưng ý của họ.
              </li>
              <li>
                <strong>Hoàn tất quy trình:</strong> Sau khi đổi trả được hoàn
                tất, chúng tôi sẽ thông báo cho khách hàng và đảm bảo rằng họ đã
                nhận được sản phẩm mới hoặc hoàn tiền một cách chính xác và đầy
                đủ.
              </li>
              <li>
                <strong>Phản hồi và Hỗ trợ:</strong>{' '}
                <Link to={'/'} className="text-primary">
                  <strong> Tech Hub</strong>
                </Link>{' '}
                luôn mở đường cho phản hồi từ khách hàng về quy trình đổi/trả để
                cải thiện dịch vụ trong tương lai. Nếu cần, chúng tôi sẽ tiếp
                tục hỗ trợ khách hàng để đảm bảo hài lòng và niềm tin của họ.
              </li>
            </ul>
          </p>
          <p>
            Với quy trình đổi/trả sản phẩm chặt chẽ và đồng lòng của đội ngũ,
            chúng tôi cam kết mang lại trải nghiệm mua sắm dễ dàng và thoải mái
            nhất cho quý khách hàng.
          </p>
        </div>
        <div className={`${cx('exchange-return-refund-policy__item')} mt-5`}>
          <h3 className="mb-3">
            <strong>5. Một số lưu ý:</strong>
          </h3>
          <p>
            Quý khách vui lòng thông báo cho{' '}
            <Link to={'/'} className="text-primary">
              <strong> Tech Hub</strong>
            </Link>{' '}
            ngay khi:
            <ul>
              <li>
                Thiết bị công nghệ giao tới ngoại quan bên ngoài có dấu hiệu hư
                hại, sản phẩm bên trong trầy xước, gãy, móp méo, hoặc có dấu
                hiệu khác về sự tổn thất trong vòng 7 ngày kể từ khi nhận hàng
                thành công.
              </li>
              <li>
                Sản phẩm giao tới không đúng với đơn đặt hàng, hoặc thiếu hàng
                trong vòng 7 ngày kể từ khi nhận hàng thành công.
              </li>
            </ul>
          </p>
          <p>
            Sau khi{' '}
            <Link to={'/'} className="text-primary">
              <strong> Tech Hub</strong>
            </Link>{' '}
            xác nhận email tiếp nhận yêu cầu kiểm tra và xử lý, chúng tôi sẽ
            liên hệ với quý khách để xác nhận thông tin hoặc yêu cầu bổ sung
            thông tin (nếu cần). Trong trường hợp không thể liên hệ được,{' '}
            <Link to={'/'} className="text-primary">
              <strong> Tech Hub</strong>
            </Link>{' '}
            rất tiếc phải từ chối xử lý yêu cầu. Thời gian chúng tôi sẽ liên hệ
            là trong giờ hành chính và tối đa là 3 lần trong vòng 7 ngày sau khi
            nhận được thông tin yêu cầu.
          </p>
          <p>
            Chúng tôi cam kết kiểm tra và giải quyết mọi trường hợp trên cho quý
            khách trong vòng tối đa 30 ngày làm việc kể từ khi quý khách nhận
            được hàng. Quá thời hạn này, rất tiếc chúng tôi sẽ không thể giải
            quyết khiếu nại của quý khách.
          </p>
        </div>
        <div className={`${cx('exchange-return-refund-policy__item')} mt-5`}>
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

export default ExchangeReturnRefundPolicy;
