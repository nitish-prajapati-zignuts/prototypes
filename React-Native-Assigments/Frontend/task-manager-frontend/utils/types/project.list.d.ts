
export type Project = {
  _id: string;
  title: string;
  description: string;
  userId: string;
  isDeleted: boolean;
  __v: number;
};

export type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ProjectsData = {
  projects: Project[];
  pagination: Pagination;
};

export type ProjectsResponse = {
  success: boolean;
  message: string;
  data: ProjectsData;
};