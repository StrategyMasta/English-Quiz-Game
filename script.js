class View {
    constructor(model, controller) {
        var self = this;
        const menu = document.getElementById("menu");
        const wrapper = document.getElementById("wrapper");
        const play = document.getElementById("play");
        self.controller = controller;
        self.points1 = model.points1;
        self.points2 = model.points2;
        
        play.onclick = function() {
            self.start();
        };
    }
    
    start() {
        menu.style.animationName = "menuTransition";
        setTimeout(function() {
            menu.style.visibility = "hidden";
            wrapper.style.visibility = "visible";
        }, 2000);
    }
}

class Model {
    constructor(data) {
        this.words = data;
        this.points1 = 0;
        this.points2 = 0;
    }
}

class Controller {
    initialize(model, view) {
        this.model = model;
        this.view = view;
    }
    
    checkAnswer() {
        
    }
}

window.onload = function() {
    var model = new Model(words);
    var controller = new Controller();
    var view = new View(model, controller);
    
    controller.initialize(model, view);
};