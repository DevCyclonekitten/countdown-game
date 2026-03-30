////////// GENERAL FUNCTIONS THAT PROBABLY EXIST BUT IM STUPID ///////////////


function clamp(inp,mi,ma){
    if(inp<mi){inp = mi;}
    if(inp>ma){inp=ma;}
    return inp;
}

function shuffle(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array;
}

function randomElement(array){
    var i = Math.floor(Math.random() * array.length);
    var res = array[i];
    array.splice(i,1);
    return [res,array];
}

function randomChoice(array){
    var i = Math.floor(Math.random() * array.length);
    var res = array[i];
    return res; 
}