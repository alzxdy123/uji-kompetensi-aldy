export type TSubmenu = {
  groupId: string;
  id: string;
  menuSubName: string;
  show: boolean;
};

export type TGroup = {
  menuId: string;
  id: string;
  groupName: string;
  show: boolean;
  subMenu: TSubmenu[];
};

export type TMenu = {
  id: string;
  menuName: string;
  show: boolean;
  groups: TGroup[];
};

export type TContent = {
  id: number;
  title: string;
  description: string;
};

export type TRunningText = TContent & {
  type: string;
};

export type TTermsConditions = TContent;

export type THolidayParameter = {
  id?: number;
  parameterName: string;
  parameterType: string;
  parameterValue1: string;
  parameterValue2: string;
  description: string;
  createdBy?: string;
  updatedBy?: string;
};

export type TBranchOffice = {
  id: number;
  branchCode: string;
  branchName: string;
  status: string;
  distributionId: number;
  distributionName: string;
  unitCode: string;
  unitType: string;
  unitName: string;
};

export type TDistribution = {
  distributionName: string;
  id: number;
};
