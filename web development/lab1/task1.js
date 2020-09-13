function ReturnArray(n){
  var arr = [];
  for (var i = 0; i < n; i++){
    arr.push(i);
  }
  return arr;
}

function DividingWithoutRemainder(a, b, c){
  if (a % b == 0 && a % c == 0)
    return true;
  else
    return false;
}

function Capitalize(str){
  return str.replace(str[0], str[0].toUpperCase());
}

//part 1
console.log(ReturnArray(6));
//part 2
console.log(DividingWithoutRemainder(6, 3, 2));
console.log(DividingWithoutRemainder(6, 7, 2));
//part 3
console.log(Capitalize("string")); 