function dispatchClick (item) {
  item.dispatchEvent(new window.MouseEvent('mousedown', {
    view: window,
    bubbles: true,
    cancelable: false
  }));
}

function makeActive (item) {
  const chat = item.querySelector('.chat');
  if (chat) {
    dispatchClick(chat);
  }
}

function isItemActive (item) {
    const chat = item.querySelector('.chat');
    return chat && chat.classList.contains('active');
}

function getChatList () {
    const chatListElem = document.querySelectorAll('.infinite-list-item');
    if (chatListElem && chatListElem.length) {
      return Array.from(chatListElem).sort(function (a, b) {
        return parseInt(b.style.zIndex, 10) - parseInt(a.style.zIndex, 10);
      });
    }
}

function navigateConverstaion(delta) {
    const chatList = getChatList();

    let index = -1;
    for(let i=0; i < chatList.length; i++) {
      const item = chatList[i]
      if (isItemActive(item)) {
          index = i + delta;
          break;
      }
    }

    if (index >= 0 &&  index < chatList.length) {
      let target = chatList[index];
      makeActive(target);
    }
}

window.onkeyup = function(e){
    console.log(e.keyCode);
    if(e.ctrlKey && e.keyCode == 40) {
      navigateConverstaion(1);
    } else if (e.ctrlKey && e.keyCode == 38) {
      navigateConverstaion(-1);
    }
}
