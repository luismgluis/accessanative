import module from "./module";

interface ProcessingManagerType {
  trim: (source: any, options: any) => Promise<string>;
  getPreviewForSecond: (
    source: any,
    second: number,
    maximumSize: any,
    format: any,
  ) => Promise<any>;
  getTrimmerPreviewImages: (
    source: any,
    startTime: number,
    endTime: number,
    step: number,
    maximumSize: any,
    format: any,
  ) => Promise<any>;
  getVideoInfo: (source: any) => Promise<any>;
  compress: (source: any, options: any) => Promise<any>;
  boomerang: (source: any) => Promise<any>;
  reverse: (source: any) => Promise<any>;
  crop: (source: any, options: any) => void;
  merge: (readableFiles: any, cmd: string) => Promise<string>;
}

type VideoProcessingType = {
  VideoPlayer: React.FC<any>;
  Trimmer: any;
  ProcessingManager: ProcessingManagerType;
};

export const VideoPlayer: React.FC<any> = module.VideoPlayer;
export const Trimmer: any = module.Trimmer;
export const ProcessingManager: ProcessingManagerType =
  module.ProcessingManager;

const VideoProcessing = {
  VideoPlayer: module.VideoPlayer,
  Trimmer: module.Trimmer,
  ProcessingManager: module.ProcessingManager,
};
export default VideoProcessing;
