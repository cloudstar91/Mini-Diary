let inputText = document.getElementById("inputText");
let outputArray = [];
const MAX_NUM_CHARS = 40;
let numCharRemain = MAX_NUM_CHARS;
let charCount = document.getElementById("charRemaining");

let tweetButton = document.getElementById("tweetButton");

// Adding texts to output text section  
tweetButton.addEventListener('click', () => {
    outputArray.push(inputText.value);
    console.log(outputArray);
    inputText.value = ""; 
    updateOutputText();
    })

let updateOutputText = () => {
    let html = "";
    for (let i=0; i < outputArray.length; i++){
        html += `<div> ${outputArray[i]} </div>`
    };
    document.getElementById("outputText").innerHTML = html;
}

// Showing the number of characters remaining
inputText.addEventListener('input', onUserInput);

  function onUserInput () {
    let textLength = inputText.value.length;
    numCharRemain = MAX_NUM_CHARS - textLength;
    updateCharRemaining();
  };
  
  function updateCharRemaining() {
    charCount.innerHTML = `<span class="${addClass(
      numCharRemain
    )}">  ${numCharRemain} characters remaining</span>`;
  }
  
  function addClass(textLimit) {
    if (textLimit < 0) {
      return "text-danger";
    }
  }

  