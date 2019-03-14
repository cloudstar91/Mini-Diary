
function addDiary(){
    diaryId = diaryId +1;
    diaryList.unshift({id: diaryId, text: inputText.value, reTweetId: null});
    renderTweet();
    inputText.value='';

}
function renderTweet(){
  document.getElementById('showDiary').innerHTML = diaryList.map( diary => `<div>${diary.text}</div><p><a href='#' onclick="reTweet(${diary.id})">retweet</a></p>`).join("");
}
let diaryList=[]
let diaryId=0;
let maxTextInput = 140;
let inputText = document.getElementById('inputText');
function renderTextChar(textCharRemaining,textLength){
    countChar.innerHTML =`${textCharRemaining} char`;
}

function countCharInput(){
    let textLength= inputText.value.length;
    let countChar = document.getElementById('countChar');
    let textCharRemaining = maxTextInput - textLength;
    renderTextChar(textCharRemaining,textLength);
    
}
function reTweet(id){
    let parentTweet = diaryList.find(diary => diary.id == id);
    diaryList.unshift({id: diaryList.length+1, text: parentTweet.text, reTweetId: id});
    renderTweet();
}


document.getElementById('btnInput').addEventListener('click', addDiary);
inputText.addEventListener('input', countCharInput);