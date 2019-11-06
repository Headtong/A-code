function calcNext(str) {

  let next = [-1],
    len = str.length,
    i = 1,
    j = -1;

  for (i = 1; i < len; i++) {

    while (str[i] !== str[j + 1] && j > -1) {
      j = next[j];
    }

    if (str[j + 1] === str[i]) {
      j = j + 1;
    }

    next[i] = j;

  }

  return next;
};

// source 源字符串
// match 要匹配的字符串
// res 保存匹配位置的数组
function $search(source, match) {
  let next = calcNext(match),
    m = source.length,
    n = match.length,
    i = 0,
    j = 0,
    res = [];

  while (i < m - n) {
    if (source[i] === match[j]) {
      i++;
      j++;

      if (j === n) {
        res.push(i - n);
        j = next[j - 1] + 1;
      }
    } else {
      if (j === 0) {
        i++;
      } else {
        j = next[j - 1] + 1;
      }
    }
  }

  return $res;
};
for(var a = 0; a < 19; a++);
let source = res.data[a].English,
    match = this.data.search;

let res = $search(source, match);
console.log($res);