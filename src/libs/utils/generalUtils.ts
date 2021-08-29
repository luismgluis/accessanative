export default class generalUtils {
  generateKeyCounter: number;
  constructor() {
    this.generateKeyCounter = 0;
  }
  generateKey(pre: string): string {
    const key = `${pre}_${new Date().getTime()}_${this.generateKeyCounter}`;
    this.generateKeyCounter++;
    return key;
  }
  validateEmail(email: string): boolean {
    if (email.length > 5 && email.includes("@") && !email.includes(" ")) {
      return true;
    }
    return false;
  }
  analiceAnswerYesNo(text: string): "YES" | "NO" | null {
    const regexYes = [
      /\byes+\b/i,
      /\bsi+\b/i,
      /\baceptar+\b/i,
      /\bclaro+\b/i,
      /\bconcedido+\b/i,

      /\bafirmativo+\b/i,
      /\baceptado+\b/i,
    ];
    const regexNo = [
      /\bno+\b/i,
      /\bnot+\b/i,
      /\bdenegar+\b/i,
      /\brechazar+\b/i,
      /\bclaro que no+\b/i,
      /\bnegativo+\b/i,
      /\bdenegado+\b/i,
    ];

    const analice = (regex: RegExp) => {
      const arr = text.match(regex);
      const result = [];
      arr?.forEach((item: any) => {
        result.push(item);
      });
      return result.length > 0;
    };
    for (const key in regexYes) {
      const regex = regexYes[key];
      if (analice(regex)) return "YES";
    }
    for (const key in regexNo) {
      const regex = regexYes[key];
      if (analice(regex)) return "NO";
    }
    return null;
  }
}
