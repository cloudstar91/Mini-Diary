let tweetArr = [];
let isLogin = false;
// let id;

if (localStorage.getItem("tweetArray") !== null) {
  tweetArr = JSON.parse(localStorage.getItem("tweetArray"));
}
//
async function fetchData() {
  if (isLogin == false) {
    return;
  }
  let url = `https://api.myjson.com/bins/14eeja`;

  let response = await fetch(url);
  let data = await response.json();
  tweetArr = data.arrayApi;
  render(tweetArr);
}

let tweetText = document.getElementById("inputText");
const MAX_NUM_CHARS = 140;
let numCharRemain = MAX_NUM_CHARS;
let charCount = document.getElementById("charRemaining");
let numOfTweets = document.getElementById("totalTweet");

let tweetHTML = "";
let tweetSection = document.getElementById("outputText");
let tweetButton = document.getElementById("tweetButton");

let dateTweet = "";
let retweet = "null";
let likeText = "";
let hashTags = [];

let onUserInput = () => {
  console.log("string");
  let textLength = tweetText.innerText.length;
  numCharRemain = MAX_NUM_CHARS - textLength;
  console.log(textLength);
  console.log(numCharRemain);
  render(tweetArr);
};

// if (textLength > MAX_NUM_CHARS) {
//   tweetText.className = "text-input";
// } else {
//   tweetText.className = "";
// }
function extractTags(str) {
  var words = str.split(" ");
  var tags = [];
  for (var i = 0; i < words.length; i++) {
    if (words[i][0] === "#") {
      tags.push(words[i]);
    }
  }
  return tags;
}
function generatePost() {
  if (isLogin == false) {
    return;
  }
  let valueInput = tweetText.innerText;
  if (valueInput === "") {
    alert("pls enter");
  } else if (valueInput !== "" && valueInput.length < MAX_NUM_CHARS) {
    hashTags = extractTags(valueInput);
    dateTweet = new Date();
    tweetArr.unshift({
      id: dateTweet.getTime(),
      // id: id,
      tweet: valueInput,
      time: dateTweet,
      like: false,
      retweet: retweet,
      hashTag: hashTags
    });
    // id++;
    console.log(tweetArr);
    console.log("hashTags: ", hashTags);
    render(tweetArr);
    tweetText.innerHTML = "";
    valueInput = "";
  }
  // render();
}

function removeItem(index, id) {
  var a = tweetArr.filter(item => {
    if (item.id !== id) {
      return item;
    }
  });
  tweetArr = a;
  // tweetArr.splice(index, 1);
  render(tweetArr);
}

function toggleLike(index) {
  tweetArr[index].like = !tweetArr[index].like;
  console.log(index);
  render(tweetArr);
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
  let hashTag = parentTweet.hashTag;

  tweetArr.unshift({
    id: parID,
    tweet: parTweet,
    time: parTime,
    like: parLike,
    retweet: ParRetweet,
    hashTag: hashTag
  });

  console.log(tweetArr);
  render(tweetArr);
}

// }
let tagText = document.getElementById("hashTagHTML");

function render(data) {
  if (isLogin == false) {
    return;
  }
  let userName = document.getElementById("userInputName").value;
  tweetHTML = "";
  tagHTML = "";

  charCount.innerHTML = `<span class="${addClass(
    numCharRemain
  )}">  ${numCharRemain} characters remaining</span>`;

  let result = {};
  let newArr = data;

  newArr.map((item, index) => {
    if (item.like) {
      likeText = "Unlike";
    } else {
      likeText = "Like";
    }

    tweetHTML += `<div class="card">
              <div class="card-body">
                <span><img class="img-radius" src="img/sampleava.jpg"></span>
                <span class="card-title">${userName}</span>
                <h6 class="card-subtitle my-3 text-muted">${moment(
                  item.time
                ).format("DD-MM-YY hh:mm:ss A")} <span>(posted ${moment(
      item.time
    ).fromNow()})</h6>
                <p class="card-text border">
                   ${item.tweet} 
              
                   </p>
                <p>
                ${item.hashTag.map(
                  k => `<a href="javascript:void();">${k}</a>`
                )}
                
                </p>
                <div class="d-flex justify-content-between">
                <div class="d-flex justify-content-between">
                <div class="mr-3">
                <a href="javascript:void();" onclick='toggleLike(${index})'>${likeText}</a>
                </div>
                <a href="#"  class="card-link"> <img src="img/commenticon.png"></a>
                <a href="javascript:void();" class="card-link" onclick='retweetFunction(${
                  item.id
                })'><img src="img/retweet.png"></a>
                <a href="#" class="card-link"> <img src="img/staricon.png"></a>
                </div>


                <div class="d-flex flex-row">
                <span><img  src="img/bin2.png" onclick='removeItem(${index}, ${
      item.id
    })'></span>
                </div>
                </div>
                </div>
              </div>
            </div>
            \n`;

    item.hashTag.map(item => {
      if (result[item]) {
        result[item]++;
      } else {
        result[item] = 1;
      }
    });
  });
  console.log(result);

  for (var key in result) {
    tagHTML += `<span> <a onClick='filterTags("${key}")'href='#'>${key}</a> (${
      result[key]
    })</span>`;
  }
  console.log(tagHTML);
  tagText.innerHTML = tagHTML;
  tweetSection.innerHTML = tweetHTML;
  numOfTweets.innerHTML = `Tweets:<span class="text-success"> ${
    tweetArr.length
  } </span>`;

  localStorage.setItem("tweetArray", JSON.stringify(tweetArr));
}

// let isShowAll = true;
// let isFilter = false;
function showAll() {
  //showAll = true;
  //console.log("here");
  render(tweetArr);
}

function filterTags(tag) {
  //isFilter == true;
  let tweetFilteredByTags = tweetArr.filter(item => {
    for (let i = 0; i < item.hashTag.length; i++) {
      if (item.hashTag[i] == tag) {
        return item;
      }
    }
  });

  render(tweetFilteredByTags);
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

tweetText.addEventListener("input", onUserInput);
tweetButton.addEventListener("click", generatePost);

function openForm() {
  if (isLogin) {
    window.location.reload();
  } else {
    document.getElementById("myForm").style.display = "block";
  }
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

let logInButton = document.getElementById("loginBtn");
let logOutbtn = document.getElementById("logOut");

function logIn(e) {
  e.preventDefault();
  // console.log(document.getElementById("userInputName"));

  let userNameInput = document.getElementById("userInputName").value;
  // console.log(userNameInput);
  let displayName = document.getElementById("userName");
  if (userNameInput !== "") {
    displayName.innerHTML = userNameInput;
    isLogin = true;
    logOutbtn.innerHTML = "LOG OUT";
    closeForm("myForm");
    fetchData();
    render(tweetArr);
  }
}

logInButton.addEventListener("click", logIn);

// render(tweetArr);
