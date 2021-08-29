import api from "../api/api";
import utils from "../utils/utils";

const TAG = "RESIDENT TYPE";
type OptionalDataItem = {
  name: string;
  value: string;
};
export interface ResidentAccessType {
  id?: string;
  comment: string;
  creationDate: number;
  idResident: string;
  idValidator: string;
  sector: string;
  exit: boolean;
}
export class ResidentAccess implements ResidentAccessType {
  id: string;
  comment: string;
  creationDate: number;
  idResident: string;
  idValidator: string;
  sector: string;
  exit: boolean;
  constructor(id: string, data: ResidentAccessType | null) {
    this.id = id;
    this.comment = data?.comment || "";
    this.creationDate = data?.creationDate || 0;
    this.idResident = data?.idResident || "";
    this.sector = data?.sector || "";
    this.idValidator = data?.idValidator || "";
    this.exit = utils.objects.isEmpty(data?.exit) ? false : data!.exit;
  }
  isEmpty(): boolean {
    console.log(TAG, this.id);
    if (typeof this.id === "undefined") {
      return true;
    }
    if (this.id !== "" && this.creationDate !== 0) {
      return false;
    }
    return true;
  }
  exportToUpload(): ResidentAccessType {
    return {
      comment: this.comment,
      creationDate: this.creationDate,
      idResident: this.idResident,
      sector: this.sector,
      idValidator: this.idValidator,
      exit: this.exit,
    };
  }
}

export interface ResidentTypeType {
  name: string;
  sector?: string;
  idCard: string;
  qr?: string;
  telegram: string;
  phone: string;
  profileImage: string;
  idCardImage?: string;
  optionalData?: Array<OptionalDataItem>;
  isVisitor?: boolean;
  profession?: string;
  mask?: string;
}

export class ResidentType implements ResidentTypeType {
  id: string;
  name: string;
  sector: string;
  idCard: string;
  qr: string;
  telegram: string;
  phone: string;
  profileImage: string;
  idCardImage?: string;
  optionalData?: Array<OptionalDataItem>;
  isVisitor?: boolean;
  mask?: string;
  profession?: string;
  private arrUpdateFns: Array<(resUpdated: ResidentType) => void>;
  keeey: string;
  constructor(id: string, data: ResidentTypeType | null) {
    this.id = id;
    this.name = data?.name || "";
    this.sector = data?.sector || "";
    this.idCard = data?.idCard || "";
    this.qr = data?.qr || "";
    this.telegram = data?.telegram || "";
    this.phone = data?.phone || "";
    this.profileImage = data?.profileImage || "";
    this.idCardImage = data?.idCardImage || "";
    this.profession = data?.profession || "";
    this.mask = data?.mask || "";

    this.isVisitor = utils.objects.isEmpty(data?.isVisitor)
      ? true
      : data!.isVisitor;
    this.optionalData = data?.optionalData
      ? this.parseOptionalData(data!.optionalData)
      : [];
    this.arrUpdateFns = [];
    this.keeey = utils.generateKey("aaa");
  }
  isEmpty(): boolean {
    if (this.id === "") {
      return true;
    }
    return false;
  }
  parseOptionalData(data: Array<any>): Array<OptionalDataItem> {
    if (!Array.isArray(data)) return [];
    return data.map((item) => {
      try {
        return JSON.parse(item);
      } catch (error) {
        return null;
      }
    });
  }
  getLastAccess(): Promise<ResidentAccess> {
    const that = this;
    return new Promise<ResidentAccess>((resolve, reject) => {
      try {
        api.residents
          .getLastAccess(that)
          .then((data) => {
            console.log(TAG, data);
            if (data.length > 0) resolve(data[0]);
            if (!(data.length > 0)) reject(null);
          })
          .catch(() => reject(null));
      } catch (error) {
        reject(null);
      }
    });
  }
  getLastTelegramMessage() {
    const that = this;
    console.log(TAG, "telegramMessage");
    return api.residents.getTelegramMessage(that, 1);
  }
  exportToUpload(): ResidentTypeType {
    if (this.isVisitor) {
      return {
        name: this.name,
        idCard: this.idCard,
        telegram: this.telegram,
        phone: this.phone,
        profileImage: this.profileImage,
        idCardImage: this.idCardImage,
        optionalData: this.optionalData,
        profession: this.profession,
        isVisitor: this.isVisitor,
      };
    }
    return {
      name: this.name,
      sector: this.sector,
      idCard: this.idCard,
      qr: this.qr,
      telegram: this.telegram,
      phone: this.phone,
      profileImage: this.profileImage,
      idCardImage: this.idCardImage,
      optionalData: this.optionalData,
      profession: this.profession,
      isVisitor: this.isVisitor,
    };
  }
  cloneFrom(resident: ResidentType, updateCallBacks = false) {
    const resi: any = resident;
    const that: any = this;
    for (const key in resi) {
      const element = resi[key];
      if (typeof element === "function") {
        continue;
      }
      if (key.toString() === "arrUpdateFns") {
        //continue;
      }
      if (typeof that[key] !== "undefined") {
        that[key] = element;
      }
    }
    if (updateCallBacks)
      this.arrUpdateFns.forEach((fn) => {
        fn(that);
      });
  }
  onUpdate(callBack: (resi: ResidentType) => void) {
    console.log(TAG, this.keeey, "onupdate activated");
    let newFn = (res: ResidentType) => {
      callBack(res);
    };
    this.arrUpdateFns.push((res: ResidentType) => {
      newFn(res);
    });
    return () => {
      newFn = (res: ResidentType) => {
        return null;
      };
    };
  }
}
