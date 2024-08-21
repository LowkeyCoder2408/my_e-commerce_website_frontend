import { backendEndpoint } from '../utils/Service/Constant';
import ProductModel from '../models/ProductModel';
import { publicRequest } from './Request';

interface ResultInterface {
  result: ProductModel[];
  totalPages: number;
  totalElements: number;
}

async function getProductsWithEmbedded(url: string): Promise<ResultInterface> {
  const response = await publicRequest(url);
  const responseData: any = response._embedded;
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

export async function getAllProductsNoFilter(): Promise<ResultInterface> {
  const url = backendEndpoint + '/products?size=1000';
  return getProductsWithEmbedded(url);
}

export async function getAllFilteredProducts(
  size: number,
  page: number,
  filter: number,
  minPrice: number,
  maxPrice: number,
): Promise<ResultInterface> {
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

  const url: string =
    backendEndpoint +
    `/products/findByCurrentPriceBetween?minPrice=${minPrice}&maxPrice=${maxPrice}&size=${size}&page=${page}` +
    '&' +
    filterEndpoint;

  return getProductsWithEmbedded(url);
}

export async function getProductById(productId: number): Promise<ProductModel> {
  const url = backendEndpoint + `/products/${productId}`;
  const responseData = await publicRequest(url);
  return responseData;
}

export async function findProductsByCategoryId(
  categoryId: number,
): Promise<ResultInterface> {
  const url = `${backendEndpoint}/products/findByCategoryId?categoryId=${categoryId}`;
  return getProductsWithEmbedded(url);
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
): Promise<ResultInterface> {
  const url: string =
    backendEndpoint +
    `/products/findProductsByPriceDifferencePrice?size=${totalElements}`;
  return getProductsWithEmbedded(url);
}

export async function getTopSoldProducts(
  totalElements: number,
): Promise<ResultInterface> {
  const url: string =
    backendEndpoint +
    `/products?sortBy=soldQuantity&sortDir=desc&size=${totalElements}`;

  return getProductsWithEmbedded(url);
}

export async function getHottestProducts(
  totalElements: number,
): Promise<ResultInterface> {
  const url: string =
    backendEndpoint +
    `/products?sortBy=averageRating&sortDir=desc&size=${totalElements}`;

  return getProductsWithEmbedded(url);
}

export async function getNewestProducts(
  totalElements: number,
): Promise<ResultInterface> {
  const url: string =
    backendEndpoint +
    `/products?sortBy=createdTime&sortDir=desc&size=${totalElements}`;

  return getProductsWithEmbedded(url);
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
  if (keyword) {
    keyword = keyword.trim();
  }

  const optionToDisplay = `size=${size}&page=${page}`;

  let url =
    backendEndpoint +
    `/products/findByCurrentPriceBetween?minPrice=${minPrice}&maxPrice=${maxPrice}&` +
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

  if (keyword !== '' && categoryAlias === '') {
    url =
      backendEndpoint +
      `/products/findByNameContainingAndCurrentPriceBetween?` +
      optionToDisplay +
      `&productName=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}` +
      '&' +
      filterEndpoint;
  } else if (keyword === '' && categoryAlias !== '') {
    url =
      backendEndpoint +
      `/products/findByCategory_AliasAndCurrentPriceBetween?` +
      optionToDisplay +
      `&categoryAlias=${categoryAlias}&minPrice=${minPrice}&maxPrice=${maxPrice}` +
      '&' +
      filterEndpoint;
  } else {
    url =
      backendEndpoint +
      `/products/findByNameContainingAndCategory_AliasAndCurrentPriceBetween?` +
      optionToDisplay +
      `&categoryAlias=${categoryAlias}&productName=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}` +
      '&' +
      filterEndpoint;
  }
  return getProductsWithEmbedded(url);
}
