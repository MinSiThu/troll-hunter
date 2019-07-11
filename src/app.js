class TrollHunter{
    constructor(data){
        this.data = data;
        this.data.updateState = this.updateState.bind(this);
        this.actions;
        this.templates;
    }

    //updateState method is method of this.data
    updateState(propName,newValue){
        this.data[propName] = newValue;
        this.updateVars(propName);
        this.updateTemplates(propName);
        this.updateIf(propName)
    }

    updateIf(propName){
        let elements = document.querySelectorAll(`*[if=${propName}]`);
        elements.forEach(element=>{
            if(this.data[propName] == true){
                element.style.display = "";
            }else{
                element.style.display = "none";
            }
        })
    }

    updateVars(propName){
        let elements = document.querySelectorAll(`*[var=${propName}]`);
        elements.forEach(element=>{
            element.innerHTML = this.data[propName];  
        })
    }

    updateTemplates(propName){
        let elements = document.querySelectorAll(`*[loop=${propName}]`);
        elements.forEach(element=>{
            let templateName = element.getAttribute("template");
            element.innerHTML = this.templates[templateName](this.data[propName])
        })
    }

    init(){
        let elements = document.querySelectorAll("*[var]")
        elements.forEach(element=>{
            let propName = element.getAttribute("var");
            element.innerHTML = this.data[propName]
        })

        elements = document.querySelectorAll("*[if]");
        elements.forEach(element=>{
            let propName = element.getAttribute("if");
            if(this.data[propName] == true){
                element.style.display = "";
            }else{
                element.style.display = "none";
            }
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
                element.innerHTML = elementChildren.join("");
            })
        }
    }
    
}

if(window){
    window.TrollHunter = TrollHunter;
}
module.exports = TrollHunter;