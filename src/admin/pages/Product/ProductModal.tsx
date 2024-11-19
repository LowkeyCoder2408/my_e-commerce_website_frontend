import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { backendEndpoint } from '../../../utils/Service/Constant';
import Loader from '../../../utils/Loader';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Add, Edit } from '@mui/icons-material';
import UploadImageInput from '../../../utils/UploadImageInput';
import { toast } from 'react-toastify';
import { isTokenExpired } from '../../../utils/Service/JwtService';
import { useAuth } from '../../../utils/Context/AuthContext';
// import { addAProduct, updateAProduct } from '../../../api/ProductAPI';
import ProductModel from '../../../models/ProductModel';
import CategoryModel from '../../../models/CategoryModel';
import { getAllCategories } from '../../../api/CategoryAPI';
import BrandModel from '../../../models/BrandModel';
import { getAllBrands } from '../../../api/BrandAPI';
import 'react-quill/dist/quill.snow.css';
import { useQuill } from 'react-quilljs';
import { addAProduct } from '../../../api/ProductAPI';

interface ProductModalProps {
  productId: number | undefined;
  option: string;
  setKeyCountReload: Dispatch<SetStateAction<number>>;
  handleCloseProductModal: any;
}

const ProductModal = (props: ProductModalProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { quill, quillRef } = useQuill();

  const [product, setProduct] = useState<ProductModel | null>(null);

  const [productName, setProductName] = useState<string>('');
  const [productNameError, setProductNameError] = useState<string>('');
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');
  const [brands, setBrands] = useState<BrandModel[]>([]);
  const [brandName, setBrandName] = useState<string>('');
  const [listedPrice, setListedPrice] = useState<number>(0);
  const [listedPriceError, setListedPriceError] = useState<string>('');
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [currentPriceError, setCurrentPriceError] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [quantityError, setQuantityError] = useState<string>('');
  const [operatingSystem, setOperatingSystem] = useState<string>('');
  const [weight, setWeight] = useState<number>(0);
  const [weightError, setWeightError] = useState<string>('');
  const [length, setLength] = useState<number>(0);
  const [lengthError, setLengthError] = useState<string>('');
  const [width, setWidth] = useState<number>(0);
  const [widthError, setWidthError] = useState<string>('');
  const [height, setHeight] = useState<number>(0);
  const [heightError, setHeightError] = useState<string>('');
  const [shortDescription, setShortDescription] = useState<string>('');
  const [fullDescription, setFullDescription] = useState<string>('');
  const [mainImagePreview, setMainImagePreview] = useState<string>('');
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [relatedImagesFiles, setRelatedImagesFiles] = useState<File[]>([]);
  const [relatedImagesPreview, setRelatedImagesPreview] = useState<string[]>(
    [],
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log({
      mainImagePreview,
      mainImageFile,
      relatedImagesPreview,
      relatedImagesFiles,
    });
  }, [
    mainImagePreview,
    mainImageFile,
    relatedImagesPreview,
    relatedImagesFiles,
  ]);

  const fetchCategories = async () => {
    try {
      const categories = await getAllCategories();
      setCategories(categories.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const brands = await getAllBrands();
      setBrands(brands.brands);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${backendEndpoint}/products/${props.productId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setProduct(result);
      setProductName(result.name);
      setCategoryName(result.category.name);
      setBrandName(result.brand.name);
      setListedPrice(result.listedPrice);
      setCurrentPrice(result.currentPrice);
      setQuantity(result.quantity);
      setOperatingSystem(result.operatingSystem);
      setWeight(result.weight);
      setLength(result.length);
      setWidth(result.width);
      setHeight(result.height);
      setShortDescription(result.shortDescription);
      setFullDescription(result.fullDescription);
      setMainImagePreview(result.mainImage);
      if (result.images && result.images.length > 0) {
        setRelatedImagesPreview(
          result.images.map((image: { url: string }) => image.url),
        );
      } else {
        setRelatedImagesPreview([]);
      }
    } catch (error) {
      console.log('Lỗi khi lấy sản phẩm: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm check có đúng định dạng không
  const checkEmpty = (setErrorFunction: any, content: string) => {
    if (content.trim() === '') {
      setErrorFunction('Trường này không được để trống');
      return true;
    } else {
      setErrorFunction('');
      return false;
    }
  };

  const handleCheckListedPrice = (value: number) => {
    if (isNaN(value) || !Number.isInteger(value)) {
      setListedPriceError('Giá niêm yết phải là số nguyên');
    } else if (value < 0) {
      setListedPriceError('Giá niêm yết không thể là số âm');
    } else if (value < currentPrice) {
      setListedPriceError('Giá niêm yết phải lớn hơn (hoặc bằng) giá hiện tại');
    } else {
      setListedPriceError('');
    }
  };

  const handleCheckCurrentPrice = (value: number) => {
    if (isNaN(value) || !Number.isInteger(value)) {
      setCurrentPriceError('Giá hiện tại phải là số nguyên');
    } else if (value < 0) {
      setCurrentPriceError('Giá hiện tại không thể là số âm');
    } else if (value > listedPrice) {
      setCurrentPriceError(
        'Giá hiện tại phải nhỏ hơn (hoặc bằng) giá niêm yết',
      );
    } else {
      setCurrentPriceError('');
    }
  };

  const handleCheckQuantity = (value: number) => {
    if (isNaN(value) || !Number.isInteger(value)) {
      setQuantityError('Số lượng phải là số nguyên');
    } else if (value < 0) {
      setQuantityError('Số lượng phải là số không âm');
    } else {
      setQuantityError('');
    }
  };

  const handleCheckParameter = (
    value: number,
    setError: (message: string) => void,
  ) => {
    if (isNaN(value)) {
      setError(`Trường này phải là một số`);
    } else if (value < 0) {
      setError(`Trường này phải là số không âm`);
    } else {
      setError('');
    }
  };

  const handleSubmit = () => {
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

    setSubmitLoading(true);

    if (props.option === 'add') {
      addAProduct(
        productName,
        categoryName,
        brandName,
        listedPrice,
        currentPrice,
        quantity,
        operatingSystem,
        weight,
        length,
        width,
        height,
        shortDescription,
        fullDescription,
        mainImageFile,
        relatedImagesFiles,
      )
        .then((data) => {
          if (data.status === 'success') {
            toast.success(data.message || 'Thêm sản phẩm mới thành công');
            props.handleCloseProductModal();
            props.setKeyCountReload(Math.random());
          } else {
            toast.error(data.message || 'Đã có lỗi xảy ra, vui lòng thử lại');
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error('Đã có lỗi trong quá trình xử lý');
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    } else {
      // updateAProduct(
      //   props.productId || 0,
      //   firstName,
      //   lastName,
      //   phoneNumber,
      //   productRoles,
      //   mainImageFile,
      // )
      //   .then((data) => {
      //     if (data.status === 'success') {
      //       toast.success(data.message || 'Cập nhật sản phẩm thành công');
      //       props.handleCloseProductModal();
      //       props.setKeyCountReload(Math.random());
      //     } else {
      //       toast.error(data.message || 'Đã có lỗi xảy ra, vui lòng thử lại');
      //     }
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //     toast.error('Đã có lỗi trong quá trình xử lý');
      //   })
      //   .finally(() => {
      //     setSubmitLoading(false);
      //   });
    }
  };

  const handleUploadMainImage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      if (event.target.files.length > 1) {
        toast.error(`Bạn chỉ được tải lên tối đa 1 ảnh`);
        return;
      }
      const selectedImage = event.target.files[0];
      setMainImageFile(selectedImage);
      setMainImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleRelatedImagesUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedImages: File[] = Array.from(event.target.files);

      if ((relatedImagesPreview?.length || 0) + selectedImages.length > 5) {
        toast.error('Không thể thêm quá 5 ảnh liên quan');
        return;
      }

      setRelatedImagesFiles((prevFiles) => [
        ...(prevFiles || []),
        ...selectedImages,
      ]);

      const newImagePreviews = selectedImages.map((selectedImage) =>
        URL.createObjectURL(selectedImage),
      );
      setRelatedImagesPreview((prevImagePreviews) => [
        ...prevImagePreviews,
        ...newImagePreviews,
      ]);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    if (props.productId) {
      fetchProduct();
    }
  }, [props.productId]);

  useEffect(() => {
    if (quill && fullDescription) {
      quill.clipboard.dangerouslyPasteHTML(fullDescription);
    }
  }, [quill]);

  useEffect(() => {
    if (quill) {
      const handleTextChange = () => {
        setFullDescription(quillRef.current.firstChild.innerHTML);
      };

      quill.on('text-change', handleTextChange);
      return () => {
        quill.off('text-change', handleTextChange);
      };
    }
  }, [quill]);

  useEffect(() => {
    handleCheckListedPrice(listedPrice);
    handleCheckCurrentPrice(currentPrice);
  }, [listedPrice, currentPrice]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="default-title text-center">
        {props.option === 'add'
          ? 'TẠO SẢN PHẨM MỚI'
          : 'CHỈNH SỬA THÔNG TIN SẢN PHẨM'}
      </div>
      <div className="row mt-3">
        <div className="mb-4 col-xxl-12">
          <TextField
            required
            fullWidth
            helperText={productNameError}
            type="text"
            id="standard-required"
            label="Tên sản phẩm"
            value={productName}
            error={productNameError.length > 0}
            variant="standard"
            onChange={(e) => {
              setProductName(e.target.value);
              checkEmpty(setProductNameError, e.target.value);
            }}
            className="input-field"
            InputLabelProps={{
              style: { fontSize: '1.5rem' },
            }}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1.6rem',
                fontWeight: '500',
              },
              '& .MuiFormHelperText-root': {
                fontSize: '1rem',
              },
            }}
          />
        </div>
        <div className="mb-4 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12">
          <FormControl fullWidth variant="standard">
            <InputLabel
              id="demo-simple-select-standard-label"
              sx={{ fontSize: '1.5rem' }}
            >
              Danh mục sản phẩm (*)
            </InputLabel>
            <Select
              required
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              variant="standard"
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value + '');
              }}
              sx={{
                '& .MuiSelect-select': {
                  fontSize: '1.6rem',
                  fontWeight: '500',
                },
              }}
            >
              <MenuItem value="">
                <em>Chưa chọn danh mục</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="mb-4 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12">
          <FormControl fullWidth variant="standard">
            <InputLabel
              id="demo-simple-select-standard-label"
              sx={{ fontSize: '1.5rem' }}
            >
              Thương hiệu (*)
            </InputLabel>
            <Select
              required
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              variant="standard"
              value={brandName}
              onChange={(e) => {
                setBrandName(e.target.value + '');
              }}
              sx={{
                '& .MuiSelect-select': {
                  fontSize: '1.6rem',
                  fontWeight: '500',
                },
              }}
            >
              <MenuItem value="">
                <em>Chưa chọn thương hiệu</em>
              </MenuItem>
              {brands.map((brand) => (
                <MenuItem key={brand.id} value={brand.name}>
                  {brand.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="mb-4 col-6">
          <TextField
            required
            fullWidth
            helperText={listedPriceError}
            type="text"
            id="standard-required"
            label="Giá niêm yết"
            value={listedPrice}
            error={listedPriceError.length > 0}
            variant="standard"
            onChange={(e) => {
              const value: number = parseInt(e.target.value) || 0;
              setListedPrice(value);
              handleCheckListedPrice(value);
            }}
            className="input-field"
            InputLabelProps={{
              style: { fontSize: '1.5rem' },
            }}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1.6rem',
                fontWeight: '500',
              },
              '& .MuiFormHelperText-root': {
                fontSize: '1rem',
              },
            }}
          />
        </div>
        <div className="mb-4 col-6">
          <TextField
            required
            fullWidth
            helperText={currentPriceError}
            type="text"
            id="standard-required"
            label="Giá hiện tại"
            value={currentPrice}
            error={currentPriceError.length > 0}
            variant="standard"
            onChange={(e) => {
              const value: number = parseInt(e.target.value) || 0;
              setCurrentPrice(value);
              handleCheckCurrentPrice(value);
            }}
            className="input-field"
            InputLabelProps={{
              style: { fontSize: '1.5rem' },
            }}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1.6rem',
                fontWeight: '500',
              },
              '& .MuiFormHelperText-root': {
                fontSize: '1rem',
              },
            }}
          />
        </div>
        <div className="mb-4 col-6">
          <TextField
            required
            fullWidth
            helperText={quantityError}
            type="text"
            id="standard-required"
            label="Số lượng (tồn kho)"
            value={quantity}
            error={quantityError.length > 0}
            variant="standard"
            onChange={(e) => {
              const value: number = parseInt(e.target.value) || 0;
              setQuantity(value);
              handleCheckQuantity(value);
            }}
            className="input-field"
            InputLabelProps={{
              style: { fontSize: '1.5rem' },
            }}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1.6rem',
                fontWeight: '500',
              },
              '& .MuiFormHelperText-root': {
                fontSize: '1rem',
              },
            }}
          />
        </div>
        <div className="mb-4 col-6">
          <TextField
            fullWidth
            type="text"
            id="standard-required"
            label="Hệ điều hành"
            value={operatingSystem}
            variant="standard"
            onChange={(e) => {
              setOperatingSystem(e.target.value);
            }}
            className="input-field"
            InputLabelProps={{
              style: { fontSize: '1.5rem' },
            }}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1.6rem',
                fontWeight: '500',
              },
              '& .MuiFormHelperText-root': {
                fontSize: '1rem',
              },
            }}
          />
        </div>
        <div className="mb-4 col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-6">
          <TextField
            fullWidth
            helperText={weightError}
            type="text"
            id="standard-required"
            label="Trọng lượng (g)"
            value={weight}
            error={weightError.length > 0}
            variant="standard"
            onChange={(e) => {
              const value: number = parseFloat(e.target.value) || 0;
              setWeight(value);
              handleCheckParameter(value, setWeightError);
            }}
            className="input-field"
            InputLabelProps={{
              style: { fontSize: '1.5rem' },
            }}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1.6rem',
                fontWeight: '500',
              },
              '& .MuiFormHelperText-root': {
                fontSize: '1rem',
              },
            }}
          />
        </div>
        <div className="mb-4 col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-6">
          <TextField
            fullWidth
            helperText={lengthError}
            type="text"
            id="standard-required"
            label="Chiều dài (mm)"
            value={length}
            error={lengthError.length > 0}
            variant="standard"
            onChange={(e) => {
              const value: number = parseFloat(e.target.value) || 0;
              setLength(value);
              handleCheckParameter(value, setLengthError);
            }}
            className="input-field"
            InputLabelProps={{
              style: { fontSize: '1.5rem' },
            }}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1.6rem',
                fontWeight: '500',
              },
              '& .MuiFormHelperText-root': {
                fontSize: '1rem',
              },
            }}
          />
        </div>
        <div className="mb-4 col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-6">
          <TextField
            fullWidth
            helperText={widthError}
            type="text"
            id="standard-required"
            label="Chiều rộng (mm)"
            value={width}
            error={widthError.length > 0}
            variant="standard"
            onChange={(e) => {
              const value: number = parseFloat(e.target.value) || 0;
              setWidth(value);
              handleCheckParameter(value, setWidthError);
            }}
            className="input-field"
            InputLabelProps={{
              style: { fontSize: '1.5rem' },
            }}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1.6rem',
                fontWeight: '500',
              },
              '& .MuiFormHelperText-root': {
                fontSize: '1rem',
              },
            }}
          />
        </div>
        <div className="mb-4 col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-6">
          <TextField
            fullWidth
            helperText={heightError}
            type="text"
            id="standard-required"
            label="Chiều cao (mm)"
            value={height}
            error={heightError.length > 0}
            variant="standard"
            onChange={(e) => {
              const value: number = parseFloat(e.target.value) || 0;
              setHeight(value);
              handleCheckParameter(value, setHeightError);
            }}
            className="input-field"
            InputLabelProps={{
              style: { fontSize: '1.5rem' },
            }}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1.6rem',
                fontWeight: '500',
              },
              '& .MuiFormHelperText-root': {
                fontSize: '1rem',
              },
            }}
          />
        </div>
        <div className="mb-4 col-12">
          <TextField
            fullWidth
            // helperText={shortDescriptionError}
            type="text"
            id="standard-required"
            label="Mô tả ngắn"
            value={shortDescription}
            // error={shortDescriptionError.length > 0}
            variant="standard"
            onChange={(e) => {
              setShortDescription(e.target.value);
            }}
            className="input-field"
            InputLabelProps={{
              style: { fontSize: '1.5rem' },
            }}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1.6rem',
                fontWeight: '500',
              },
              '& .MuiFormHelperText-root': {
                fontSize: '1rem',
              },
            }}
          />
        </div>
        <div className="mb-4">
          <div style={{ height: 200 }} ref={quillRef}></div>
        </div>
        <div className="mb-4 col-12">
          <div className="d-flex mt-3">
            <UploadImageInput
              required
              title={
                props.option === 'add' || !product?.mainImage
                  ? 'Thêm ảnh'
                  : 'Chỉnh sửa ảnh'
              }
              handleImageUpload={handleUploadMainImage}
            />
          </div>
          {mainImagePreview && (
            <div
              className="mt-3 position-relative"
              style={{ width: '450px', maxWidth: '100%', borderRadius: '5px' }}
            >
              <img
                src={mainImagePreview}
                alt=""
                style={{ borderRadius: '5px' }}
              />
              <button
                onClick={() => {
                  setMainImageFile(null);
                  setMainImagePreview('');
                }}
                style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '-12px',
                  backgroundColor: '#ff3e3e',
                  color: '#fff',
                  border: '2px solid #fff',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '2rem',
                  fontWeight: '600',
                }}
              >
                &times;
              </button>
            </div>
          )}
        </div>
        <div className="mb-4 col-12">
          <div className="d-flex mt-3">
            <UploadImageInput
              required
              title={
                props.option === 'add' || !product?.mainImage
                  ? 'Thêm ảnh liên quan'
                  : 'Chỉnh sửa ảnh liên quan'
              }
              handleImageUpload={handleRelatedImagesUpload}
            />
          </div>
          {relatedImagesPreview && relatedImagesPreview.length > 0 && (
            <div className="mt-3 position-relative">
              <div
                className="d-flex flex-wrap gap-5"
                style={{
                  position: 'relative',
                  border: '1px dashed #ccc',
                  borderRadius: '5px',
                  padding: '20px',
                }}
              >
                {relatedImagesPreview.map((imageUrl, index) => (
                  <div
                    key={index}
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '5px',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt={`Related image ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  setRelatedImagesPreview([]);
                  setRelatedImagesFiles([]);
                }}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: '#ff3e3e',
                  color: '#fff',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1.7rem',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                &times;
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <LoadingButton
          // disabled={
          //   props.option === 'add'
          //     ? productName.trim() === '' ||
          //       productNameError.length > 0 ||
          //       (!mainImageFile && mainImagePreview.trim() === '')
          //     : productName.trim() === '' ||
          //       productNameError.length > 0 ||
          //       productName === product?.name ||
          //       (!mainImageFile && mainImagePreview.trim() === '') ||
          //       mainImagePreview === product?.mainImage
          // }
          fullWidth
          onClick={handleSubmit}
          loading={submitLoading}
          loadingPosition="start"
          startIcon={props.option === 'add' ? <Add /> : <Edit />}
          sx={{
            marginTop: '7px',
            padding: '3px 0',
            color: '#fff',
            backgroundColor: 'primary.light',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            '& svg': {
              color: 'white',
            },
            border: 'none',
            opacity: submitLoading ? 0.7 : 1,
            transition: 'opacity 0.3s ease',
            '&.Mui-disabled': {
              opacity: 0.7,
            },
          }}
        >
          <div className="text-white" style={{ fontSize: '1.6rem' }}>
            {props.option === 'add' ? (
              <>Tạo sản phẩm mới</>
            ) : (
              <>Chỉnh sửa thông tin sản phẩm</>
            )}
          </div>
        </LoadingButton>
      </div>
    </>
  );
};

export default ProductModal;
