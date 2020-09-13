function GetInputValue(){
    const inputTag = document.getElementById('myInput');
    const pTag = document.getElementById("mytag");
    
    pTag.textContent = inputTag.value;
}