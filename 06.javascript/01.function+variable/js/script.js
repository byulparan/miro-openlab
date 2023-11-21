

function add(a) {
  return a + 2;
}

function mult(x) {
  return x * x;
}

// define function minus
function minus(x, y) { 
  return x - y;
}

// document.write(   minus(100, 70)    );

// console.log( add(100) );

// console.log( "hello world ");

// console.log( "안녕하세요");


function foo(a, b) {

}

function bar() {
  return 4;
}

function f1(a) {
  return a + 1
}

function f2(a) {
  return a + 2;
}

function f3(a,b) {
  return a * b;
}

function f4(a,b) {
  return a - b;
}




// 변수는 정의되는 위치에 따라서 그 유효범위가 달라집니다.


// 함수 밖에서 let 으로 정의된 변수는 
// 코드 전역에서 유효합니다(=전역변수)
let a = 10;   // 재정의 가능
let b = 4;
const c = 10; // 상수. 재정의가 불가능

function fun() {
  let a = 4;  // 함수 안에서의 let 으로 정의되는 변수는 
              // 그 함수 안에서만 유효합니다(=지역변수).
  return a + 1;
}

console.log(fun());
console.log(a);















