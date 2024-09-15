import { backendEndpoint } from '../utils/Service/Constant';
import DistrictModel from '../models/DistrictModel';
import { publicRequest } from './Request';

export async function getAllDistrictsByProvinceName(
  provinceName: string,
): Promise<DistrictModel[]> {
  const responseData = await publicRequest(
    backendEndpoint +
      `/districts/find-by-province-name?provinceName=${provinceName}`,
  );

  const result = responseData.map((data: any) => ({
    id: data.id,
    name: data.name,
    provinceId: data.provinceId,
    wards: data.wards,
  }));

  return result;
}
