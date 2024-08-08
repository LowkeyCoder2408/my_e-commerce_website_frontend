import { backendEndpoint } from '../utils/Constant';
import { myRequest } from './MyRequest';
import CategoryModel from '../models/CategoryModel';

interface ResultInterface {
  category: CategoryModel | null;
  categories: CategoryModel[];
}

async function getCategories(url: string): Promise<ResultInterface> {
  const responseData: any[] = await myRequest(url);

  const result: CategoryModel[] = responseData.map((data: any) => ({
    id: data.id,
    name: data.name,
    alias: data.alias,
    image: data.image,
    enabled: data.enabled,
    brandIds: data.brandIds,
  }));

  return {
    category: result.length > 0 ? result[0] : null,
    categories: result,
  };
}

export async function getAllCategories(): Promise<ResultInterface> {
  const url = backendEndpoint + '/categories';
  return getCategories(url);
}
