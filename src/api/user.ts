import keyieRequest from "@/utils/servers";

import { GatWay } from '@/const'

enum UserApi {
  getCurrentInfo = `${GatWay.User}/getCurrentInfo`,
}

export const apiGetCurrentInfo = () => {
  return keyieRequest.get({
    url: UserApi.getCurrentInfo,
  });
};