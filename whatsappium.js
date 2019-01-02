function dispatchClick (item) {
  item.dispatchEvent(new window.MouseEvent('mousedown', {
    view: window,
    bubbles: true,
    cancelable: false
  }));
}


function makeActive (item) {
  const chat = item.querySelector('._2EXPL');
  if (chat) {
    dispatchClick(chat);
  }
}


function isItemActive (item) {
    const chat = item.querySelector('._2EXPL');
    return chat && chat.classList.contains('_1f1zm');
}


function getChatList () {
    const chatListElem = document.querySelectorAll('._2wP_Y');
    if (chatListElem.length > 0) {
        return Array.from(chatListElem).sort(function (a, b) {
          return parseInt(a.style.transform.match(/\(.*\)/i)[0].match(/\d+/)[0]) - parseInt(b.style.transform.match(/\(.*\)/i)[0].match(/\d+/)[0])
        });
    }
}


function getEmojiTabs() {
    return document.querySelectorAll('.l90LN');
}


function navigateEmojiTabs(delta) {
    const emojiTabs = getEmojiTabs();

    let index = -1;
    for(let i=0; i < emojiTabs.length; i++) {
        const item = emojiTabs[i];
        if (item.classList.contains('_2DzXb')) {
            index = i + delta;
            break;
        }
    }

    if (index < 0) {
      index = emojiTabs.length - 1;
    }
    if (index >= emojiTabs.length) {
      index = 0;
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
    if (index == -1 || index >= chatList.length) {
        index = 0;
    }

    let target = chatList[index];
    makeActive(target);
}


function searchChats() {
    const inputSearch = document.querySelector('input.jN-F5');
    if (inputSearch) {
        inputSearch.focus();
    }
}


function showEmojis() {
    const buttonEmoji = document.querySelector('span[data-icon=smiley]');
    if (buttonEmoji) {
        buttonEmoji.click();
    }
}


function isKeyCode(keyCode, char) {
    const keyChar = String.fromCharCode(keyCode)
    return keyChar == char || keyChar == char.toUpperCase();
}

const intervalId = setInterval(() => {
    bindShortcuts();
}, 5000);

function bindShortcuts() {
    window.removeEventListener('keyup', handleKeyUp);
    window.addEventListener('keyup', handleKeyUp);

    if (isWhatsappPageReady()) {
        clearInterval(intervalId);
    }
}

function isWhatsappPageReady() {
    const inputSearch = document.querySelector('input.jN-F5');
    if (inputSearch) return true;
    else return false;
}

function handleKeyUp(e) {
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
