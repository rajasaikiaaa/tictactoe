//accessing all the boxes(buttons);
let boxes = document.querySelectorAll(".box");
//accessing the reset button
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let main = document.querySelector("main");
let count = 0;
// 1st we have to track whether it's X player or O player;
let turnO = true; // tracking the O player turn;
// storing the winning patterns using arrays;
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

// adding event listeners to every boxes;
console.log(boxes);
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){ //playerO
            box.innerText = "O";
            turnO = false;
            box.style.color = "red";
        } else { //playerX
            box.innerText = "X";
            turnO = true;
            box.style.color = "green";
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes){
        box.disabled = true;
    }
};
const enableBoxes = () => {
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
        main.classList.remove("hide");
    }
};
const showWinner = (winner) => {
    msg.innerText = `Hurry, ${winner} is the Winner`;
    msgContainer.classList.remove("hide");
    msgContainer.classList.remove("red");
    disableBoxes();
    main.classList.add("hide");
};

const checkWinner = () => {
    for( let patterns of winPatterns) {
        let pos1Val = boxes[patterns[0]].innerText;
        let pos2Val = boxes[patterns[1]].innerText;
        let pos3Val = boxes[patterns[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }
        }
    }
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    count = 0;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        count++;
        console.log(count);
        checkCount();
})});
const checkCount = () => {
    if(count === 9){
        showDraw();
    }};


const showDraw = () => {
    msg.innerText = `Game is Draw , Restart the game`;
    msgContainer.classList.remove("hide");
    msgContainer.classList.add("red");
    disableBoxes();
    main.classList.add("hide");
};

// boxes.forEach((box) => {
//     box.addEventListener("click", () => {
//         if()
//     })
// })