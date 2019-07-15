let template = function(data){
    return `
        <h1>${data.message}</h1>
    `
}

let data = {
    message:"Hello World"
}

let actions = {};

module.exports = {
    template,data,actions,
}