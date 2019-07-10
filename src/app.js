class TrollHunter{
    constructor(data){
        this.data = data;
        this.data.updateState = this.updateState; 
        this.actions;
        this.templates;
    }

    //updateState method is method of this.data
    updateState(propName,newValue){
        console.log(newValue);
                
        this[propName] = newValue;
        let elements = document.querySelectorAll(`*[var=${propName}]`);
        elements.forEach(element=>{
            console.log(element, this[propName]);
            element.innerHTML = this[propName];
            console.log(element);
            
        })
    }

    init(){
        let elements = document.querySelectorAll("*[var]")
        elements.forEach(element=>{
            let propName = element.getAttribute("var");
           // console.log(propName);
           // console.log(this.data[propName])
            element.innerHTML = this.data[propName]
        })
    }

    setActions(actions){
        this.actions = actions;
        let elements = document.querySelectorAll("*[on]");
        elements.forEach(element=>{
            let actionType = element.getAttribute("on");
            let actionCallBackFunctionName = element.getAttribute("action");
            element.addEventListener(actionType,this.actions[actionCallBackFunctionName]);
        })
    }

    setTemplates(templates){
        this.templates = templates;
        if(this.templates != undefined){
            let elements = document.querySelectorAll("*[for]");
            elements.forEach(element=>{
                let loopName = element.getAttribute("for");
                let templateName = element.getAttribute("template");
                let loopArray = this.data[loopName];
                let elementChildren = loopArray.map((value,index)=>{
                    return this.templates[templateName](value,index);
                })
                element.innerHTML = elementChildren;
            })
        }
    }
    
}

if(window){
    window.TrollHunter = TrollHunter;
}
module.exports = TrollHunter;