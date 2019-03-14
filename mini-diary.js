// function addTweet() {
//   // FILL ME IN
//   let div = document.getElementById("tweets-list");
//   let tweet = generateTweetHtml("hello world");
//   div.innerHTML = tweet += div.innerHTML;
// }

// function updateCharacterCount() {
//   // FILL ME IN
// }

let tweetText = document.getElementById("inputText");
const MAX_NUM_CHARS = 40;
let numCharRemain = MAX_NUM_CHARS;
let charCount = document.getElementById("charRemaining");

let onUserInput = () => {
  console.log("string");
  let textLength = tweetText.value.length;
  numCharRemain = MAX_NUM_CHARS - textLength;
  console.log(textLength);
  console.log(numCharRemain);
  render();
};

function render() {
  charCount.innerHTML = `<span class="${addClass(
    numCharRemain
  )}">  ${numCharRemain} characters remaining</span>`;
  tweetText.addEventListener("input", onUserInput);
}

function addClass(textLimit) {
  if (textLimit < 0) {
    return "text-danger";
  }
}
console.log(numCharRemain);
// if (numCharRemain < 0) {
//     count.classList.remove("text-success");
//     count.classList.add("text-danger");
// }
render();
