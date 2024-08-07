import { backendEndpoint } from '../utils/Constant';
import { myRequest } from './MyRequest';
import BrandModel from '../models/BrandModel';

interface ResultInterface {
  brand: BrandModel | null;
  brands: BrandModel[];
}

async function getBrands(url: string): Promise<ResultInterface> {
  const responseData: any[] = await myRequest(url);

  const result: BrandModel[] = responseData.map((data: any) => ({
    id: data.id,
    name: data.name,
    logo: data.logo,
    categoryIds: data.categoryIds,
  }));

  return {
    brand: result.length > 0 ? result[0] : null,
    brands: result,
  };
}

export async function getAllBrands(): Promise<ResultInterface> {
  const url = backendEndpoint + '/brands';
  return getBrands(url);
}
