// ================================================================================
// 배열
// ================================================================================

// 여러개의 데이터를 하나의 변수(객체)로 다루고 싶을때 사용하는 자료 구조.

let array = [ 10,20,30,40,50,60 ];

document.write(array + "<br>");
document.write(array.length + "<br>"); // 배열 길이

document.write(array[0] + "<br>");

array.push(800); // 배열 끝에 삽입
document.write(array + "<br>");

document.write(array.pop() + "<br>"); // 배열 마지막 아이템 추출
document.write(array + "<br>");


array.splice(3, 0, 1000);  // 배열 특정 위치에 삽입
document.write(array + "<br>");


array.splice(3,1); // 배열 특정 위치 아이템 제거
document.write(array + "<br>");


document.write(array.concat([100,200,300]) + "<br>"); // 배열 합치기


// document.write(array.map(item => { return item + 4 }));  // map

// document.write("<br>" + "<br>"); 

// document.write(array.filter(item => { return item < 40; })); // filter


let arr = [11,21,31,41,51];

for(let item of arr) {
  document.write(item);
  document.write("<br>");
}


// ================================================================================
// 오브젝트
// ================================================================================

document.write('------------------------<br><br>' )

let obj = {
  a: 10, // 키와 값 쌍으로 이루어져있다.
  b: 30,
  c: 100,
  "hello": 20000,
  xyz: "안녕하세요"
};

document.write(obj.xyz);
document.write("<br>");
obj.xyz = "감사합니다";
document.write(obj.xyz);







