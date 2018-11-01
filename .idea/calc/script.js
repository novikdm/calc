document.getElementById('rezultInput').value = "0";

//Global variables

let numberA = null;
let numberB = null;
let operation = null;
let decimalA = false;
let decimalB = false;

let memory = "0";


//  Add number---------------------------------------------

for (let element of document.getElementsByClassName("number")) {
    element.onclick = function () {
        let id = element.getAttribute("id");
        let number = id.charAt(id.length-1);
        if(operation === null || operation === "=") {
            if(operation === "=") numberA = null;
            if (+numberA < 999999999999 && +numberA > -999999999999 && (numberA === null? true: numberA.length < 15)) {
                if (numberA !== null && numberA !== "0") {
                    if (decimalA && !isDot(numberA)) {
                        numberA = numberA + "." + number;
                    }
                    else {
                        numberA = numberA + number;
                    }
                }
                else {
                    if (decimalA && !isDot(numberA)) {
                        numberA = "0." + number;
                    }
                    else {
                        numberA = number;
                    }
                }
            }
        }
        else {
            if(+numberB < 999999999999 && +numberB > -999999999999 && (numberB === null? true: numberB.length < 15)){
                if (numberB !== null && numberB !== "0"){
                    if(decimalB && !isDot(numberB)){
                        numberB = numberB + "." + number;
                    }
                    else {
                        numberB = numberB + number;
                    }
                }
                else {
                    if(decimalB && !isDot(numberB)){
                        numberB = "0." + number;
                    }
                    else {
                        numberB = number;
                    }
                }
            }
         }
        changeInputString();
    }
}


//  Add operation--------------------------------------------------------

for (let element of document.getElementsByClassName("operation")) {
    element.onclick = function () {
        if(numberA !== null && numberB !== null) localEquals();
        let operationID = element.getAttribute("id");
        switch (operationID) {
            case "plus" :{
                operation = "+";
                break;
            }
            case "minus": {
                operation = "-";
                break;
            }
            case "multiply": {
                operation = "*";
                break;
            }
            case "division": {
                operation = "/";
                break;
            }
            default :{
                operation = "+";
                alert("Error #0004");
                console.log("Error #0004: Somthing wrong in operation");
            }
        }
        let input = getInput();
        let lastSimbol = input.charAt(input.length-1);
        if(lastSimbol === "*"
            || lastSimbol === "/"
            || lastSimbol === "+"
            || lastSimbol === "-")
        {
            input = input.substring(0, input.length-1);
            setInputOnlyText(input + operation);
        }
        else{
            setInputOnlyText(input + operation);
        }
    }
}


//Function of "equals"-----------------------------------

document.getElementById("equals").onclick = function () {
    equals();
};

//CE and C functions-----------------------------------


document.getElementById("ce").onclick = function () {
    if(numberB !== null) {
        numberB = "0";
    }
    else
        if(operation !== null){
        numberB = "0";
        }
        else numberA = "0";
    changeInputString();
};

document.getElementById("c").onclick = function () {
    allToNull();
};

//Back function---------------------------------------

document.getElementById("back").onclick = function () {
    let buffer = "";
    if(numberA !== null){
        if(operation !== null){
            if(numberB !== null){
                buffer += numberB;
                buffer = buffer.slice(0, (buffer.length -1));
                numberB = buffer;
            }
            else {
                operation = null;
            }
        }
        else{
            buffer += numberA;
            buffer = buffer.slice(0, (buffer.length -1));
            numberA = buffer;
        }
    }
    changeInputString();
};

// SQRT function---------------------------------------

document.getElementById("sqrt").onclick = function () {
    localEquals();
    let number = + numberA;
    if(number >= 0) {
        numberA = "" + Math.sqrt(number);
        changeInputString();
        operation = "=";
    }
    else{
        console.log("Error: Negative number in SQRT function");
        console.log("NumberA: "+ numberA);
        allToNull();
        setInputOnlyText("Error");
    }
};

// SQR function-------------------------------------

document.getElementById("sqr").onclick = function () {
    localEquals();
    let number = + numberA;
    number *= number;
    numberA = "" + number;
    changeInputString();
    operation = "=";
};

//-----1/x function----------------

document.getElementById("onedividex").onclick = function () {
    localEquals();
    let rezult = "Error: devision by 0";
    let number = + numberA;
    if(number != 0) {
        rezult = 1/numberA;
        numberA = "" + rezult;
        changeInputString();
    }
    else {
        allToNull();
        setInputOnlyText(rezult);
    }
    operation = "=";
};

//------------(+-)function-----------------

document.getElementById("negative-positive").onclick = function(){
    let number;
    if(operation != null) {
        if(numberB === null) initializationOfNumberB();
        number = +numberB;
        if(number > 0){
            numberB = "-" + number;
        }
        else {
            if(+numberB !== 0){
                numberB = numberB.substring(1, numberB.length);
            }
        }
    }
    else {
        if(numberA != null) {
            number = +numberA;
            if(number > 0){
                numberA = "-" + number;
            }else {
                if(+numberA !== 0){
                    numberA = numberA.substring(1, numberA.length);
                }
            }
        }
        else {
            initializationOfNumberA();
            number = +numberA;

            if(number > 0){
                numberA = "-" + number;
            }else {
                if(+numberA !== 0){
                    numberA = numberA.substring(1, numberA.length);
                }
            }
        }
    }
    changeInputString();
}


// Percent function-----------------------------------------
document.getElementById("percent").onclick = function () {
    if(numberA !== null){
        if(numberB != null){
            numberB =  (numberA*numberB)/100;
        }
        else
            if(operation !== null){
                numberB = (numberA*numberA)/100;
            }
            else numberA = (numberA*numberA)/100;
    }
    else {
        let input = getInput();
        if(input === ""){
            numberA = "0";
        }
    }
    changeInputString();
    operation = "=";
};



//DOT function ---------------------------------

document.getElementById("dot").onclick = function () {
    let buffer = "";
    let addToInputString = ".";
    let inputString = getInput();
    if(numberA !== null){
        if(operation !== null){
            if(numberB !== null){
                if(decimalB) {
                    addToInputString = "";
                }
                else {
                    decimalB = true;
                }
            }
            else {
                numberB = "0";
                decimalB = true;
                addToInputString = "0.";
            }
        } else {
            if(decimalA) {
                addToInputString = "";
            }
            else {
                if(numberA === "0"){
                    addToInputString = "0.";
                }
                decimalA = true;
            }
        }
    }else {
        numberA = "0";
        decimalA = true;
        addToInputString = "0.";
    }
    if(inputString.charAt(inputString.length - 1) === ")"){
        inputString = inputString.substring(0, inputString.length-1) + ".)";
    }else {
        inputString += addToInputString;
    }
    setInputOnlyText(inputString);
};

// Memory Clear-------------------------------------

document.getElementById("MC").onclick = function () {
    memory = "0";
}

// Memory Save--------------------------------------

document.getElementById("MS").onclick = function () {
    if(numberA != null){
        if(numberB != null){
            memory = numberB;
        }
        else {
            memory = numberA;
        }
    }
    else {
        initializationOfNumberA();
        memory = numberA;
    }
}

//Memory Plus------------------------------------------------

document.getElementById("MP").onclick = function () {
    let buffer;
    if(numberA != null){
        if(numberB != null){
            buffer = +memory;
            buffer += +numberB;
            memory = "" + buffer;
        }
        else{
            buffer = +memory;
            buffer += +numberA;
            memory = "" + buffer;
        }
    }else{
        initializationOfNumberA();
        buffer = +memory;
        buffer += +numberA;
        memory = "" + buffer;
    }
}

//Memory Minus--------------------------------------------

document.getElementById("MM").onclick = function(){
    let buffer = +memory;
    if(numberA !== null){
        if(operation !== null){
            if(numberB != null){
                memory = "" + (buffer - (+numberB));
            }else memory = "" + (buffer - (+numberA));
        }else memory = "" + (buffer - (+numberA));
    }else {
        initializationOfNumberA();
        memory = "" + (buffer - (+numberA));
    }
}


// Memory Recall-------------------------------------------

document.getElementById("MR").onclick = function () {
    if(numberA !== null){
        if(numberB !== null){
            numberB = memory;
        }else{
            if(operation !== null){
                numberB = memory
            }else numberA = memory;
        }
    }else numberA = memory;
    changeInputString();
}

//-----------------------------------------------------------



//------------------------------------------------------------
//-------------------------------------------------------------
//Service functions


function equals() {
    let rezult = "ERR";
    if(operation === null){
        if(numberA !== null){
            rezult = numberA;
        }
        else {
            rezult = getInput();
        }
    }
    else{
        if(numberB === null) initializationOfNumberB();
    }
    let numA = +numberA;
    let numB = +numberB;
    switch (operation) {
        case "+":{
            rezult = numA + numB;
            break;
        }
        case "-":{
            rezult = numA - numB;
            break;
        }
        case "*":{
            rezult = numA * numB;
            break;
        }
        case "/":{
            if(numB != 0){
                rezult = numA / numB;
            }
            break;
        }
        default : break;
    }
    if(rezult !== "ERR"){
        if(rezult !== 0 && rezult%1 !== 0){
            rezult = +rezult;
            rezult = rezult.toFixed(7);
            rezult = "" + rezult;
            let buf = rezult.length;
            for (let i = rezult.length-1; i >= 0 ; i--) {
                if(rezult.charAt(i) === "0"){
                    buf = i;
                }
                else break;
            }
            rezult = rezult.substring(0, buf);
        }
    }
    if(rezult != "ERR") numberA = "" + rezult;
    else numberA = null;
    numberB = null;
    operation = null;
    decimalB = false;
    changeInputString();
    operation = "=";
}






function localEquals() {
    let rezult = false;
    if(numberA !== null){
        if(operation !== null) {
            if(numberB !== null) {
                equals();
                rezult = true;
            } else{
                operation = null;
                changeInputString();
                rezult =  true;
            }
        } else {
            changeInputString();
            operation = "=";
            rezult =  true;
        }
    }
    return rezult;
}

function getInput() {
    let rezultText = "";
    let innputText = document.getElementById('rezultInput').value;
    if (innputText !== "0") rezultText = innputText;
    return rezultText;
}

function setInput(text) {
    let input = document.getElementById("rezultInput");
    input.value = getInput()+ text;
}
function setInputOnlyText(newInputString) {
    document.getElementById("rezultInput").value
        = newInputString;
}

function getLastNumber(){
    if(operation !== null){
        let inputString = getInput();
        let arrayOfNumbers = inputString.split(operation);
        return arrayOfNumbers[arrayOfNumbers.length - 1];
    }
    else return 0;
}


function initializationOfNumberB(){
    numberB = getLastNumber();
}

function initializationOfNumberA() {
    let inputString = getInput();
    if(operation !== null){
        let arrayOfNumbers = inputString.split(operation);
        numberA = arrayOfNumbers[arrayOfNumbers.length - 1];
    }
    else if(inputString !== "") numberA = inputString;
    else numberA = "0";
}

function allToNull() {
    numberA = null;
    numberB = null;
    operation = null;
    decimalA = false;
    decimalB = false;
    setInputOnlyText("0");
}

function changeInputString() {
    let destiny;
    let newInputString = "";
    let numA = +numberA;
    let numB = +numberB;
    if(operation === "=") operation = null;
    if(numberA !== null)
        if(operation !== null)
            if(numberB !== null) {
                destiny = 1;
            }
            else {
                destiny = 2;
            }
        else {
            destiny = 3;
        }
     else {
         destiny = 4;
    }

     switch (destiny) {
         case 1:{
             newInputString  = newInputString
                 + (numA >= 0 ? numberA : "(" + numberA + ")")
                 + operation
                 + (numB >= 0 ? numberB : "(" + numberB + ")" );
             break;
         }
         case 2:{
             newInputString  = newInputString
                 + (numA >= 0 ? numberA : "(" + numberA + ")")
                 + operation;
             break;
         }
         case 3:{
             newInputString  = newInputString
                 + (numA >= 0 ? numberA : "(" + numberA + ")");
             break;
         }
         case 4:{
             alert('Error #0005');
             console.log("Error #0005: All are Null");
             break;
         }
         default :{
             alert('Error #0006');
             console.log("Error #0006: function changeInputString() switch-default error");
         }
     }
     setInputOnlyText(newInputString);
}

function isDot(number) {
    let rezult = false;
    let buffer = "" + number;
    if(buffer.indexOf(".")>=0) rezult = true;
    return rezult;
}


