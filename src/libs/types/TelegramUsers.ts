export class TelegramUsersReplies {
  creationDate: string;
  idHistory: string;
  question: string;
  reply: string;
  constructor() {
    this.creationDate = "";
    this.idHistory = "";
    this.question = "";
    this.reply = "";
  }
}

export class TelegramUser {
  id;
  idTelegram;
  idCard;
  idGroup;
  name;
  sector;
  constructor() {
    this.id = "";
    this.idTelegram = "";
    this.idCard = "";
    this.idGroup = "";
    this.name = "";
    this.sector = "";
  }
  exportToUpload() {
    return {
      id: this.id,
      idCard: this.idCard,
      idGroup: this.idGroup,
      name: this.name,
      sector: this.sector,
    };
  }
}
