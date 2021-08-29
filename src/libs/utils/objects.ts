export interface arrayHasObjectChildEqualToType {
  isEqual: boolean;
  item: any;
}

export default class objects {
  constructor() {
    /** */
  }
  isEmpty(obj: any): boolean {
    if (typeof obj === "undefined") {
      return true;
    }
    if (obj == null) {
      return true;
    }
    if (typeof obj === "object") {
      if (Object.keys(obj).length === 0) {
        return true;
      }
    }
    return false;
  }
  cloneObject(obj: any): any {
    const nb: any = {};
    for (const key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) {
        continue;
      }
      const element = obj[key];
      nb[key] = element;
    }
    return nb;
  }
  arrayHasObjectChildEqualTo(
    arr: Array<any>,
    key: string,
    equalToThis: any,
  ): arrayHasObjectChildEqualToType {
    for (const keyCallB in arr) {
      if (!Object.prototype.hasOwnProperty.call(arr, keyCallB)) {
        continue;
      }
      const element = arr[keyCallB];
      if (element[key] === equalToThis) {
        return {
          isEqual: true,
          item: element,
        };
      }
    }
    return {
      isEqual: false,
      item: null,
    };
  }
  arrayOrderDesc(array: Array<any>, childName = "") {
    function compare(a: any, b: any) {
      if (typeof a[childName] === "undefined") {
        return 0;
      }
      if (typeof b[childName] === "undefined") {
        return 0;
      }
      if (a[childName] < b[childName]) {
        return -1;
      }
      if (a[childName] > b[childName]) {
        return 1;
      }
      return 0;
    }
    return [...array].sort(compare); // clone and sort
  }
  arrayOrderAsc(array: Array<any>, childName = "") {
    function compare(a: any, b: any) {
      if (typeof a[childName] === "undefined") {
        return 0;
      }
      if (typeof b[childName] === "undefined") {
        return 0;
      }
      if (a[childName] < b[childName]) {
        return 1;
      }
      if (a[childName] > b[childName]) {
        return -1;
      }
      return 0;
    }
    return [...array].sort(compare); // clone and sort
  }
  arrayLastItem(array = []): any {
    const [lastItem] = array.slice(-1);
    return lastItem;
  }
}
