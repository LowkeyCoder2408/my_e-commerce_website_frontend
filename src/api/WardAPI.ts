import { backendEndpoint } from '../utils/Service/Constant';
import WardModel from '../models/WardModel';
import { publicRequest } from './Request';

export async function getAllWardsByProvinceAndDistrict(
  provinceName: string,
  districtName: string,
): Promise<WardModel[]> {
  const responseData = await publicRequest(
    backendEndpoint +
      `/wards/find-by-province-name-and-district-name?provinceName=${provinceName}&districtName=${districtName}`,
  );

  const result = responseData.map((data: any) => ({
    id: data.id,
    name: data.name,
    districtId: data.districtId,
  }));

  return result;
}
