class View {
    constructor(model, controller) {
        var self = this;
        const menu = document.getElementById("menu");
        const wrapper = document.getElementById("wrapper");
        const table = document.getElementById("table");
        const pause = document.getElementById("pause");
        const play = document.getElementById("play");
        const next = document.getElementById("next");
        const points1 = document.getElementById("points1");
        const points2 = document.getElementById("points2");
        const turn = document.getElementById("turn");
        const question = document.getElementById("question");
        const a = document.getElementById("a");
        const b = document.getElementById("b");
        const c = document.getElementById("c");
        const d = document.getElementById("d");
		let thisQuestion = model.Question();
        self.controller = controller;
        points1.innerHTML = "Team1: " + model.points1;
        points2.innerHTML = "Team2: " + model.points2;
        
        play.onclick = function() {
            self.start();
        };
		
		next.onclick = function() {
            pause.style.visibility = "hidden";
			self.controller.update();
			wrapper.style.visibility = "visible";
			model.start = true;
        };
    }
    
    start() {
        menu.style.animationName = "menuTransition";
        setTimeout(function() {
            menu.style.visibility = "hidden";
            pause.style.visibility = "visible";
        }, 2000);
    }
}

class Model {
    constructor(data) {
        this.words = data;
        this.points1 = 0;
        this.points2 = 0;
		this.turn = "Team1";
		this.newQuestion = Math.floor(Math.random() * 4);
		this.usedQuestions = [];
		this.questionCount = 0;
		this.finished = false;
		this.start = false;
		this.time = 50;
    }
	
	Question() {
		if(this.words.length == this.questionCount) this.finished = true;
		else {
			this.questionCount++;
			do this.newQuestion = Math.floor(Math.random() * 4);
			while(!this.usedQuestions.includes(this.newQuestion))
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
		this.view.turn.innerHTML = "Turn: " + this.model.turn;
        this.view.question.innerHTML = this.view.thisQuestion.question;
        this.view.a.innerHTML = this.view.thisQuestion.a;
        this.view.b.innerHTML = this.view.thisQuestion.b;
        this.view.c.innerHTML = this.view.thisQuestion.c;
        this.view.d.innerHTML = this.view.thisQuestion.d;
		this.view.table.style.visibility = "visible";
	}
    
    checkAnswer(btn) {
        if(this.view.thisQuestion.correct == this.view.thisQuestion[btn]) {
			this.view[btn].style.backgroundColor = "lightblue";
			if(this.model.turn == "Team1") this.model.points1++;
			if(this.model.turn == "Team2") this.model.points2++;
			updateLeaderboard();
		} else {
			this.view[btn].style.backgroundColor = "red";
			this.view[this.view.thisQuestion.correct].style.backgroundColor = "lightblue";
		}
		
		setTimeout(function() {
			this.view.table.style.visibility = "hidden";
			this.view[btn].style.backgroundColor = "#ABFAA9";
			this.view[this.view.thisQuestion.correct].style.backgroundColor = "#ABFAA9";
		}, 4000);
    }
}

window.onload = function() {
    var model = new Model(words);
    var controller = new Controller();
    var view = new View(model, controller);
    
    controller.initialize(model, view);
};