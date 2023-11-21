// ================================================================================
// Math
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math
// ================================================================================
let result;
result = Math.abs(-14);
result = Math.cos(10.4);

result = Math.floor(10.3);  // 내림
result = Math.ceil(10.3);   // 올림
result = Math.round(10.5);  // 반올림
result = Math.random();
result = Math.max(1,2,3,4,5,6);
result = Math.min(1,2,3,4,5,6);
result = Math.PI;


// ================================================================================
// String
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String
// ================================================================================

let string = "hello world";

// 문자열 길이
string.length;

// 문자열 자르기 
string.split(" ");
"010-1234-5678".split("-")

// 문자열 합하기 
"hello" + "world";


// ================================================================================
// 참과 거짓
// ================================================================================

// 결과 값이 참(true) 혹은 거짓(false) 인 연산자들.

let a = 10;
a = 4;
a = 8;

10 == 10  // 두 값이 같은가?

10 != 10  // 두 값이 다른가?

10 > 4

10 < 21


// ================================================================================
// 조건
// ================================================================================

if (10 < 4) {
  document.write("true!");
}


// 

// if (10 != 10) {
//   document.write("진실!");
// }
// else {
//   document.write("거짓!");
// }


//

if (10 == 14) {
  document.write("A");
}
else if (12 == 10) {
  document.write("B");
}
else if (20 != 20) {
  document.write("C");
}
else {
  document.write("D");
}


// ================================================================================
// 반복
// ================================================================================


let z = 1;
z = z + 1;  // 2 
z++; // a = a + 1;

for(let i = 0; i < 8; i++) {
  console.log(i);
}

for(let k = 0; k < 4; k++) {
  console.log("hello world " + k);
}


// 

let arr = [10,20,30,40,50];

for(let item of arr) {
  
}

