import { ServerSetting } from "@container-management/common";

export interface LoginResponse {
  readonly token: string;
  readonly settings: ServerSetting;
  readonly imageMaxSizes: string;
}
