let t = true;
class View {
    constructor(model, controller) {
        var self = this;
        self.menu = document.getElementById("menu");
        self.wrapper = document.getElementById("wrapper");
        self.table = document.getElementById("table");
        self.pause = document.getElementById("pause");
        self.play = document.getElementById("play");
        self.next = document.getElementById("next");
        self.points1 = document.getElementById("points1");
        self.points2 = document.getElementById("points2");
        self.turn = document.getElementById("turn");
        self.question = document.getElementById("question");
        self.a = document.getElementById("a");
        self.b = document.getElementById("b");
        self.c = document.getElementById("c");
        self.d = document.getElementById("d");
	self.thisQuestion = model.Question();
        self.controller = controller;
        self.points1.innerHTML = "Team1: " + model.points1;
        self.points2.innerHTML = "Team2: " + model.points2;
	self.turn.innerHTML = "Team1";
	self.interval = setInterval(() => {
		if(model.time > 0 && !t) {
			model.time--;
			document.getElementById("time").value--;
		}
		if(model.time <= 0 && !t) {
			let correct;
			if(self.a.innerHTML == self.thisQuestion.correct) correct = "a";
			if(self.b.innerHTML == self.thisQuestion.correct) correct = "b";
			if(self.c.innerHTML == self.thisQuestion.correct) correct = "c";
			if(self.d.innerHTML == self.thisQuestion.correct) correct = "d";
			self[correct].style.backgroundColor = "blue";
			setTimeout(() => {
				self.table.style.visibility = "hidden";
				self.pause.style.visibility = "visible";
				self[correct].style.backgroundColor = "#ABFAA9";
			}, 4000);
			t = true;
		}
	  }, 100);
        
        play.onclick = function() {
            self.start();
        };
		
        next.onclick = function() {
          self.pause.style.visibility = "hidden";
          self.controller.update();
          self.wrapper.style.visibility = "visible";
	  self.table.style.visibility = "visible";
          model.start = true;
        };

	a.onclick = function() {
            self.controller.checkAnswer("a");
        };

	b.onclick = function() {
            self.controller.checkAnswer("b");
        };

	c.onclick = function() {
            self.controller.checkAnswer("c");
        };

	d.onclick = function() {
            self.controller.checkAnswer("d");
        };
    }
    start() {
        self.menu.style.animationName = "menuTransition";
        setTimeout(function() {
            self.menu.style.visibility = "hidden";
            self.pause.style.visibility = "visible";
	    self.wrapper.style.visibility = "visible";
	    self.table.style.visibility = "hidden";
        }, 2000);
    }
}

class Model {
    constructor(data) {
        this.words = data;
        this.points1 = 0;
        this.points2 = 0;
	this.turn = "Team2";
	this.newQuestion = Math.floor(Math.random() * 12);
	this.usedQuestions = [];
	this.questionCount = -1;
	this.finished = false;
	this.start = false;
	this.time = 120;
    }
	
	Question() {
		if(this.words.length == this.questionCount) this.finished = true;
		else {
			this.questionCount++;
			do this.newQuestion = Math.floor(Math.random() * 12);
			while(this.usedQuestions.includes(this.newQuestion))
			this.usedQuestions.push(this.newQuestion);
			return this.words[this.newQuestion];
		}
		return null;
	}
}

class Controller {
    initialize(model, view) {
        this.model = model;
        this.view = view;
    }
	
	updateLeaderboard() {
		this.view.points1.innerHTML = "Team1: " + this.model.points1;
        	this.view.points2.innerHTML = "Team2: " + this.model.points2;
	}
	
	update() {
		this.view.thisQuestion = this.model.Question();
		if(this.model.turn == "Team1") this.model.turn = "Team2";
		else this.model.turn = "Team1";
		this.view.turn.innerHTML = "Turn: " + this.model.turn;
        	this.view.question.innerHTML = this.view.thisQuestion.question;
        	this.view.a.innerHTML = this.view.thisQuestion.a;
        	this.view.b.innerHTML = this.view.thisQuestion.b;
        	this.view.c.innerHTML = this.view.thisQuestion.c;
        	this.view.d.innerHTML = this.view.thisQuestion.d;
		this.view.table.style.visibility = "visible";
		this.model.time = 120;
		document.getElementById("time").value = 120;
		t = false;
	}
    
    checkAnswer(btn) {
	let correct;
	if(this.view.a.innerHTML == this.view.thisQuestion.correct) correct = "a";
	if(this.view.b.innerHTML == this.view.thisQuestion.correct) correct = "b";
	if(this.view.c.innerHTML == this.view.thisQuestion.correct) correct = "c";
	if(this.view.d.innerHTML == this.view.thisQuestion.correct) correct = "d";
        if(this.view.thisQuestion.correct == this.view.thisQuestion[btn]) {
			this.view[btn].style.backgroundColor = "blue";
			if(this.model.turn == "Team1") this.model.points1++;
			if(this.model.turn == "Team2") this.model.points2++;
			this.updateLeaderboard();
		} else {
			this.view[btn].style.backgroundColor = "red";
			this.view[correct].style.backgroundColor = "blue";
		}
		t = true;
		
		setTimeout(() => {
			this.view.table.style.visibility = "hidden";
			this.view.pause.style.visibility = "visible";
			this.view[btn].style.backgroundColor = "#ABFAA9";
			this.view[correct].style.backgroundColor = "#ABFAA9";
			let victor = this.model.points1 > this.model.points2 ? "Team1 Won!" : "Team2 Won!";
			if(this.model.points1 == this.model.points2) victor = "Its A Draw!";
			if(this.model.questionCount == 12) alert(victor);
		}, 4000);
    }
}

window.onload = function() {
    var model = new Model(words);
    var controller = new Controller();
    var view = new View(model, controller);
    
    controller.initialize(model, view);
};