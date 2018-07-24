
const getIndex = (data, arr) => {
  if (Array.isArray(arr) && arr.length > 0) {
    return arr.findIndex(val => val === data)
  }
}

const deleteWithSplice = (index, arr, deleteCount) => {
  if (Array.isArray(arr) && arr.length > 0) {
    return arr.splice(index, deleteCount);
  }
  if (typeof arr === "object") {
    Object.keys(arr).splice(index, deleteCount)
  }
}

const omitDeep = (obj, key) => {
  const keys = Object.keys(obj);
  const newObj = {};
  keys.forEach((i) => {
    if (i !== key) {
      const val = obj[i];
      if (Array.isArray(val)) newObj[i] = omitDeepArrayWalk(val, key);
      else if (typeof val === "object" && val !== null) newObj[i] = omitDeep(val, key);
      else newObj[i] = val;
    }
  });
  return newObj;
};

const omitDeepArrayWalk = (arr, key) => {
  return arr.map((val) => {
    if (Array.isArray(val)) return omitDeepArrayWalk(val, key);
    else if (typeof val === "object") return omitDeep(val, key);
    return val;
  });
};


const arrFuncs = ({ data = "", funcName, currentArr = [], deleteCount = 1 }) => {
  if (funcName === "add") {
    return [...currentArr, data];
  } else if (funcName === "delete") {
    if (Array.isArray(currentArr)) {
      const index = getIndex(data, currentArr);
      deleteWithSplice(index, currentArr, deleteCount);
      return currentArr;
    }
    const res = omitDeep(currentArr, data)
    return res
  }
}

const firstLog = {
  data: { name: "ahmed", age: 2 },
  funcName: "add",
  currentArr: ["a"]
}
const secondLog = {
  data: ["ahmed", 2],
  funcName: "add",
  currentArr: ["a"]
}

const thirdLog = {
  data: "b",
  funcName: "delete",
  currentArr: ["a", "b", "c"],
  deleteCount: 1
}
const ForthLog = {
  data: "c",
  funcName: "delete",
  deleteCount: 1
}

const fifthLog = {
  data: "name",
  funcName: "delete",
  deleteCount: 1,
  currentArr: { name: "Sasas", age: 22, pic: 'ssss' }
}
// console.log(arrFuncs({ ...firstLog }));
// console.log(arrFuncs({ ...secondLog }));
console.log(arrFuncs({ ...thirdLog }));
// console.log(arrFuncs({ ...ForthLog }));
// console.log(arrFuncs({ ...fifthLog }));