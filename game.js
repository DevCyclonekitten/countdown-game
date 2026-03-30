function GameMaster(){
    // RESET AREA
    

    ResetGame();


    // GENERATION AREA
    var largeNumbersOptions = [25,50,75,100];
    var generalNumbersOptions = [1,2,3,4,5,6,7,8,9,10,1,2,3,4];
    var higherNumbersOptions = [5,6,7,8,9,10];

    var difficulty = 5;

    if(difficulty>2){
        largeNumbersOptions.push(15,35);
        generalNumbersOptions.push(3,5,7,11);
        higherNumbersOptions.push(6,8,10,4);
    }
    if(difficulty>4){
        higherNumbersOptions.push(13,12,14,11);
        largeNumbersOptions.push(85,65,40,95);
    }
    if(difficulty>6){
        higherNumbersOptions.push(3,5,7,13,12,11);
        largeNumbersOptions.push(67,55,95,70);
        generalNumbersOptions.push(12);
    }

        largeNumbersPool = largeNumbersOptions;
        generalNumbersPool = generalNumbersOptions;
        higherNumbersPool = higherNumbersOptions;
}

function ResetGame(){
    var reset = [...document.getElementsByClassName("node-selection-activated")];
    for(let i=0; i< reset.length;i++){
        reset[i].classList.remove("node-selection-activated");
        reset[i].classList.add("node-selection");
        reset[i].innerText="[-]";
        reset[i].onclick = function(){ClickNumber(i,reset[i])};
    }

    var nodeSelection = [...document.getElementsByClassName("node-selection")];
    for(let i=0; i<nodeSelection.length;i++){
        nodeSelection[i].onclick = function(){ClickNumber(i,nodeSelection[i])};
        nodeSelection[i].innerText= "[-]";
    }

    var numberBox = [...document.getElementsByClassName("number-box")];
    for(let j=0; j< numberBox.length;j++){
        numberBox[j].innerText="";
    }

    var targetBox = document.getElementsByClassName("target-number-box");
    for(let k=0; k<targetBox.length;k++){
        targetBox[k].innerText="";
    }


    runningAnimation=false;
    selectedNumber=false;
    numbersSelected=[];


}
function UpdateDisplayAnimation(){
    if(numbersSelected.length==6){
        runningAnimation=true;
    }
    if(runningAnimation&&!selectedNumber){
        var randomNumberString = Math.random()+"_";
        var targetBox = document.getElementsByClassName("target-number-box");
        for(let k=0; k<targetBox.length;k++){
            targetBox[k].innerText=randomNumberString[k+2];
        }
    }
}
function UpdateNumbersBox(){
    var buttons = document.getElementsByClassName("number-box");
    if(numbersSelected.length>variableGameDigitsSelected){
        return;
    }
    for(let i=0; i<numbersSelected.length;i++){
        buttons[i].innerText=numbersSelected[i];
    }
}