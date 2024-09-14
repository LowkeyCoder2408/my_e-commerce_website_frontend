import { Link } from 'react-router-dom';
import styles from '../scss/WarrantyPolicy.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function WarrantyPolicy() {
  return (
    <div className="container">
      <div className={`${cx('warranty-policy')} bg-light border`}>
        <div className="default-title mt-2 mb-4">CHÍNH SÁCH BẢO HÀNH</div>
        <p>
          Chào mừng bạn đến với trang <strong>Chính sách Bảo hành</strong> của
          <Link to={'/'} className="text-primary">
            <strong> Tech Hub</strong>
          </Link>
        </p>
        <p>
          Trong hành trình không ngừng nâng cao chất lượng và mức độ hài lòng
          của khách hàng, chúng tôi tạo ra <strong>Chính sách Bảo hành</strong>{' '}
          này nhằm đảm bảo rằng mỗi sản phẩm mà{' '}
          <Link to={'/'} className="text-primary">
            <strong> Tech Hub</strong>
          </Link>{' '}
          cung cấp không chỉ là sự đầu tư vào công nghệ tiên tiến mà còn là sự
          tin cậy và an tâm cho mọi người dùng. Hãy dành thời gian để đọc kỹ và
          hiểu rõ <strong>Chính sách Bảo hành</strong> này, vì nó không chỉ định
          rõ quyền lợi của bạn như người tiêu dùng mà còn giúp bạn hiểu rõ hơn
          về cam kết của chúng tôi trong việc bảo vệ quyền lợi và sự hài lòng
          của bạn.
        </p>
        <div className={`${cx('warranty-policy__item')} mt-5`}>
          <h3 className="mb-3">
            <strong>1. Phạm vi bảo hành:</strong>
          </h3>
          <p>
            Tại{' '}
            <Link to={'/'} className="text-primary">
              <strong> Tech Hub</strong>
            </Link>
            , chúng tôi không chỉ là một nhà cung cấp sản phẩm công nghệ hàng
            đầu mà còn là đối tác tin cậy của bạn trong việc bảo vệ và đảm bảo
            sự hài lòng của khách hàng. Chúng tôi cam kết cung cấp sản phẩm chất
            lượng cao và bảo hành theo quy định chặt chẽ của nhà sản xuất, nhằm
            đảm bảo rằng mỗi sản phẩm mà chúng tôi cung cấp đều đáp ứng được yêu
            cầu và mong đợi của khách hàng.
            <ul>
              <li>
                <strong>Lỗi kỹ thuật:</strong> Phạm vi bảo hành của chúng tôi
                bao gồm các lỗi kỹ thuật xuất phát từ quá trình sản xuất, lắp
                ráp hoặc lỗi kỹ thuật bẩm sinh của sản phẩm. Các lỗi kỹ thuật có
                thể bao gồm nhưng không giới hạn: hỏng hóc phần cứng, lỗi chức
                năng, hoặc các vấn đề liên quan đến phần mềm. Chúng tôi cam kết
                sẽ khắc phục mọi lỗi kỹ thuật một cách nhanh chóng và hiệu quả
                để đảm bảo sự hoạt động ổn định và đáng tin cậy của sản phẩm.
              </li>
              <li>
                <strong>Lỗi vật liệu:</strong> Ngoài các lỗi kỹ thuật, phạm vi
                bảo hành của chúng tôi cũng áp dụng cho các lỗi về vật liệu, bao
                gồm các vấn đề như lỗi sơn, lỗi hoa văn, hoặc các vấn đề liên
                quan đến chất lượng vật liệu sử dụng trong quá trình sản xuất.
                Chúng tôi cam kết sẽ thay thế hoặc sửa chữa các sản phẩm có lỗi
                vật liệu để đảm bảo vẻ đẹp và tính thẩm mỹ của sản phẩm.
              </li>
              <li>
                <strong>Lỗi sản xuất:</strong> Sản phẩm của chúng tôi được sản
                xuất dưới sự giám sát chặt chẽ và tuân thủ các tiêu chuẩn chất
                lượng nghiêm ngặt. Tuy nhiên, trong trường hợp xuất hiện các lỗi
                sản xuất không mong muốn, chúng tôi sẽ chịu trách nhiệm và tiến
                hành các biện pháp khắc phục một cách kịp thời và chính xác
                nhất.
              </li>
            </ul>
          </p>
          <p>
            Quý khách hàng có thể yên tâm khi mua sắm tại{' '}
            <Link to={'/'} className="text-primary">
              <strong> Tech Hub</strong>
            </Link>
            , vì chúng tôi luôn đặt sự hài lòng và niềm tin của khách hàng lên
            hàng đầu. Bằng cách cung cấp dịch vụ bảo hành toàn diện và chuyên
            nghiệp, chúng tôi mong muốn giữ vững mối quan hệ lâu dài và mang lại
            trải nghiệm mua sắm tốt nhất cho quý khách hàng.
          </p>
        </div>
        <div className={`${cx('warranty-policy__item')} mt-5`}>
          <h3 className="mb-3">
            <strong>2. Thời gian bảo hành:</strong>
          </h3>
          <p>
            Tại{' '}
            <Link to={'/'} className="text-primary">
              <strong> Tech Hub</strong>
            </Link>
            , chúng tôi tôn trọng và tuân thủ các quy định về thời gian bảo hành
            được quy định cụ thể cho từng sản phẩm. Chúng tôi cam kết cung cấp
            thông tin rõ ràng và minh bạch về thời gian bảo hành của mỗi sản
            phẩm để đảm bảo quý khách hàng nhận được sự tin tưởng và an tâm khi
            mua sắm tại cửa hàng của chúng tôi.
          </p>
          <p>
            Thời gian bảo hành được quy định cụ thể cho từng sản phẩm và được
            ghi rõ trên hóa đơn mua hàng. Chúng tôi khuyến khích quý khách hàng
            kiểm tra và xác nhận thời gian bảo hành của sản phẩm trước khi hoàn
            thành giao dịch. Thông tin về thời gian bảo hành có thể thay đổi tùy
            theo loại sản phẩm và chính sách của nhà sản xuất, và chúng tôi cam
            kết tuân thủ mọi quy định và điều khoản áp dụng.
          </p>
          <p>
            Đối với các sản phẩm có thời gian bảo hành dài hơn, quý khách hàng
            cần lưu giữ hóa đơn mua hàng để làm căn cứ khi cần bảo hành. Hóa đơn
            mua hàng là bằng chứng hợp lệ và cần thiết để xác nhận thời gian mua
            hàng và điều kiện bảo hành của sản phẩm. Chúng tôi khuyến khích quý
            khách hàng lưu giữ hóa đơn mua hàng một cách cẩn thận và đảm bảo
            rằng thông tin trên hóa đơn được giữ nguyên và rõ ràng.
          </p>
          <p>
            Thời gian bảo hành được tính từ ngày mua hàng được ghi trên hóa đơn
            mua hàng. Trong thời gian bảo hành, chúng tôi cam kết sẽ chịu trách
            nhiệm và tiến hành các biện pháp khắc phục mọi lỗi kỹ thuật hoặc vật
            liệu của sản phẩm một cách nhanh chóng và chính xác nhất. Chúng tôi
            sẽ không thu phí cho bất kỳ dịch vụ bảo hành nào trong thời gian có
            hiệu lực của bảo hành.
          </p>
        </div>
        <div className={`${cx('warranty-policy__item')} mt-5`}>
          <h3 className="mb-3">
            <strong>3. Điều kiện áp dụng bảo hành:</strong>
          </h3>
          <p>
            Để đảm bảo quyền lợi của quý khách hàng và mục đích duy trì chất
            lượng sản phẩm, chúng tôi áp dụng các điều kiện sau đây:
            <ul>
              <li>
                <strong>
                  Sản phẩm còn trong thời gian bảo hành và chưa hết hạn:
                </strong>{' '}
                Điều kiện đầu tiên để có thể áp dụng bảo hành là sản phẩm cần
                phải còn trong thời gian bảo hành quy định và chưa hết hạn. Thời
                gian bảo hành cụ thể sẽ được quy định rõ trên hóa đơn mua hàng
                của quý khách.
              </li>
              <li>
                <strong>
                  Sản phẩm chưa qua sửa chữa từ các cơ sở sửa chữa không chính
                  hãng:
                </strong>
                Chúng tôi chỉ chấp nhận bảo hành cho các sản phẩm chưa từng được
                sửa chữa từ các cơ sở sửa chữa không chính hãng. Việc sửa chữa
                tại những nơi này có thể ảnh hưởng đến hiệu suất và tính năng
                của sản phẩm.
              </li>
              <li>
                <strong>
                  Sản phẩm chưa bị hỏng do nguyên nhân ngoài tác động từ người
                  sử dụng:
                </strong>
                Bảo hành chỉ áp dụng cho các lỗi kỹ thuật, lỗi về vật liệu hoặc
                lỗi sản xuất của sản phẩm. Sản phẩm không được bảo hành nếu bị
                hỏng do sử dụng không đúng cách hoặc có nguyên nhân ngoài tác
                động từ người sử dụng.
              </li>
              <li>
                <strong>
                  Sản phẩm chưa bị thiên tai, hỏng hóc do lực lượng mạnh mẽ,
                  hoặc sử dụng không đúng cách:
                </strong>
                Chúng tôi không chịu trách nhiệm bảo hành cho các trường hợp sản
                phẩm bị hỏng do thiên tai, hỏng hóc do lực lượng mạnh mẽ như va
                đập, rơi rớt, hoặc do sử dụng không đúng cách theo hướng dẫn sử
                dụng của nhà sản xuất.
              </li>
            </ul>
          </p>
          <p>
            Những điều kiện trên đều được thiết lập để đảm bảo quyền lợi của quý
            khách hàng và đảm bảo tính công bằng trong quá trình bảo hành.
          </p>
        </div>
        <div className={`${cx('warranty-policy__item')} mt-5`}>
          <h3 className="mb-3">
            <strong>4. Quy trình bảo hành:</strong>
          </h3>
          <p>
            Chúng tôi cam kết cung cấp dịch vụ bảo hành chuyên nghiệp và hiệu
            quả để đảm bảo quý khách hàng được hài lòng với sản phẩm của mình.
            Dưới đây là quy trình cụ thể mà{' '}
            <Link to={'/'} className="text-primary">
              <strong> Tech Hub</strong>
            </Link>{' '}
            thực hiện trong quá trình bảo hành:
            <ul>
              <li>
                <strong>Bước 1:</strong> Liên hệ với bộ phận Chăm sóc khách hàng
                của{' '}
                <Link to={'/'} className="text-primary">
                  <strong> Tech Hub</strong>
                </Link>
                : Quý khách hàng vui lòng liên hệ với bộ phận Chăm sóc khách
                hàng của chúng tôi để thông báo về vấn đề hoặc sự cố liên quan
                đến sản phẩm cần bảo hành.
              </li>
              <li>
                <strong>Bước 2:</strong> Gửi sản phẩm cần bảo hành: Sau khi
                thông báo vấn đề, quý khách hàng có thể gửi sản phẩm cần bảo
                hành đến địa chỉ quy định của{' '}
                <Link to={'/'} className="text-primary">
                  <strong> Tech Hub</strong>
                </Link>{' '}
                hoặc mang đến cửa hàng bán lẻ gần nhất để tiến hành bảo hành.
              </li>
              <li>
                <strong>Bước 3:</strong> Kiểm tra và xác nhận vấn đề:{' '}
                <Link to={'/'} className="text-primary">
                  <strong> Tech Hub</strong>
                </Link>{' '}
                sẽ tiến hành kiểm tra kỹ lưỡng và xác nhận vấn đề của sản phẩm,
                đảm bảo rằng mọi sự cố được đánh giá và xử lý một cách chính
                xác.
              </li>
              <li>
                <strong>Bước 4:</strong> Thực hiện biện pháp bảo hành: Sau khi
                xác nhận,{' '}
                <Link to={'/'} className="text-primary">
                  <strong> Tech Hub</strong>
                </Link>{' '}
                sẽ thực hiện các biện pháp bảo hành cần thiết như sửa chữa, thay
                thế linh kiện, hoặc cung cấp sản phẩm mới tương đương.
              </li>
              <li>
                <strong>Bước 5:</strong> Trả lại sản phẩm: Sau khi hoàn tất quá
                trình bảo hành, sản phẩm sẽ được trả lại cho khách hàng. Chúng
                tôi đảm bảo rằng sản phẩm đã được kiểm tra kỹ lưỡng và hoạt động
                hoàn toàn trước khi trả lại.
              </li>
            </ul>
          </p>
        </div>

        <div className={`${cx('warranty-policy__item')} mt-5`}>
          <h3 className="mb-3">
            <strong>5. Một số lưu ý:</strong>
          </h3>
          <p>
            Để đảm bảo quá trình bảo hành diễn ra một cách thuận lợi và hiệu
            quả, xin vui lòng lưu ý các điều sau:
            <ul>
              <li>
                <strong>Bảo quản hóa đơn mua hàng:</strong> Vui lòng lưu giữ hóa
                đơn mua hàng của bạn, đặc biệt là trong thời gian bảo hành. Hóa
                đơn này sẽ là bằng chứng để chứng minh thời gian bảo hành cũng
                như điều kiện áp dụng bảo hành.
              </li>
              <li>
                <strong>Kiểm tra sản phẩm khi nhận hàng:</strong> Khi nhận được
                sản phẩm từ dịch vụ vận chuyển, vui lòng kiểm tra kỹ lưỡng sản
                phẩm để đảm bảo rằng không có hỏng hóc nào xảy ra trong quá
                trình vận chuyển. Nếu có bất kỳ sự cố nào, vui lòng thông báo
                ngay cho chúng tôi.
              </li>
              <li>
                <strong>Bảo quản sản phẩm đúng cách:</strong> Để tránh các sự cố
                không mong muốn, vui lòng bảo quản sản phẩm theo hướng dẫn của
                nhà sản xuất. Tránh tiếp xúc với nước, bụi bẩn, và các yếu tố
                môi trường có thể gây hại cho sản phẩm.
              </li>
              <li>
                <strong>Sử dụng sản phẩm đúng cách:</strong> Xin vui lòng sử
                dụng sản phẩm theo hướng dẫn của nhà sản xuất để tránh các sự cố
                do sử dụng không đúng cách gây ra.
              </li>
              <li>
                <strong>Liên hệ ngay khi có vấn đề:</strong> Nếu bạn gặp bất kỳ
                vấn đề hoặc sự cố nào liên quan đến sản phẩm, vui lòng liên hệ
                với bộ phận Chăm sóc khách hàng của chúng tôi ngay lập tức để
                được hỗ trợ.
              </li>
            </ul>
          </p>
        </div>
        <div className={`${cx('warranty-policy__item')} mt-5`}>
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

export default WarrantyPolicy;
