import { backendEndpoint } from '../utils/Functions/Constant';
import ProductModel from '../models/ProductModel';
import { myRequest } from './MyRequest';

interface ResultInterface {
  result: ProductModel[];
  totalPages: number;
  totalElements: number;
}

async function getProductsWithContent(url: string): Promise<ResultInterface> {
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

async function getProductsWithNoContent(url: string): Promise<ProductModel[]> {
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

export async function getAllProducts(): Promise<ResultInterface> {
  const url = backendEndpoint + '/products?size=100';
  return getProductsWithContent(url);
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
      filterEndpoint = 'sortBy=averageRating&sortDir=desc';
      break;
    case 3:
      filterEndpoint = 'sortBy=currentPrice&sortDir=asc';
      break;
    case 4:
      filterEndpoint = 'sortBy=soldQuantity&sortDir=desc';
      break;
    case 5:
      filterEndpoint = 'sortBy=discountPercent&sortDir=desc';
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

  return getProductsWithContent(url);
}

export async function getProductById(productId: number): Promise<ProductModel> {
  const url = backendEndpoint + `/products/${productId}`;
  const responseData = await myRequest(url);
  return responseData;
}

export async function findProductsByCategoryId(
  categoryId: number,
): Promise<ProductModel[]> {
  const url = `${backendEndpoint}/products/findByCategoryId?categoryId=${categoryId}`;
  return getProductsWithNoContent(url);
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
  return getProductsWithNoContent(url);
}

export async function getTopSoldProducts(
  totalElements: number,
): Promise<ResultInterface> {
  const url: string =
    backendEndpoint +
    `/products?sortBy=soldQuantity&sortDir=desc&size=${totalElements}`;

  return getProductsWithContent(url);
}

export async function getHottestProducts(
  totalElements: number,
): Promise<ResultInterface> {
  const url: string =
    backendEndpoint +
    `/products?sortBy=averageRating&sortDir=desc&size=${totalElements}`;

  return getProductsWithContent(url);
}

export async function getNewestProducts(
  totalElements: number,
): Promise<ResultInterface> {
  const url: string =
    backendEndpoint +
    `/products?sortBy=createdTime&sortDir=desc&size=${totalElements}`;

  return getProductsWithContent(url);
}

export async function getAndFindProducts(
  size: number,
  keyword: string,
  categoryAlias: string,
  page: number,
  filter: number,
  minPrice: number,
  maxPrice: number,
): Promise<ResultInterface> {
  const optionToDisplay = `size=${size}&page=${page}`;
  let url =
    backendEndpoint +
    `/products?minPrice=${minPrice}&maxPrice=${maxPrice}&` +
    optionToDisplay;

  let filterEndpoint = '';
  if (filter === 1) {
    filterEndpoint = `sortBy=createdTime&sortDir=desc`;
  } else if (filter === 2) {
    filterEndpoint = `sortBy=averageRating&sortDir=desc`;
  } else if (filter === 3) {
    filterEndpoint = `sortBy=currentPrice&sortDir=asc`;
  } else if (filter === 4) {
    filterEndpoint = `sortBy=soldQuantity&sortDir=desc`;
  } else if (filter === 5) {
    filterEndpoint = `sortBy=discountPercent&sortDir=desc`;
  }

  url =
    backendEndpoint +
    `/products?` +
    optionToDisplay +
    `&categoryAlias=${categoryAlias}&productName=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}` +
    '&' +
    filterEndpoint;
  return getProductsWithContent(url);
}

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

// // http://localhost:8080/product/search/findByBrand_Id?brandId=12

// export async function findProductsByBrandId(
//   brandId: number,
// ): Promise<ResultInterface> {
//   const url = `${backendEndpoint}/product/search/findByBrand_Id?brandId=${brandId}`;

//   return getProductsWithContent(url);
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
