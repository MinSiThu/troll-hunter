class Component {
    constructor({name,parentEl="div",data,template,actions}){
        this.name = name;
        this.data = data;
        this.parentEl = parentEl
        this.template = template;
        this.actions = actions;
    }

    getDOM(){
        this.DOM = document.createElement(this.parentEl);
        this.DOM.innerHTML = this.template(this.data);
        return this.DOM;
    }
}

module.exports = Component;