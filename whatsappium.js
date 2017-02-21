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


function getEmojiTabs() {
    const emojiPanel = document.querySelector('div.emoji-panel');
    return emojiPanel.querySelectorAll('button.menu-tab');
}


function navigateEmojiTabs(delta) {
    const emojiTabs = getEmojiTabs();

    let index = -1;
    for(let i=0; i < emojiTabs.length; i++) {
        const item = emojiTabs[i];
        if (item.classList.contains('active')) {
            index = i + delta;
            break;
        }
    }

    if (index < 0 || index >= emojiTabs.length) {
        return;
    }

    let target = emojiTabs[index];
    target.click();
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

    // If no chat is selected, default to moving to the top chat
    if (index == -1) {
        index = 0;
    }

    let target = chatList[index];
    makeActive(target);
}


function searchChats() {
    const inputSearch = document.querySelector('input.input-search');
    if (inputSearch) {
        inputSearch.focus();
    }
}


function showEmojis() {
    const buttonEmoji = document.querySelector('button.btn-emoji');
    if (buttonEmoji) {
        buttonEmoji.click();
    }
}


function isKeyCode(keyCode, char) {
    const keyChar = String.fromCharCode(keyCode)
    return keyChar == char || keyChar == char.toUpperCase();
}


window.onkeyup = function(e) {
    if(e.altKey) {
      if (e.keyCode == 37) {
        navigateEmojiTabs(-1);

      } else if (e.keyCode == 39) {
        navigateEmojiTabs(1);

      } else if (e.keyCode == 40) {
        navigateConverstaion(1);

      } else if (e.keyCode == 38) {
        navigateConverstaion(-1);

      } else if (isKeyCode(e.keyCode, 'k')) {
        e.preventDefault();
        searchChats();

      } else if (isKeyCode(e.keyCode, 'j')) {
        e.preventDefault();
        showEmojis();
      }
    }
}
