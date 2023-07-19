let ulcontainer=document.getElementById("todoItemsContainer");

let buttonELement=document.getElementById("savebutton");



buttonELement.onclick=function(){
    localStorage.setItem("todolist",JSON.stringify(todolist));
}

function gettodolistfromlocalstorage(){
    let gettingvalue=localStorage.getItem("todolist");
    let parsedstring=JSON.parse(gettingvalue);
    if(parsedstring === null){
        return [];
    }else{
        return parsedstring;
    }
}


todolist=gettodolistfromlocalstorage();

let count=todolist.length;

function checkboxclicked(checkboxid,labelid,liid){
    let checkboxELement1=document.getElementById(checkboxid);
    let labelElement2=document.getElementById(labelid);

    
    if(checkboxELement1.checked === true){
        labelElement2.classList.add("label-change");
    }
    else{
        labelElement2.classList.remove("label-change");
    }

    let todiElementindex=todolist.findIndex(
        function(eachitem){
            let eachindex="label"+eachitem.unqno;
            if(eachindex===liid){
                return true;
            }else{
                return false;
            }
        }
    );

    let indexobject=todolist[todiElementindex];
    
    if(indexobject.ischecked === true){
        indexobject.ischecked=false;
    }else{
        indexobject.ischecked=true;
    }
    
}

function deletefunction(liid){
    let deleteliElement=document.getElementById(liid);
    ulcontainer.removeChild(deleteliElement);
    let deleteElementindex=todolist.findIndex(
        function(eachitem){
            let eachindex="label"+eachitem.unqno;
            if(eachindex===liid){
                return true;
            }else{
                return false;
            }
        }
    );
    todolist.splice(deleteElementindex,1);
}




function todoaddli(todo){
    let checkboxid="checkbox"+todo.unqno;
    let labelid="label"+todo.unqno;
    let liid="label"+todo.unqno;

    let licontainer=document.createElement("li");
    licontainer.classList.add("liclass","d-flex","flex-row");
    licontainer.id=liid;
    ulcontainer.appendChild(licontainer);

    let checkboxconyainer=document.createElement("input");
    checkboxconyainer.type="checkbox";
    checkboxconyainer.id=checkboxid;
    checkboxconyainer.checked=todo.ischecked;
    checkboxconyainer.classList.add("checkbox-input");
    checkboxconyainer.onclick=function(){
        
        checkboxclicked(checkboxid,labelid,liid);
        
    }
    licontainer.appendChild(checkboxconyainer);

    let labelcontainer=document.createElement("div");
    labelcontainer.classList.add("label-container","d-flex","flex-row");
    licontainer.appendChild(labelcontainer);

    let labelElement=document.createElement("label");
    labelElement.classList.add("checkbox-label");
    labelElement.textContent=todo.text;
    if(todo.ischecked === true){
        labelElement.classList.add("label-change");
    }
    labelElement.id=labelid;
    labelElement.setAttribute("for",checkboxid);
    labelcontainer.appendChild(labelElement);

    let deletecontainer=document.createElement("div");
    deletecontainer.classList.add("delete-icon-container");
    labelcontainer.appendChild(deletecontainer);

    let deleteElement=document.createElement("i");
    deleteElement.classList.add("far","fa-trash-alt","delete-icon");
    deleteElement.onclick=function(){
        deletefunction(liid);
    }
    deletecontainer.appendChild(deleteElement);


}

for (let eachitem of todolist){
    todoaddli(eachitem);
}

let userinput=document.getElementById("todoUserInput");


function addbuttonclicked(){
    
    let todouserinputvalue=userinput.value;
    count=count+1;
    let todonew={
        text:todouserinputvalue,
        unqno:count,
        ischecked:false
    }
    todolist.push(todonew);
    console.log(todolist);
    todoaddli(todonew);
}







