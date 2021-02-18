function sayHello() {
    console.log("Hello");
}

let formButton1 = $("#button1");
formButton1.on("click", sayHello);


function Calculate() {
    let first = document.getElementById('field1').value;
    let last = document.getElementById('field2').value;

    document.getElementById('field3').value=parseInt(first) + parseInt(last);
}

let formButton2 = $("#button2");
formButton2.on("click", Calculate)


function hideFunction() {
    $("#paragraphToHide").hide(500);
}

let formButton3 = $("#button3");
formButton3.on("click", hideFunction);

function validateFunction() {
    let formField = $("#phoneField").val();
    let regularExpression = /^[0-9]{3}[-.][0-9]{3}[-.][0-9]{4}$/;

    if(regularExpression.test(formField)) {
        console.log("Ok");
    } else {
        console.log("Bad");
    }
}

let formButton4 = $("#button4");
formButton4.on("click", validateFunction);

function jsonFunction() {
    let formJsonObject = {};
    let formVal = $("#firstName").val();
    let formVal2 = $("#lastName").val();
    let formVal3 = $("#email").val();
    formJsonObject.myName = formVal;
    formJsonObject.myLastName = formVal2;
    formJsonObject.myEmail = formVal3;
    let jsonString = JSON.stringify(formJsonObject);
    console.log(jsonString);
    $("jsonResult").text(jsonString);
}

let formButton5 = $("#button5");
formButton5.on("click", jsonFunction);