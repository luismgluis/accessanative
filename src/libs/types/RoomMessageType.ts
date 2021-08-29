import utils from "../utils/utils";

export default class RoomMessageType {
  id: string;
  creator: string;
  type: "text" | "image" | "video" | "stiker" | "audio";
  location?: string;
  text?: string;
  fileUrl?: string;
  videoUrl?: string;
  creationDate?: number;
  firstMessage?: boolean;
  lastMessage?: boolean;
  isVisibleMessage?: boolean;
  fileUpload?: boolean;
  fileSize?: number;
  fileTime?: number;
  fileDimensions?: string;
  updateView?: (module: string) => void;
  constructor(id: string, data: any | null) {
    this.id = id;
    this.text = data.text || "";
    this.creator = data.creator || "";
    this.type = data.type || "text";
    this.location = data.location || null;
    this.fileUrl = data.fileUrl || data.imageUrl || "";
    this.creationDate = data.creationDate || 0;
    this.firstMessage = utils.objects.isEmpty(data.firstMessage)
      ? false
      : data.firstMessage;
    this.lastMessage = utils.objects.isEmpty(data.lastMessage)
      ? false
      : data.lastMessage;
    this.isVisibleMessage = utils.objects.isEmpty(data.isVisibleMessage)
      ? false
      : data.isVisibleMessage;
    this.fileUpload = utils.objects.isEmpty(data.fileUpload)
      ? false
      : data.fileUpload;
    this.fileSize = data.fileSize || 0;
    this.fileTime = data.fileTime || 0;
    this.fileDimensions = data.fileDimensions || "";
    const empty = () => {
      return null;
    };
    this.updateView = data.updateView || empty;

    if (this.type === "text") {
      this.text = data.text;
    }
  }
  setText(text: string): void {
    this.type = "text";
    this.text = text;
  }
  setMessageID(id: string): void {
    this.id = id;
  }
  setVideo(uri: string, duration: number): void {
    this.type = "video";
    this.fileUrl = uri;
    this.fileTime = duration;
  }
  setImage(uri: string, dimensions: string): void {
    this.type = "image";
    this.fileUrl = uri;
    this.fileDimensions = dimensions;
  }
  setAudio(path: string, size: number, time: number): void {
    this.type = "audio";
    this.fileUrl = path;
    this.fileSize = size;
    this.fileTime = time;
  }
  setFileUpload(val: boolean): void {
    this.fileUpload = val;
  }
  setLocation(lat: number, lng: number): void {
    this.location = `${lat},${lng}`;
  }
  setIsVisible(visible: boolean): void {
    this.isVisibleMessage = visible;
  }
  isEmpty(): boolean {
    if (this.creator === "" || this.id === "" || this.creationDate === 0) {
      return true;
    }
    return false;
  }
  exportToUpload(): any {
    if (this.type === "text") {
      return {
        creator: this.creator,
        text: this.text,
        type: this.type,
        creationDate: this.creationDate,
      };
    } else if (
      this.type === "image" ||
      this.type === "audio" ||
      this.type === "video"
    ) {
      return {
        creator: this.creator,
        fileUrl: this.fileUrl,
        type: this.type,
        creationDate: this.creationDate,
        fileUpload: this.fileUpload,
        fileSize: this.fileSize,
        fileTime: this.fileTime,
        fileDimensions: this.fileDimensions,
      };
    }
    return null;
  }
}
