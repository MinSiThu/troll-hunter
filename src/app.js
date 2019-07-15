const Component = require("./Component");
const Container = require("./Container");

class TrollHunter{
    constructor(data,parentDOM=document){
        this.data = data;
        this.parentDOM = parentDOM;
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
        let elements = this.parentDOM.querySelectorAll(`*[if=${propName}]`);
        elements.forEach(element=>{
            if(this.data[propName] == true){
                element.style.display = "";
            }else{
                element.style.display = "none";
            }
        })
    }

    updateVars(propName){
        let elements = this.parentDOM.querySelectorAll(`*[var=${propName}]`);
        elements.forEach(element=>{
            element.innerHTML = this.data[propName];  
        })
    }

    updateTemplates(propName){
        let elements = this.parentDOM.querySelectorAll(`*[loop=${propName}]`);
        elements.forEach(element=>{
            let templateName = element.getAttribute("template");
            let elementChildren = this.data[propName].map((value,index)=>{
                return this.templates[templateName](value,index);
            })
            element.innerHTML = elementChildren.join("");
        })
    }

    init(){
        let elements = this.parentDOM.querySelectorAll("*[var]")
        elements.forEach(element=>{
            let propName = element.getAttribute("var");
            element.innerHTML = this.data[propName]
        })

        elements = this.parentDOM.querySelectorAll("*[if]");
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
        let elements = this.parentDOM.querySelectorAll("*[on]");
        elements.forEach(element=>{
            let actionTypes = element.getAttribute("on").split(" ");
            let actionCallBackFunctionNames = element.getAttribute("action").split(" ");
            actionTypes.forEach((actionType,index)=>{
                let actionCallBackFunctionName = actionCallBackFunctionNames[index];
                element.addEventListener(actionType,this.actions[actionCallBackFunctionName].bind(this));
            })
        })
    }

    setTemplates(templates){
        this.templates = templates;
        if(this.templates != undefined){
            let elements = this.parentDOM.querySelectorAll("*[loop]");
            elements.forEach(element=>{
                let loopName = element.getAttribute("loop");
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

TrollHunter.createComponent = ({name,data,template,actions,parentEl})=>{
    let component = new Component({name,data,template,parentEl,actions});
    Container.add(name,component);
}

TrollHunter.start = ()=>{
    while(document.querySelectorAll("template").length > 0){
        Container.loop((component)=>{        
            let {name,data,actions,templates} = component;
            let elements = document.querySelectorAll(`template[th-component=${name}]`);
    
            elements.forEach(element=>{
                for (const prop in data) {
                    if (data.hasOwnProperty(prop)) {
                        let attribute = element.getAttribute(prop);
                        if(attribute != null){
                            data[prop] = attribute;
                        }
                    }
                }
                
                let componentDOM = component.getDOM();
                element.parentNode.replaceChild(componentDOM,element)
                let app = new TrollHunter(data,componentDOM);
                app.setActions(actions);
                app.setTemplates(templates);
                app.init();
            })
            
        })
    }
   
}

if(window){
    window.TrollHunter = TrollHunter;
}
module.exports = TrollHunter;