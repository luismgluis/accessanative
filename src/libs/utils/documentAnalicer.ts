class documentAnalicer {
  constructor() {}
  analicer() {
    function is_numeric(num: string | number) {
      return !isNaN(Number(`${num}`));
    }

    function hasNumbers(str = "") {
      const matchs = str.match(/.*[0-9].*/);
      return matchs ? matchs.length > 0 : false;
    }

    function getDocumentNumber(data = ""): string {
      if (typeof data !== "string") {
        throw new Error("bad param type");
      }
      let last_character = "";
      let token = "";
      const parsed_data: string[] = [];
      if (data == null || data == "") {
        return "";
      }

      for (let index = 0; index < data.length; index++) {
        if (index == 0) {
          last_character = data[index];
          token += data[index];
        } else {
          if (
            (is_numeric(last_character) && is_numeric(data[index])) ||
            (!is_numeric(last_character) && !is_numeric(data[index]))
          ) {
            token += data[index];
          } else {
            parsed_data.push(token);
            token = "";
            token += data[index];
          }
          last_character = data[index];
        }
      }

      if (parsed_data.length <= 1) {
        return "";
      }
      let capitalIndex = (() => {
        if (typeof parsed_data[2] !== "undefined") {
          const cc = parsed_data[2].match(/[A-Z]/);
          return cc ? cc.length : parsed_data[2].length;
        }
        return `${parsed_data[2]}`.length;
      })();

      const documentNumber = parseInt(
        parsed_data[2].substring(capitalIndex - 10, capitalIndex),
      ).toString();

      return documentNumber;
    }

    function getDocumentName(data = ""): string {
      const contentSplited = data.match(/[A-Za-z0-9+_]+/gi);
      if (!contentSplited) {
        return "";
      }
      if (contentSplited.length <= 1) {
        return "";
      }
      let lname = "";
      if (!data.includes("PUBDSK")) {
        if (data.includes("PubDSK_1")) {
          lname = `${contentSplited[3]}`.replace(/[^\w\s]/gi, "");
          lname = lname.replace(/[0-9]/g, "");
          lname += " " + contentSplited[4];

          if (!hasNumbers(contentSplited[6]))
            lname = contentSplited[6] + " " + lname;
          if (!hasNumbers(contentSplited[5]))
            lname = contentSplited[5] + " " + lname;
        } else {
          lname = `${contentSplited[2]}`.replace(/[^\w\s]/gi, "");
          lname = lname.replace(/[0-9]/g, "");
          lname += " " + contentSplited[3];

          if (!hasNumbers(contentSplited[5]))
            lname = contentSplited[5] + " " + lname;
          if (!hasNumbers(contentSplited[4]))
            lname = contentSplited[4] + " " + lname;

          if (lname.split(" ").length === 2) {
            lname = lname.split(" ").reverse().join(" ");
          }
        }
      }
      if (lname !== "") {
        lname = lname
          .split(" ")
          .map((value, index) => {
            return value.charAt(0).toUpperCase() + value.toLowerCase().slice(1);
          })
          .join(" ");
      }

      return lname;
    }
    return {
      getDocumentName,
      getDocumentNumber,
    };
  }
}

export default documentAnalicer;
