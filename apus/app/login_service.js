

function returnto(){
    localStorage.setItem('status' ,"0");
    location.reload();
}


document.getElementById('logoff').addEventListener("click",returnto,false);
