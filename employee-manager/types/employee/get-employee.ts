export type Employee = {
  empId: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  hireDate: string;
  departmentName: string;
  departmentId: string;
  actions?: React.ReactNode;
  image?: string;
};

export type FilterAndSortEmployee = {
  filterOn?: string;
  filterQuery?: string;
  sortOn?: string;
  sortBy?: string;
  pageNumber?: number;
  pageSize?: number;
};
