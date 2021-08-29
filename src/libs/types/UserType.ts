export interface UserTypeX {
  id: string;
  name: string;
  nickname: string;
  email: string;
  localSaveCreationDate?: number;
  creationDate: number;
  profileImage?: string;
  profileImageKey?: string;
}
export default class UserType implements UserTypeX {
  id: string;
  name: string;
  email: string;
  nickname: string;
  profileImage?: string;
  profileImageKey?: string;
  localSaveCreationDate?: number;
  creationDate: number;
  constructor(id: string, data: UserTypeX | null = null) {
    this.id = id;
    this.name = data?.name || "";
    this.email = data?.email || "";
    this.nickname = data?.nickname || "";
    this.creationDate = data?.creationDate || 0;
    this.profileImage = data?.profileImage || "";
    this.profileImageKey = data?.profileImageKey || "";
    this.localSaveCreationDate = data?.localSaveCreationDate || 0;
  }
  isEmpty(): boolean {
    if (this.id === "" || this.name === "") {
      return true;
    }
    return false;
  }
  exportToUpload() {
    const data: any = {
      name: this.name,
      email: this.email,
      nickname: this.nickname,
      creationDate: this.creationDate,
      profileImage: this.profileImage,
    };
    return data;
  }
}
