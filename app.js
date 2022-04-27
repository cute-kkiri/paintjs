const canvas = document.getElementById("jsCanvas");
// canvas에서 쓸 수 있는 메소드? getContext를 통해 canvas의 픽셀을 다룬다.
// canvas는 기본적으로 픽셀을 다루고 있어서 기본적으로 이미지를 가진다. 따라서 canvas는 이미지 저장과 복사가 내장되어 있다.
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

// 중복되는 값을 variable에 미리 넣어주고 사용.
const INITIAL_COLOR = "#2c2c2c"; // color의 default값을 변수에 넣어서 사용.
const CANVAS_SIZE = 700;

// canvas는 픽셀로 움직이기 때문에 canvas의 width값과 height값이 필요하다. canvas size 불러오기.
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 처음 시작했을 때 기본 값. default
ctx.fillStyle = "white"; // canvas가 load 되자마자 canvas의 background값이 설정되도록 해야 이미지 저장이나 복사를 했을 떄 canvas background color가 나타난다. 아니면 아무런 색상도 나오지 않음.
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // canvas에 fillStyle의 color값으로 canvas를 그려줌.
ctx.strokeStyle = INITIAL_COLOR; // line
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // line

/*  // fill
ctx.fillStyle = "green";
// fillRect - width와 height에 의해서 결정된 사이즈로 x, y위치에 색칠된 사각형을 그린다.
ctx.fillRect(50, 20, 100, 49); // x50, y20위치값에 width100, height49사이즈의 사각형이 검정색으로 그려진다. 위의 strokeStyle color값과 상관없이(strokeStyle color값을 변경해도 검정색으로 그려져있음.)
ctx.fillStyle = "purple"; // 여기서 color값을 바꿔도 위에있는 fillRect의 값에는 영향이 가지 않는다.
ctx.fillRect(80, 100, 100, 49); // 여기서 새로 그려진 fillRect가 purple값으로 그려짐.
 */

let painting = false; // paint모드 체크
let filling = false; // filling모드 체크

function stopPainting() { // painting = ture, false를 계속 반복하니까 만들어둔 함수
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) { // 마우스를 움직이는 내내 계속 발생한다.
    /* 
    console.log(event);
    - clientX, Y - 윈도우 전체의 범위 내에서 마우스 위치값을 나타냄.
    - offsetX, Y - 캔버스 내에서의 좌표값(원하는 박스안에서의 좌표값)
    */

    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(x, y);

    if(!painting) { // 클릭하고 움직이면 이 조건문은 더이상 실행되지 않는다.
        // console.log("creating path in ", x, y); // 마우스를 움직이는 내내 계속 발생한다.

        // path - line의 시작, line이기도 함. 선의 시작점을 만드는 것
        ctx.beginPath();
        // 마우스가 움직이는 곳으로 path를 옮기는 것
        // 마우스를 클릭하면 클릭한 위치가 그 path의 끝나는 지점으로서 선택된 것이다.
        ctx.moveTo(x, y);

        // 마우스를 움질일 때마다 path를 만든다. path의 시작점은 마우스가 있는 곳.
    } else {
        // console.log("creating line in ", x, y);

        // 시작에서 끝지점까지 연결해주는 lineTo
        // lineTo - 현재 sub-path의 마지막 점을 특정 좌표와 직선으로 연결한다.
        ctx.lineTo(x, y); // 여기까지는 선이 눈에 보이는 선이 만들어지진 않는다.
        // stroke - 현재의 stroke style로 현재의 sub-path에 획을 그음.
        ctx.stroke();

        // path의 이 전 위치랑 연결이 된다. 그래서 선이 그려지는 것.

        // ctx.closePath(); path를 닫는다? line을 닫기때문에 시작한 지점과 마우스 위치까지 직선으로 연결됨.
    }

}

/* 
// 더이상 필요하지 않아서 지움.
function onMouseDown(event) {
    // console.log(event);

    painting = true;
} */

/* function onMouseUp(event) {
    // painting = false;

    stopPainting(); // 중복 줄임.
} */

/* 
// stopPainting 함수로 처리해줄 수 있어서 생략 가능.
function onMouseLeave(event) {
    painting = false;
} 
*/

function handleColorClick(event) {
    // console.log(event.target.style);

    const color = event.target.style.backgroundColor;
    // console.log(color);

    ctx.strokeStyle = color; // canvas의 strokeStyle의 색상을 target에 있는 색상으로 변경
    ctx.fillStyle = color; // color값이 변경될때마다 fill color도 같이 바꿔줌.(코드의 편의상 이게 나아보임.)(fill color변경 두번째 방법)
}

function handleRangeChange(event) {
    // console.log(event);
    // console.log(event.target.value);

    // stroke 굵기 조절
    const size = event.target.value;
    ctx.lineWidth = size;

}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
        // ctx.fillStyle = ctx.strokeStyle; // fill모드일 때 stroke color값을 fill color값으로 변경해줌.(fill color변경 첫번째 방법)(handleColorClick에서 바꿔줬으니 여기는 필요없어져서 지움.)
    }
}

function handleCanvasClick() {
    // canvas에 색을 채울 때 fillRect로 canvas사이즈크기의 사각형을 만든다. 아래 방법 둘 다 가능
    // ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    if(filling) { // fill mode일 떄 적용되게
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) { // 마우스 우클릭 메뉴
    // console.log(event);
    event.preventDefault(); // contextmenu안나옴.
}

function handleSaveClick() {
    // canvas를 이미지로 저장하려면 가장 먼저 canvas의 데이터를 image 처럼 얻어야 한다. 이를 실행해줄 수 있게 해주는게 toDataURL메소드이다.(HTMLCanvasElement.toDataURL())
    // toDataURL - (기본적으로 PNG로 설정된)type parameter에 의해 지정된 포맷의 이미지 표현을 포함한 data URL를 반환함. 꼭 png만할 수 있는건 아니다.
    const image = canvas.toDataURL(); // default값이 png니까 png로 저장할 수 있음.
    // const image = canvas.toDataURL("image/jpeg"); // 이렇게 jpeg로 바꿀 수 있음.
    // console.log(image);
    // 존재하지 않는 링크 생성
    const link = document.createElement("a");
    link.href = image; // a태그의 href속성에 임의로 생성한 image link를 넣어줌.
    // download - a(anchor)태그의 attribute.
    link.download = "PaintJS[🎨]"; // download에는 이미지 name을 지정해줌.
    // console.log(link);
    link.click();

}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove); // mousemove - 마우스 움직일 때
    canvas.addEventListener("mousedown", startPainting); // mousedown - 클릭했을 때 발생하는 이벤트. 클릭한 상태에서 손을 떼기 전까지
    // canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", stopPainting); // mouseup - 마우스클릭하고 손을 뗐을 때
    // canvas.addEventListener("mouseup", onMoustUp);
    // canvas.addEventListener("mouselaeve", onMouseLeave);
    canvas.addEventListener("mouselaeve", stopPainting); // 반복되는 함수를 만들어둬서 함수만 추가하여 적어줘도 됨.
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM); // canvas에서 마우스 우클릭했을 때 나오는 menu, contextmenu라고 한다.
}

/* // array.form - object로 부터 array를 만드는 메소드.
console.log(Array.from(colors)); */

// array를 주면 array안에서 forEach로 가져올 수 있다.
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}