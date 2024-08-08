import { backendEndpoint } from '../utils/Constant';
import ProductModel from '../models/ProductModel';
import { myRequest } from './MyRequest';

interface ResultInterface {
  result: ProductModel[];
  totalPages: number;
  totalElements: number;
}

async function getProducts(url: string): Promise<ResultInterface> {
  const response = await myRequest(url);
  const responseData: any = response.content;
  const totalPages: number = response.totalPages;
  const totalElements: number = response.totalElements;

  const result = responseData.map((data: any) => ({
    id: data.id,
    name: data.name,
    alias: data.alias,
    shortDescription: data.shortDescription,
    listedPrice: data.listedPrice,
    weight: data.weight,
    mainImage: data.mainImage,
    category: data.category,
    brand: data.brand,
    images: data.images,
    fullDescription: data.fullDescription,
    createdTime: data.createdTime,
    updatedTime: data.updatedTime,
    enabled: data.enabled,
    quantity: data.quantity,
    soldQuantity: data.soldQuantity,
    currentPrice: data.currentPrice,
    discountPercent: data.discountPercent,
    length: data.length,
    width: data.width,
    height: data.height,
    operatingSystem: data.operatingSystem,
    mainImagePublicId: data.mainImagePublicId,
    ratingCount: data.ratingCount,
    averageRating: data.averageRating,
  }));

  return {
    result: result,
    totalPages: totalPages,
    totalElements: totalElements,
  };
}

export async function getAllProducts(): Promise<ResultInterface> {
  const url = backendEndpoint + '/products?size=100';
  return getProducts(url);
}

export async function getAllFilteredProducts(
  size: number,
  page: number,
  filter: number,
  minPrice: number,
  maxPrice: number,
): Promise<ResultInterface> {
  let filterEndpoint = '';
  switch (filter) {
    case 1:
      filterEndpoint = 'sortBy=createdTime&sortDir=desc';
      break;
    case 2:
      filterEndpoint = 'sortBy=createdTime&sortDir=asc';
      break;
    case 3:
      filterEndpoint = 'sortBy=currentPrice&sortDir=asc';
      break;
    case 4:
      filterEndpoint = 'sortBy=currentPrice&sortDir=desc';
      break;
    case 5:
      filterEndpoint = 'sortBy=discountPercent&sortDir=desc';
      break;
    case 6:
      filterEndpoint = 'sortBy=discountPercent&sortDir=asc';
      break;
    default:
      filterEndpoint = 'sortBy=id&sortDir=asc';
  }

  let query = `size=${size}&page=${page}`;
  if (minPrice !== undefined && minPrice !== null) {
    query += `&minPrice=${minPrice}`;
  }
  if (maxPrice !== undefined && maxPrice !== null) {
    query += `&maxPrice=${maxPrice}`;
  }
  if (filterEndpoint) {
    query += `&${filterEndpoint}`;
  }
  const url = `${backendEndpoint}/products?${query}`;

  return getProducts(url);
}

export async function findProductsByCategoryId(
  categoryId: number,
): Promise<ProductModel[]> {
  const url = `${backendEndpoint}/products/findByCategoryId?categoryId=${categoryId}`;

  const responseData = await myRequest(url);

  const result = responseData.map((data: any) => ({
    id: data.id,
    name: data.name,
    alias: data.alias,
    shortDescription: data.shortDescription,
    listedPrice: data.listedPrice,
    weight: data.weight,
    mainImage: data.mainImage,
    category: data.category,
    brand: data.brand,
    images: data.images,
    fullDescription: data.fullDescription,
    createdTime: data.createdTime,
    updatedTime: data.updatedTime,
    enabled: data.enabled,
    quantity: data.quantity,
    soldQuantity: data.soldQuantity,
    currentPrice: data.currentPrice,
    discountPercent: data.discountPercent,
    length: data.length,
    width: data.width,
    height: data.height,
    operatingSystem: data.operatingSystem,
    mainImagePublicId: data.mainImagePublicId,
    ratingCount: data.ratingCount,
    averageRating: data.averageRating,
  }));

  return result;
}

export function getTotalProductQuantity(products: ProductModel[]): number {
  let totalQuantity = 0;
  for (const product of products) {
    if (product.quantity) {
      totalQuantity += product.quantity;
    }
  }
  return totalQuantity;
}

export async function getDealProducts(
  totalElements: number,
): Promise<ProductModel[]> {
  const url: string =
    backendEndpoint +
    `/products/findProductsByPriceDifferencePrice?size=${totalElements}`;

  const responseData = await myRequest(url);

  const result = responseData.map((data: any) => ({
    id: data.id,
    name: data.name,
    alias: data.alias,
    shortDescription: data.shortDescription,
    listedPrice: data.listedPrice,
    weight: data.weight,
    mainImage: data.mainImage,
    category: data.category,
    brand: data.brand,
    images: data.images,
    fullDescription: data.fullDescription,
    createdTime: data.createdTime,
    updatedTime: data.updatedTime,
    enabled: data.enabled,
    quantity: data.quantity,
    soldQuantity: data.soldQuantity,
    currentPrice: data.currentPrice,
    discountPercent: data.discountPercent,
    length: data.length,
    width: data.width,
    height: data.height,
    operatingSystem: data.operatingSystem,
    mainImagePublicId: data.mainImagePublicId,
    ratingCount: data.ratingCount,
    averageRating: data.averageRating,
  }));

  return result;
}

export async function getTopSoldProducts(
  totalElements: number,
): Promise<ResultInterface> {
  const url: string =
    backendEndpoint +
    `/products?sortBy=soldQuantity&sortDir=desc&size=${totalElements}`;

  return getProducts(url);
}

// export async function findProducts(
//   size: number,
//   keyword: string,
//   categoryIdNumber: number,
//   page: number,
//   filter: number,
//   minPrice: number,
//   maxPrice: number,
// ): Promise<ResultInterface> {
//   if (keyword) {
//     keyword = keyword.trim();
//   }

//   const optionToDisplay = `size=${size}&page=${page}`;

//   let url =
//     backendEndpoint +
//     `/product/search/findByCurrentPriceBetween?minPrice=${minPrice}&maxPrice=${maxPrice}&` +
//     optionToDisplay;
//   let filterEndpoint = '';
//   if (filter === 1) {
//     filterEndpoint = `sort=id,desc`;
//   } else if (filter === 2) {
//     filterEndpoint = `sort=id,asc`;
//   } else if (filter === 3) {
//     filterEndpoint = `sort=currentPrice,asc`;
//   } else if (filter === 4) {
//     filterEndpoint = `sort=currentPrice,desc`;
//   } else if (filter === 5) {
//     filterEndpoint = `sort=discountPercent,desc`;
//   } else if (filter === 6) {
//     filterEndpoint = `sort=discountPercent,asc`;
//   }

//   if (keyword !== '' && categoryIdNumber === 0) {
//     url =
//       backendEndpoint +
//       `/product/search/findByNameContainingAndCurrentPriceBetween?` +
//       optionToDisplay +
//       `&productName=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}` +
//       '&' +
//       filterEndpoint;
//   } else if (keyword === '' && categoryIdNumber > 0) {
//     url =
//       backendEndpoint +
//       `/product/search/findByCategory_IdAndCurrentPriceBetween?` +
//       optionToDisplay +
//       `&categoryId=${categoryIdNumber}&minPrice=${minPrice}&maxPrice=${maxPrice}` +
//       '&' +
//       filterEndpoint;
//   } else {
//     url =
//       backendEndpoint +
//       `/product/search/findByNameContainingAndCategory_IdAndCurrentPriceBetween?` +
//       optionToDisplay +
//       `&categoryId=${categoryIdNumber}&productName=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}` +
//       '&' +
//       filterEndpoint;
//   }
//   return getProducts(url);
// }

// export async function getProductById(
//   productId: number,
// ): Promise<ProductModel | null> {
//   const url = backendEndpoint + `/product/${productId}`;
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error('Gặp lỗi API');
//     }
//     const productData = await response.json();

//     if (productData) {
//       return {
//         id: productData.id,
//         name: productData.name,
//         alias: productData.alias,
//         shortDescription: productData.shortDescription,
//         fullDescription: productData.fullDescription,
//         createdTime: new Date(productData.createdTime),
//         updatedTime: new Date(productData.updatedTime),
//         enabled: productData.enabled,
//         quantity: productData.quantity,
//         soldQuantity: productData.soldQuantity,
//         listedPrice: productData.listedPrice,
//         currentPrice: productData.currentPrice,
//         discountPercent: productData.discountPercent,
//         length: productData.length,
//         width: productData.width,
//         height: productData.height,
//         weight: productData.weight,
//         operatingSystem: productData.operatingSystem,
//         mainImage: productData.mainImage,
//         categoryId: productData.categoryId,
//         brandId: productData.brandId,
//         reviewCount: productData.reviewCount,
//         ratingCount: productData.ratingCount,
//         relatedImages: productData.relatedImages,
//         averageRating: productData.averageRating,
//       };
//     } else {
//       throw new Error('Sản phẩm không tồn tại');
//     }
//   } catch (error) {
//     console.error('Error', error);
//     return null;
//   }
// }

// export async function getProductByAlias(
//   productAlias: string,
// ): Promise<ProductModel | null> {
//   const url =
//     backendEndpoint +
//     `/product/search/findByAlias?productAlias=${productAlias}`;
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Gặp lỗi API: ${url}`);
//     }
//     const productData = await response.json();
//     if (productData) {
//       return {
//         id: productData.id,
//         name: productData.name,
//         alias: productData.alias,
//         shortDescription: productData.shortDescription,
//         fullDescription: productData.fullDescription,
//         createdTime: new Date(productData.createdTime),
//         updatedTime: new Date(productData.updatedTime),
//         enabled: productData.enabled,
//         quantity: productData.quantity,
//         soldQuantity: productData.soldQuantity,
//         listedPrice: productData.listedPrice,
//         currentPrice: productData.currentPrice,
//         discountPercent: productData.discountPercent,
//         length: productData.length,
//         width: productData.width,
//         height: productData.height,
//         weight: productData.weight,
//         operatingSystem: productData.operatingSystem,
//         mainImage: productData.mainImage,
//         categoryId: productData.categoryId,
//         brandId: productData.brandId,
//         reviewCount: productData.reviewCount,
//         ratingCount: productData.ratingCount,
//         averageRating: productData.averageRating,
//         relatedImages: productData.relatedImages,
//       };
//     } else {
//       throw new Error('Sản phẩm không tồn tại');
//     }
//   } catch (error) {
//     console.log('Damn,', error);
//     return null;
//   }
// }

// export async function getNewestProducts(
//   totalElements: number,
// ): Promise<ResultInterface> {
//   const url: string =
//     backendEndpoint + `/product?sort=id,desc&size=${totalElements}`;

//   return getProducts(url);
// }

// export async function getHottestProducts(
//   totalElements: number,
// ): Promise<ResultInterface> {
//   const url: string =
//     backendEndpoint +
//     `/product?sort=averageRating,desc&size=${totalElements}`;

//   return getProducts(url);
// }

// // http://localhost:8080/product/search/findByBrand_Id?brandId=12

// export async function findProductsByBrandId(
//   brandId: number,
// ): Promise<ResultInterface> {
//   const url = `${backendEndpoint}/product/search/findByBrand_Id?brandId=${brandId}`;

//   return getProducts(url);
// }

// export async function getProductByCartItemId(
//   idCart: number,
// ): Promise<ProductModel | null> {
//   const endpoint = backendEndpoint + `/cart-item/${idCart}/product`;

//   try {
//     // Gọi phương thức request()
//     const response = await myRequest(endpoint);

//     // Kiểm tra xem dữ liệu endpoint trả về có dữ liệu không
//     if (response) {
//       // Trả về sản phẩm
//       return response;
//     } else {
//       throw new Error('Sản phẩm không tồn tại');
//     }
//   } catch (error) {
//     console.error('Error: ', error);
//     return null;
//   }
// }

// export async function getProductByReviewId(
//   id: number,
// ): Promise<ProductModel | null> {
//   const endpoint = backendEndpoint + `/review/${id}/product`;

//   try {
//     // Gọi phương thức request()
//     const response = await myRequest(endpoint);

//     // Kiểm tra xem dữ liệu endpoint trả về có dữ liệu không
//     if (response) {
//       // Trả về sản phẩm
//       return response;
//     } else {
//       throw new Error('Sản phẩm không tồn tại');
//     }
//   } catch (error) {
//     console.error('Error: ', error);
//     return null;
//   }
// }

// export async function getProductByOrderDetailId(
//   id: number,
// ): Promise<ProductModel | null> {
//   const endpoint = backendEndpoint + `/order-detail/${id}/product`;

//   try {
//     // Gọi phương thức request()
//     const response = await myRequest(endpoint);

//     // Kiểm tra xem dữ liệu endpoint trả về có dữ liệu không
//     if (response) {
//       // Trả về sản phẩm
//       return response;
//     } else {
//       throw new Error('Sản phẩm không tồn tại');
//     }
//   } catch (error) {
//     console.error('Error: ', error);
//     return null;
//   }
// }

// export async function getProductByFavoriteProductId(
//   id: number,
// ): Promise<ProductModel | null> {
//   const endpoint = backendEndpoint + `/favorite-product/${id}/product`;

//   try {
//     // Gọi phương thức request()
//     const response = await myRequest(endpoint);

//     // Kiểm tra xem dữ liệu endpoint trả về có dữ liệu không
//     if (response) {
//       // Trả về sản phẩm
//       return response;
//     } else {
//       throw new Error('Sản phẩm không tồn tại');
//     }
//   } catch (error) {
//     console.error('Error: ', error);
//     return null;
//   }
// }
