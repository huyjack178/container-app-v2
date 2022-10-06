export interface ContainerImageData {
  readonly uri: string;
  readonly lowResolution: Blob;
  readonly highResolution: Blob;
}

export interface ContainerImage {
  readonly data: ContainerImageData;
  readonly name: string;
  readonly isUploadedLocal?: boolean;
  readonly isUploadedFtp?: boolean;
  readonly isUploadedCloud?: boolean;
}

export interface ContainerUploadedImages {
  [name: string]: {
    isUploadedLocal: boolean;
    isUploadedFtp: boolean;
    isUploadedCloud: boolean;
  };
}
