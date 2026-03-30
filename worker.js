

/////////////////// Answer Creation Section /////////////
function ComputeOperator(input, modifier, operator){
    var output = 0;
    var illegal = false;
    if(operator=="n"){return [[input,modifier],illegal];}
    else if(operator=="+"){output = input+modifier;}
    else if(operator=="-"){
        if(input>=modifier){output = input-modifier;}
        else{output = modifier-input;}
    }
    else if(operator=="*"){output = input*modifier;}
    else if(operator=="/"){
        if(input>=modifier){output = input/modifier;}
        else{output = modifier/input;}
    }
                

    if(difficulty<9&&output!=Math.round(output)){
        illegal=true;
    }

    return [[output],illegal];
}

function GenerateAnswer(){
    var weight=0;
    ///////////  FIRST STEP, GENERATE PATH ////////////
    var computations = 6;
    var operations = ["+","+","-","-","*","*","/","/","n","n","*","*","/"];
    var numbers = shuffle([...numbersSelected]);
    operations = shuffle(operations);
    var solution = [];
    var stack = [];
    stack.push(numbers[0]);

    //////////// SECOND STEP, COMPUTE PATH /////////////
    for(let i=1; i<computations;i++){
        //console.log("Stack: "+stack);
        var shuffled = randomElement(stack);
        stack = shuffled[1];
        var input = shuffled[0];
        var result = ComputeOperator(input, numbers[i],operations[i]);
        //console.log("I: "+input+" - N: "+numbers[i]+" - R: "+result[0]);
        if(result[0]<0){
            weight-=100000;
        }

        if(operations[i]!="n"){
            if(operations=="-"||operations=="/"){
                if(input>numbers[i]){
                    solution.push(input + " "+operations[i]+" "+numbers[i]+ " = "+(result[0])+"\n");
                }
                else{
                    solution.push(numbers[i] + " "+operations[i]+" "+input+ " = "+(result[0])+"\n");
                }
            }
            else{
                solution.push(input + " "+operations[i]+" "+numbers[i]+ " = "+(result[0])+"\n");
            }        
        }

        for(let j=0;j<result[0].length;j++){
            var x = result[0][j];
                        
            if(x != Math.round(x)){
                if(x%10<10){
                weight-=20000;
                }
                            else{
                                weight-=10000;
                            }
                        }
                        else{
                            
                        }
                        stack.push(x);
                        //console.log("Stack Pushed: "+result[0][j]);
                    }
                }
                while(stack.length>1){
                    var s1 = randomElement(stack);
                    stack = s1[1];
                    var n1 = s1[0];

                    var s2 = randomElement(stack);
                    stack = s2[1];
                    var n2 = s2[0];

                    if(Math.random<0.5){
                        solution.push(n1 +" + "+n2+ " = "+(n1+n2)+"\n");
                        stack.push(n1+n2);
                    }
                    else{
                        solution.push(n1 +" - "+n2+ " = "+(n1-n2)+"\n");
                        stack.push(n1-n2);
                    }

                }
                //2ND STEP, GENERATE WEIGHTS
                
                
                for(let i=0; i< operations.length;i++){
                    if(operations[i]=="+"){
                        weight+=0.8;
                    }
                    if(operations[i]=="-"){
                        weight+=1;
                    }
                    if(operations[i]=="*"){
                        weight+=2;
                    }
                    if(operations[i]=="/"){
                        weight+=2.3;
                    }
                    if(operations[1]=="n"){
                        weight+=2.5;
                    }

                }
                if(stack<300||stack>900){
                    weight -=0.3;
                }
                if(stack%10 ==0){
                    weight -=0.4;
                }
                if(stack*2%10 ==0){
                    weight -= 0.5;
                }
                var st = (stack+"");
                if(st[st.length-1]=="4"||st[st.length-1]=="2"){ // i hate 4 and 2, hello if you are reading this
                    weight -= 0.3;
                }
                stack*=100;
                stack = Math.round(stack);
                stack/=100;

                weight*=100;
                weight=Math.round(stack);
                weight/=100;
                weight = clamp(weight,0,20);
                return [stack,weight,solution];
            }

            function GenerateAnswers(){
                var iterations = 5000;
                var validSolutions = [];

                for(let j=0;j<iterations;j++){
                    var gen = GenerateAnswer();
                    var x = gen[0];
                    if(x==Math.round(x) && x>100&& x<1000){
                        if(x<250&& Math.random <0.5){
                            
                        }
                        else{
                            if(gen[1]>7){
                                validSolutions.push(gen);
                            }
                            
                        }
                        
                    }

                }
                var frequency = {};
                for (const num of validSolutions) {
                    frequency[num] = frequency[num] ? frequency[num] + 1 : 1;
                }
                var savior = frequency;
                //PICK HARDER ONES


                // GET AVERAGE
                const object = {'a': 1, 'b': 2, 'c' : 3};
                var avg = 0;
                var count = 0;
                for (const [key, value] of Object.entries(frequency)) {
                    //console.log(key, value);
                    if(key+""!="0"||key+""!="undefined"){
                        count +=1;
                        avg+=value;
                    }

                }
                avg/=count;
                if(avg<2){
                    avg=2;
                }
                //console.log("Stage 1 Average: "+avg);
                //console.log("Stage 1: "+JSON.stringify(frequency));
                // DECIMATE COMMON ONES
                var decimated = {}
                
                
                for (const [key, value] of Object.entries(frequency)) {
                    //console.log(key, value);
                    //if(value<avg && value > 1){ //really want to get this working
                        decimated[key] = value;
                    //}

                }
                //console.log("Stage 2: "+JSON.stringify(decimated));


                selected = getWeightedRandom(decimated);
                if(selected==undefined){
                    console.log("Fallback as didn't find any hard problems");
                    selected = getWeightedRandom(frequency);
                }
                
                

                var docs = document.getElementsByClassName("target-number-box");
                var output = selected;
                docs[0].innerText = output[0];
                docs[1].innerText = output[1];
                docs[2].innerText = output[2];

                var dif = document.getElementById("difficulty-button");
                dif.innerText="Difficulty: "+storedWeight;
                selectedNumber=true;

            }

            function getWeightedRandom(data) {
                var totalWeight=0;

                for (const [key, weight] of Object.entries(data)) {
                    var w = Math.pow(Number(key.split(",")[1]),1.6); 
                    totalWeight+=w;
                }

                let random = Math.random() * totalWeight;

                for (const [key, weight] of Object.entries(data)) {
                    var w = Math.pow(Number(key.split(",")[1]),1.6);
                    //console.log(w);
                    random -= w
                    if (random <= 0) {
                        w*=100;
                        w=Math.round(w);
                        w/=100;
                        var base = key.split(",");
                        var num = base[0];
                        var compositeAns = "";
                        for(let j=2; j<base.length;j++){
                            compositeAns = compositeAns+base[j];
                        }
                        storedAnswer=compositeAns;
                        storedWeight=w;
                        console.log("Selected: "+num+" with weight "+w+" with solution \n"+compositeAns);
                        return key;
                    }
                }
            }
            async function CreateAnswer(){
                await GenerateAnswers();
                return;
            }