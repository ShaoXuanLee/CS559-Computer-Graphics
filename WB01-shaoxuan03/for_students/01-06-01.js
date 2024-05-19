// put some code here
//formula: s3=s2-s1
const s1 = (document.getElementById("slider1"));
const s2 = (document.getElementById("slider2"));
const s3 = (document.getElementById("slider3"));

//min max and values were initialized in the html
//do the update for s1, s2 and s3

//s1
s1.oninput = function(){
    s3.value = (Number(s2.value) - Number(s1.value)).toString();
    displayValues();
}

//s2
s2.oninput = function(){
    s3.value = (Number(s2.value) - Number(s1.value)).toString();
    displayValues();
}

//s3
s3.oninput = function(){
    //so when s3 is moved, I need to make sure that s1 and s2 is a valid combination
    //only one slider is moved at a time
    // s3 = s2-s1
    // s1 = s2-s3 
    // s2 = s3+s1
    s1.value = (Number(s2.value) - Number(s3.value)).toString();
    //s2 will get updated if no s1 value is within the bound of the slider
    s2.value = (Number(s1.value) + Number(s3.value)).toString();
    displayValues();
}