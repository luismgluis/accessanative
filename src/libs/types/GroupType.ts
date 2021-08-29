import utils from "../utils/utils";

type GroupTypeType = {
  id: string;
  at: string;
  creationDate: number;
  creator: string;
  name: string;
  public: boolean;
};
export default class GroupType implements GroupTypeType {
  id: string;
  at: string;
  creationDate: number;
  creator: string;
  name: string;
  public: boolean;
  constructor(id: string, data: GroupTypeType | null) {
    this.id = id;
    this.at = data?.at || "";
    this.creationDate = data?.creationDate || 0;
    this.creator = data?.creator || "";
    this.name = data?.name || "";
    this.public = utils.objects.isEmpty(data?.public) ? false : data!.public;
  }
  isEmpty(): boolean {
    if (this.id === "" || typeof this.id === "undefined" || this.name === "") {
      return true;
    }
    return false;
  }
  exportToUpload() {
    return {
      at: this.at,
      creationDate: this.creationDate,
      creator: this.creator,
      name: this.name,
      public: this.public,
    };
  }
}
