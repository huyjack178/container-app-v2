export interface ContainerImageData {
  readonly uri: string;
  readonly lowResolution: Blob;
  readonly highResolution: Blob;
}

export interface ContainerImage {
  readonly data: ContainerImageData;
  readonly name: string;
}
