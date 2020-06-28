export interface Document {
  id: string;
  personId: string;
  fileName: string;
  fileSize: number;
  uploaded: Date;
  uploadedBy: string;
  // bucket: BucketType;
  allowExtendedMetaData: boolean;
  // assignedCases: CaseReference[];

  isNewDocument: boolean;
  favourite: boolean;
  toBeDiscussed: boolean;
  documentStatus: string;
  // assignmentType: AssignmentType;
  // creationDate: NgbDateStruct;
  // receiptDate: NgbDateStruct;
  type: string;
  source: string;
  label?: string;
}
