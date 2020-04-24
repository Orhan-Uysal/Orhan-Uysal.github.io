var rows = 0;
function add(name,url) {
    if (rows == 10) {

        alert("You cannot add more than 10 items to your cart.")

    }
    else if (rows < 10) {

        var req = new XMLHttpRequest();
        req.overrideMimeType("application/json");
        req.open('GET', url);
        req.send();
        req.onload = function () {
            if (req.status != 200) {
                console.log(req.status);
            }
            else {
                var jsonResponse = JSON.parse(req.responseText);
                print(jsonResponse);
            
            }
        }

        function print(jsonResponse) {
            
            console.log(jsonResponse);

            var p = document.createElement("p");

            var t1 = document.createTextNode(jsonResponse.objects[name].Name+" "+jsonResponse.objects[name].cost);

            
            p.appendChild(t1);
       

            document.getElementById("myTable").appendChild(p);
        }

        rows++;
    
    } 

}
function checkout(){
    
}
function validateAll(){
    var invalid = [];
    validateName(invalid);
    validateEmail(invalid);
    validatePass(invalid);

    if (invalid.length != 0) {
        alert("Please resubmit the form: \n" + invalid.join("\n"));
        return false;
    }
    return true;
}
function validatePay(){
    var invalid = [];

    validateName(invalid);
    validateEmail(invalid);
    validateCard(invalid);
    
    if (invalid.length != 0) {
        alert("Please resubmit the form: \n" + invalid.join("\n"));
        return false;
    }
    return true;
}
function validateCard(invalid){
    var allLetters = /^[a-zA-Z]+$/;
    var cardno = /^(?:[0-9]{16})$/;
    var cvv = /^(?:[0-9]{3})$/;

    if (!allLetters.test(myForm.Name2.value)) {
        invalid.push("*Invalid Cardholder Name");
    }
    if(!cardno.test(myForm.creditcard.value)){
        invalid.push("*Invalid Card Number");
    }
    if(!cvv.test(myForm.creditcardcvv.value)){
        invalid.push("*Invalid CVV");
    }
}
function validateName(invalid){

    var allLetters = /^[a-zA-Z]+$/;

    if (!allLetters.test(myForm.Name.value)) {
        invalid.push("*Invalid Name");
    }

    if (!allLetters.test(myForm.Surname.value)) {
        invalid.push("*Invalid Surname");
    }

}
function validateEmail(invalid) {
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.email.value)){
    return;
  }
    else{
        invalid.push("*Invalid Email")
    }
}

function validatePass(invalid) {

    var pass = document.getElementsByName('pass')[0].value;
    var rep = document.getElementsByName('repeat')[0].value;

    console.log(pass);
    var length = pass.length;
    if(length < 8){
        invalid.push("*Your password has to be atleast 8 characters long")
    }
    var uppercase = false,lowercase = false,number = false,i;
    for(i=0;i<length;i++){
        if(pass[i] >= 'a' && pass[i] <='z')
            lowercase = true;
        else if(pass[i] >= 'A' && pass[i] <= 'Z')
            uppercase = true;
        else if(pass[i] >= '0' && pass[i] <= '9')
            number = true;
    }

    if(!lowercase){
       invalid.push("*Your password has to contain a lowercase letter");
       
    }
    if(!uppercase){
       invalid.push("*Your password has to contain an uppercase letter");
       
    }
    if(!number){
        invalid.push("*Your password has to contain a number");
    }
    if(pass !== rep){
        invalid.push("*Your password and repeat password do not match")
    }

}
