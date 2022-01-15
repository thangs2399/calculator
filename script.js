
/**
 * add()
 * -addition
 */
const add = function(x, y) {

    return x + y;
};

/**
 * sub()
 * -subtraction
 */
const sub = function(x,y) {

    return x - y;
}

/**
 * div()
 * division
 */
const div = function(x, y) {

    return x/y;
} 

/**
 * mul()
 * - multiply two numbers
 */
const mul = function(x, y) {

    return x * y;
} 

/**
 * operate()
 * - takes an operator and 2 numbers and then calls one of the above functions on the numbers.
 */
const operate = function(operator, x, y) {

    switch(operator) {

        case "add": return add(x,y);
            

        case "sub": return sub(x,y);
            

        case "div": return div(x,y);
            
        
        case "mul": return mul(x,y);
            
    }
};

const buttons = document.querySelectorAll("button");

// to evaluate after two inputs 
let evalCount = 0;
let leftOperand = "";
let rightOperand = "";
let operator = "";
let result = 0;
let evaled = false;
let history = false;
let leftOperandDecimal = false;
let rightOperandDecimal = false;

// reset the calculator
const reset = function() {

    evalCount = 0;
    leftOperand = "";
    rightOperand = "";
    operator = "";
    result = 0;
    evaled = false;
    history = false;
    leftOperandDecimal = false;
    rightOperandDecimal = false;
};


// this is main function
// it respond to click of the buttons of the calculator
const clicked = function(event) {

    const currText = document.getElementById("current");
    const resultText = document.getElementById("result");

    const targetID = event.target.id;
    const targetClass = event.target.className;
    if (targetID == "clear") {

        reset();
        currText.textContent = "";
        resultText.textContent = "";
    }

    // This handle decimal numbers
    // cant be place more than one decimal at each operand
    if (targetClass == "dButton" && evalCount == 0) { // this is leftOP

        if (!leftOperandDecimal) {

            leftOperand += ".";
            leftOperandDecimal = true;
            currText.textContent = leftOperand;
        } 
    } else if (targetClass == "dButton" && evalCount == 1) { // this is rightOP

        if (!rightOperandDecimal) {

            rightOperand += ".";
            rightOperandDecimal = true;
            currText.textContent = rightOperand;
        }
    }

    //delete an input
    if (targetID == "delete" && evalCount == 0) {

        leftOperand = leftOperand.slice(0, leftOperand.length - 1);
        currText.textContent = leftOperand;

    }  else if(targetID == "delete" && evalCount == 1) {

        rightOperand = rightOperand.slice(0, rightOperand.length - 1);
        currText.textContent = rightOperand;
    }

    // this handle the inputs
    if (evalCount == 0 && targetClass == "numButton") {

        if (history) {

            reset();
            currText.textContent = "";
            resultText.textContent = "";
        } 
        leftOperand += String(targetID);
    } else if (targetClass == "opButton" || targetClass == "opButton" && history) {

        evalCount = 1; // increment evalCount 
        operator = targetID;
    } else if (evalCount == 1 && targetClass == "numButton") {

        rightOperand += String(targetID);
    } else if (targetClass == "eqButton") {

        evalCount++; //increment evalCount, now it should be 2 and calculate the inputs
    }

    // if evalCount == 2, evaluate and reset evalCount to 0
    if (evalCount == 2) {

        if (operator == "div" && rightOperand == "0") {

            reset();
            resultText.textContent = "can't divide by zero!"
        } else {
            result = Number(operate(operator, parseFloat(leftOperand), parseFloat(rightOperand)).toFixed(2));

            evalCount = 0;
            evaled = true;
            history = true;
        }
    }

    // if evaled = true, then output the result on display screen
    if (evaled) {

        resultText.textContent = String(result); // output result text
        currText.textContent = ""; // output currText

        if (history) {

            leftOperand = String(result);
            result = 0;
            rightOperand = "";
        }
        evaled = false;
    }
    
    // if its first operand then output this in display screen
    if (evalCount == 0 && targetClass == "numButton") {

        currText.textContent = String(leftOperand); // output currText

    // if its operand then output the operand in display screen
    } else if (evalCount == 1 && targetClass == "opButton") {

        let currOp;

        switch(targetClass) {

            case "add":

                currOp = "+"
                break;

            case "sub":

                currOp = "-"
                break;
        
            case "div":

                currOp = "/"
                break;

            case "mul":

                currOp = "*"
                break;    
        }
        currText.textContent = currOp;

    // if its second operand then output this in display screen
    } else if (evalCount == 1 && targetClass == "numButton") {

        currText.textContent = String(rightOperand); // output currText
    }
    
};

buttons.forEach((button) => {

    button.addEventListener("click", (event) => {

        clicked(event);
    });
});


