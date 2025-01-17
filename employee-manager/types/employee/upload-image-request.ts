export type ImageUploadRequest = {
  EmpId: string;
  File: File;
  FileName: string;
  FileDescription?: string;
};

export type FileUpload = {
  id: string;
  empId: string;
  fileName: string;
  file: File;
  fileDescription: string | null;
  fileExtension: string;
  fileSizeInBytes: number;
  filePath: string;
};
