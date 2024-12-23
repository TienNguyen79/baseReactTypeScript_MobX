export default class Constants {
  public static TOKEN_EXPIRE_DAYS: number = 7;
  public static TOKEN_NAME: string = "x-iss-token";
  public static REFRESH_TOKEN: string = "x-iss-refreshToken";
  public static MAX_SIZE: any = 2000;
  public static API_URL: String = (window as any).API_DOMAIN;
  public static COLOR_DEFAULT: '#0089D6'
}

export enum FORMAT_DATE {
  HH = "HH",
  MM = "MM",
  HH_mm = "HH:mm",
  "HH[h]_mm[']" = "HH[h] mm[']",
  HH_mm_ss = "HH:mm:ss",
  DD_MM = "DD/MM",
  DD_mm = "DD/mm",
  DD_MM_YYYY = "DD/MM/YYYY",
  DDMMYYYY = "DD-MM-YYYY",
  YYYY_MM_DD = "YYYY-MM-DD",
  YYYY_MM_DDTHH_mm = "YYYY-MM-DDTHH:mm",
  YYYY_MM_DDTHH_mm_ss = "YYYY-MM-DDTHH:mm:ss",
  DD_MM_YYYY_HH_mm = "DD/MM/YYYY HH:mm"
}

export const permissionCode = {
  //--------------Quyền quản trị----------------//

  // p_project_manage: "p_project_manage",
  // a_expenses_manage: "a_expenses_manage",
  // p_work_plans_manage: "p_work_plans_manage",
  // u_travel_schedules_manage: "u_travel_schedules_manage",
  //

};
