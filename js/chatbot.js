const timeForCheckout = 50;
var directionX = 'none';
var directionY = 'none';
var currentDirectionX = 'none';
var currentDirectionY = 'none';

window.onload = function() {
	const chatWindow = document.createElement('div');
	const welcome = document.createElement('div');
	const welcomeText = document.createElement('h4');
	const exit = document.createElement('div');
	const exitTxt = document.createElement('p');
	const conversation = document.createElement('div');
	const newMsg = document.createElement('div');
	const input = document.createElement('input');
	const send = document.createElement('div');
	const sendTxt = document.createElement('p');

	chatWindow.id = 'chatWindow';
	chatWindow.className = 'un-opened';
	welcome.id = 'welcome-text';
	welcome.appendChild(welcomeText);
	chatWindow.appendChild(welcome);
	exitTxt.id = 'exitTxt';
	exit.appendChild(exitTxt);
	exit.id = 'exit';
	chatWindow.appendChild(exit);
	conversation.id = 'conversation';
	chatWindow.appendChild(conversation);
	input.type = "text";
	input.id = 'msgInput';
	newMsg.appendChild(input);
	send.appendChild(sendTxt);
	send.id = 'sendMsgButton';
	send.className = 'button';
	newMsg.appendChild(send);
	newMsg.id = 'newMsg';
	chatWindow.appendChild(newMsg);

	var targetDiv = document.getElementById('insert-chat-here');
	document.body.insertBefore(chatWindow, targetDiv);

	welcomeText.textContent = 'Hello, how can I help you?';
	exitTxt.textContent = 'X';
	sendTxt.textContent = 'Send';


	function expandChatWindow() {
		if (!chatWindow.classList.contains('hasBeenOpened')) {
			setTimeout(function() {newMessage('Hello, my name is Chat Bot.', 'bot')}, 500);
		}
		chatWindow.classList.remove('un-opened');
		chatWindow.classList.add('open');
		chatWindow.classList.add('hasBeenOpened');
		welcomeText.textContent = "I would love to help! What can I do for you?";
	}
	function minimizeChatWindow() {
		chatWindow.classList.remove('open');
		chatWindow.classList.add('un-opened');
		welcomeText.textContent = 'Is there anything else I can do?';
	}

	function createTimeStamp() {
		var date = new Date(Date.now());
		var year = date.getFullYear();
		var month = date.getMonth();
		var day = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var newTimeStamp = hour + ':' + minute + ', ' + month + '/' + day + '/' + year;
		return(newTimeStamp);
	}

	const responses = [
		"Really, well that's interesting...",
		"Let's do this. You stop asking me questions and I'll pretend I care.",
		"Holy moly, you have quite the problem on your hands!",
		"Try restarting your computer and running away.",
		"Well, I did all that I could. Good luck!"
	];
	function botResponse() {
		var choice = Math.random();
		choice = Math.ceil(choice*5);
		console.log('choosing a response');
		switch (choice) {
			case 1: return responses[0];
			case 2: return responses[1];
			case 3: return responses[2];
			case 4: return responses[3];
			case 5: return responses[4];
			default: return 'What is the problem you would like help with?';
		}
	}

	function newMessage(content, sender) {
		const msgContainer = document.createElement('div');
		msgContainer.className = 'msgContainer';
		const user = document.createElement('p');
		user.className = 'user';
		user.textContent = sender + ':';
		msgContainer.appendChild(user);
		const msg = document.createElement('div');
		msg.className = 'msg';
		msgContainer.appendChild(msg);
		const text = document.createElement('p');
		text.className = 'messageText';
		text.textContent = content;
		msg.appendChild(text);
		const timeStamp = document.createElement('p');
		timeStamp.className = 'timeStamp';
		timeStamp.classList.add('italics');
		timeStamp.textContent = createTimeStamp();
		msgContainer.appendChild(timeStamp);
		conversation.appendChild(msgContainer);
		conversation.scrollTop = conversation.scrollHeight;
		if (sender === 'you') {
			clearTimeout(timer);
			timer = setTimeout(function() {newMessage(botResponse(), 'bot')}, 1000);
		}
	}

	chatWindow.onclick = function () {
		var e = event.target;
		if (e === exit) {
			minimizeChatWindow();
		}
		else if (e === send) {
			if (input.value) {
				newMessage(input.value, 'you');
				input.value = '';
			}
		}
		else if (chatWindow.classList.contains('un-opened')) {
			expandChatWindow();
		}
	}

	send.onclick = function () {
		
	}





	//=======================================================================
	// This section creates the inertia movement of the chat window on scroll
	//=======================================================================
	var newWindowX = window.pageXOffset;
	var newWindowY = window.pageYOffset;
	var timer = null;


	function checkDirection(currentDirectionX, currentDirectionY) {
		var directionChange = false;
		if ((currentDirectionX !== directionX) || (currentDirectionY !== directionY)) {
			directionChange = true;
		}
		return directionChange;
	}
	function moveChat(updateDirection, classRemove, classAdd) {
		if (updateDirection === 'right' || updateDirection === 'left') {
			directionX = updateDirection;
		} else {
			directionY = updateDirection;
		}
		chatWindow.classList.remove(classRemove);
		setTimeout(chatWindow.classList.add(classAdd), timeForCheckout);
	}


	window.addEventListener('scroll', function() {
		var windowX = window.pageXOffset;
		var windowY = window.pageYOffset;

		if (timer !== null) {
			clearTimeout(timer);
		}
		timer = setTimeout( function() {
			chatWindow.classList.remove('translateXRight');
			chatWindow.classList.remove('translateXLeft');
			chatWindow.classList.remove('translateYDown');
			chatWindow.classList.remove('translateYUp');
			directionY = 'none';
			directionX = 'none';
		}, timeForCheckout);

		if (windowX > newWindowX) {
			currentDirectionX = 'right';
		} else if (windowX < newWindowX) {
			currentDirectionX = 'left';
		} else if (windowX === newWindowX) {
			currentDirectionX = 'none';
		}
		if (windowY > newWindowY) {
			currentDirectionY = 'down';
		} else if (windowY < newWindowY) {
			currentDirectionY = 'up';
		} else if (windowY === newWindowY) {
			currentDirectionY = 'none';
		}

		if( checkDirection(currentDirectionX, currentDirectionY) || !(chatWindow.classList.contains('translateXRight') || chatWindow.classList.contains('translateXLeft') || chatWindow.classList.contains('translateYDown') || chatWindow.classList.contains('translateYUp'))) {
			if (currentDirectionX === 'right') {
				// right scroll effect
				moveChat('right', 'translateXRight', 'translateXLeft');
				//directionX = 'right';
				//chatWindow.classList.remove('translateXRight');
				//setTimeout(updateClassList('translateXLeft', 'right'), timeForCheckout);
			} else if (currentDirectionX === 'left') {
				// left scroll effect
				moveChat('left', 'translateXLeft', 'translateXRight');
				//directionX = 'left';
				//chatWindow.classList.remove('translateXLeft');
				//setTimeout(updateClassList('translateXRight', 'left'), timeForCheckout);
			}
			if (currentDirectionY === 'down') {
				// down scroll effect
				moveChat('down', 'translateYDown', 'translateYUp');
				//directionY = 'down';
				//chatWindow.classList.remove('translateYDown');
				//setTimeout(updateClassList('translateYUp', 'down'), timeForCheckout);
				
			} else if (currentDirectionY === 'up'){
				// up scroll effect
				moveChat('up', 'translateYUp', 'translateYDown');
				//directionY = 'up';
				//chatWindow.classList.remove('translateYUp');
				//setTimeout(updateClassList('translateYDown', 'up'), timeForCheckout);
			}
		}
		newWindowY = windowY;
		newWindowX = windowX;
	}, false);
	

	
};

