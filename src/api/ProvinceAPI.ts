import { backendEndpoint } from '../utils/Service/Constant';
import ProvinceModel from '../models/ProvinceModel';
import { publicRequest } from './Request';

export async function getAllProvinces(): Promise<ProvinceModel[]> {
  const responseData = await publicRequest(backendEndpoint + `/provinces`);

  const result = responseData.map((data: any) => ({
    id: data.id,
    name: data.name,
    districts: data.districts,
  }));

  return result;
}
