let timeEventTrash = [];

class Game{
	constructor(level = 1, score = 0){
		this.score = score;
		this.timer = 30;
		this.scoreIncreament = 20;
		this.types = [
			"aws",
			"css3",
			"github",
			"heroku",
			"html5",
			"js",
			"linkedin",
			"nodejs",
			"react",
			"sass"
		];
		this.cardList = [];
		this.currentLevel = level;
		this.currentCardPair = [];
		this.currentTimeEvents = null;
		this.currentTimerInterval = null;
		this.onClick = this.onClick.bind(this);
		
		this.initialGame();
		this.gameTimer();
	}

	/**
	 * 初始化游戏
	*/
	initialGame() {
		let gameOver = document.querySelector('.game-over');
		gameOver.classList.remove('game-over--visible');

		let gameInstruction = document.querySelector('.game-instruction');
		gameInstruction.style.display = 'none';

		let currentLevelNode = document.querySelector('.game-stats__level--value');
		currentLevelNode.innerHTML = this.currentLevel;

		this.updateScore();

		let gameboard = document.querySelector(".game-main");
		if (gameboard) {
			gameboard.remove();
		}

		clearTimeEventTrash();

		let gameBoard = document.createElement('div');
		gameBoard.className = 'game-main';

		let gameMain = document.querySelector('.game-board');
		gameMain.appendChild(gameBoard);

		let cardSize = 2 * this.currentLevel;

		let root = document.documentElement;
		root.style.setProperty("--card-size", cardSize);

		let cardListLength = cardSize ** 2;
		let typeList = getTypeList(this.types, cardListLength / 2);

		typeList = [...typeList, ...typeList];
		typeList = exchange(typeList);
		typeList.forEach(type => {
			this.cardList.push(new Card(gameBoard, type, this.onClick));
		})
	}

	/**
	 * 更新得分数
	 */
	updateScore() {
		let score = document.querySelector('.game-stats__score--value');
		score.innerHTML = this.score;
	}

	/**
	 * 获取游戏时间，展示进度条
	 */
	gameTimer() {
		this.currentTimerInterval && clearInterval(this.currentInterval);
		let timeSize = this.timer;
		let time = document.querySelector('.game-timer__bar');
		time.innerHTML = this.timer;

		let color = `#8cdcda`;
		time.style.background = color;

		let timerInterval = setInterval(() => {
			this.timer--;

			time.innerHTML = this.timer + 's';

			let currentCentage = (this.timer / timeSize) * 100;

			color = `linear-gradient(to right, #8cdcda 0%, #8cdcda ${currentCentage}%, transparent ${currentCentage}%, transparent 100%)`;

			time.style.background = color;

			if (this.timer === 0) {

				clearInterval(timerInterval);
				this.endGame();

				return 
			}

		}, 1000);

		timeEventTrash.push({
			type: "interval",
			event: timerInterval
		})
	}

	/**
	 * 游戏结束后的展示状态页面
	 */
	endGame() {
		console.log('end game');

		let game = document.querySelector('.game-main');
		game.style.filter = "blur(8px)";
		
		let gameOver = document.querySelector('.game-over');
		gameOver.classList.add("game-over--visible");

		let gameoverScore = document.querySelector('.game-over__score');
		gameoverScore.innerHTML = `Your score is ${this.score}`;

	}

	/**
	 * 增加分数
	 */
	increaseScore() {
		this.score += this.scoreIncreament;
		this.updateScore();
	}

	/**
	 * 每个元素绑定点击事件
	 * @param {Object} card 每个卡片的元素
	 */
	onClick(card) {
		
		if (this.currentCardPair.length > 1) {
			return
		}

		if (this.currentCardPair[0] && card === this.currentCardPair[0]) {
			return 
		}

		if (!this.currentCardPair[0]) {
			this.currentCardPair.push(card);
			this.currentTimeEvents = setTimeout(() => {
				this.currentCardPair.map(card => toggleCard(card));
				this.currentCardPair = [];
			}, 1200);
			toggleCard(card);
			return
		}

		if (this.currentCardPair[0]) {
			this.currentCardPair.push(card);
			if (this.currentCardPair[0].cardType === this.currentCardPair[1].cardType) {
				this.increaseScore();
				this.currentCardPair.map(card => {
					card.disable = true;
					this.cardList = this.cardList.filter(item => item !== card);
				})
				this.currentCardPair = [];
				clearTimeout(this.currentTimeEvents);
			}
			toggleCard(card);
		}

		if (this.cardList.length === 0) {
			let waitForNewGame = setTimeout(() => {
				new Game(this.currentLevel + 1, this.score);
			}, 100);
			clearTimeEventTrash();
			timeEventTrash.push(waitForNewGame);
		}
	}
}

/**
 * 清除卡片的定时事件
 */
let clearTimeEventTrash = () => {
	while(timeEventTrash.length > 0) {
		let event = timeEventTrash.pop();
		if (event.type === 'interval') clearInterval(event.event);
		if (event.type === 'timeout') clearTimeout(event.event);
	}
}

/**
 * 获取卡片的随机组合单组
 * @param {Array} types 游戏中所以卡片的种类
 * @param {Number} arrLength 几阶游戏的卡片数量一半
 */
let getTypeList = (types, arrLength) => {
	let currentTypes = [...types];

	let typeList = [];

	for (let i = 0; i < arrLength; i++) {
		if (currentTypes.length === 0) {
			console.error('List to end');
			currentTypes = types;
		}

		let random = getRandom(currentTypes.length);
		typeList.push(currentTypes[random]);
		currentTypes.splice(random, 1);
	}

	return typeList
}

/**
 * 获取数组的随机数字
 * @param length {Number} 要随机的数组的长度
 */
let getRandom = length => {
	return Math.floor(Math.random()*length);
}

// 打乱顺序
let exchange = array => {
	let _array = [...array];
	let resultArr = [];
	let length = array.length;
	for (let i = 0; i < length; i++) {
		let random = getRandom(array.length);
		resultArr.push(array[random]);
		array.splice(random, 1);
	}
	return resultArr;
}

// 翻牌
let toggleCard = card => {
	if (!card.node.classList.contains("card--flipped")) {
		card.node.classList.add("card--flipped");
		card.node.children[0].classList.remove("card__face--front");
		card.node.children[0].classList.add("card__face--back");
	} else {
		card.node.classList.remove("card--flipped");
		card.node.children[0].classList.add("card__face--front");
		card.node.children[0].classList.remove("card__face--back");
	}
}

// 实例化一个卡片
class Card{
	constructor(parentNode, cardType, onClick) {
		this.cardType = cardType;
		this.onClick = onClick;
		this.parentNode = parentNode;
		this.node = this.createNode();
		this.disable = false;
	}

	// 创建卡片
	createNode() {
		let card = document.createElement('div');
		card.className = `card ${this.cardType}`;
		let cardContent = document.createElement('div');
		cardContent.className = "card__face card__face--front";
		card.appendChild(cardContent);

		card.addEventListener("click", () => {
			if (this.disable) {
				console.log("This card is disable");
				return 
			}
			this.onClick(this);
		})

		this.parentNode.appendChild(card);

		return card
	}
}

// 初始化游戏状态
let initialGameStatus = () => {
	let newBtn = document.querySelector('.game-stats__button'),
		currentGame = null;
	newBtn.addEventListener('click', function() {
		currentGame = null;
		currentGame = new Game();
	})
}

initialGameStatus();