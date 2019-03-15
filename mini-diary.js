// function addTweet() {
//   // FILL ME IN
//   let div = document.getElementById("tweets-list");
//   let tweet = generateTweetHtml("hello world");
//   div.innerHTML = tweet += div.innerHTML;
// }

// function updateCharacterCount() {
//   // FILL ME IN
// }
let tweetArr = [];
// let id;

if (localStorage.getItem("tweetArray") !== null) {
  tweetArr = JSON.parse(localStorage.getItem("tweetArray"));
}
// let a = tweetArr.map(item => item.id);
// let b = a.pop();
// id = b + 1;
// } else {
//   id = 0;
// }
let tweetText = document.getElementById("inputText");
const MAX_NUM_CHARS = 10;
let numCharRemain = MAX_NUM_CHARS;
let charCount = document.getElementById("charRemaining");

let tweetHTML = "";
let tweetSection = document.getElementById("outputText");
let tweetButton = document.getElementById("tweetButton");

let dateTweet = "";
let retweet = "null";
let likeText = "";

let onUserInput = () => {
  console.log("string");
  let textLength = tweetText.innerText.length;
  numCharRemain = MAX_NUM_CHARS - textLength;
  console.log(textLength);
  console.log(numCharRemain);
  render();
};

// if (textLength > MAX_NUM_CHARS) {
//   tweetText.className = "text-input";
// } else {
//   tweetText.className = "";
// }
function generatePost() {
  let valueInput = tweetText.innerText;
  if (valueInput === "") {
    alert("pls enter");
  } else if (valueInput !== "" && valueInput.length < MAX_NUM_CHARS) {
    dateTweet = new Date();
    tweetArr.unshift({
      id: dateTweet.getTime(),
      // id: id,
      tweet: valueInput,
      time: dateTweet,
      like: false,
      retweet: retweet
    });
    // id++;
    console.log(tweetArr);
    render();
    tweetText.innerHTML = "";
    valueInput = "";
  }
  render();
}

function removeItem(index) {
  tweetArr.splice(index, 1);

  render();
}

function toggleLike(index) {
  tweetArr[index].like = !tweetArr[index].like;
  console.log(index);
  render();
}

function retweetFunction(id) {
  let parentTweet = tweetArr.find(item => item.id == id);
  console.log("p", parentTweet);
  let parID = parentTweet.id;
  let parTime = new Date();
  let parTweet = parentTweet.tweet;
  console.log(parTime);
  let parLike = false;
  let ParRetweet = parentTweet.id;

  tweetArr.push({
    id: parID,
    tweet: parTweet,
    time: parTime,
    like: parLike,
    retweet: ParRetweet
  });

  console.log(tweetArr);
  render();
}

function render() {
  tweetHTML = "";
  charCount.innerHTML = `<span class="${addClass(
    numCharRemain
  )}">  ${numCharRemain} characters remaining</span>`;

  let newArr = tweetArr;

  newArr.map((item, index) => {
    if (item.like) {
      likeText = "Unlike";
    } else {
      likeText = "Like";
    }

    tweetHTML += `<div class="card">
              <div class="card-body">
                <span><img class="img-radius" src="img/sampleava.jpg"></span>
                <span class="card-title">User Name</span>
                <h6 class="card-subtitle my-3 text-muted">${moment(
                  item.time
                ).format("DD-MM-YY hh:mm:ss A")} <span>(posted ${moment(
      item.time
    ).fromNow()})</h6>
                <p class="card-text border">
                  ${item.tweet}
                </p>

                <div class="d-flex flex-row justify-content-between">
                <a href="" onclick='toggleLike(${index})'>${likeText}</a>
                <a href="#"  class="card-link"> <img src="img/commenticon.png"></a>
                <span class="card-link" onclick=retweetFunction(${
                  item.id
                })><img src="img/retweet.png"></span>
                <a href="#" class="card-link"> <img src="img/staricon.png"></a>
                <span><img  src="img/bin2.png" onclick='removeItem(${index})'></span>
                </div>
              </div>
            </div>
            \n`;

    // `<li class="list-group-item TodoListStyle align-self-start" ><span><img src="#" onclick='removeItem(${index})'>${item}</span></li>\n`;
  });
  tweetSection.innerHTML = tweetHTML;
  localStorage.setItem("tweetArray", JSON.stringify(tweetArr));
}

function addClass(textLimit) {
  if (textLimit < 0) {
    tweetButton.disabled = true;
    return "text-danger";
  }
  if (textLimit >= 0) {
    tweetButton.disabled = false;
  }
}
console.log(numCharRemain);
// if (numCharRemain < 0) {
//     count.classList.remove("text-success");
//     count.classList.add("text-danger");
// }
render();
tweetText.addEventListener("input", onUserInput);
tweetButton.addEventListener("click", generatePost);

// function openForm() {
//   document.getElementById("myForm").style.display = "block";
// }

// function closeForm() {
//   document.getElementById("myForm").style.display = "none";
// }

// let displayName = document.getElementById("userName");
// let logInButton = document.getElementById("loginBtn");
// let userNameInput = document.getElementById("userInputName").value;

// function logIn() {
//   displayName.innerHTML = userNameInput;
//   closeForm();
//   render();
// }

// logInButton.addEventListener("click", logIn);
