interface VehicleTypeType {
  id?: string;
  comment: string;
  creationDate: number;
  idResident: string;
  licensePlate: string;
  color: string;
}
const TAG = "VEHICLE TYPE";
export class VehicleType implements VehicleTypeType {
  id: string;
  comment: string;
  creationDate: number;
  idResident: string;
  licensePlate: string;
  color: string;
  constructor(id: string, data: VehicleTypeType | null) {
    this.id = id;
    this.comment = data?.comment || "";
    this.creationDate = data?.creationDate || 0;
    this.idResident = data?.idResident || "";
    this.color = data?.color || "";
    this.licensePlate = data?.licensePlate || "";
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
  exportToUpload(): VehicleTypeType {
    return {
      comment: this.comment,
      creationDate: this.creationDate,
      idResident: this.idResident,
      color: this.color,
      licensePlate: this.licensePlate,
    };
  }
}
