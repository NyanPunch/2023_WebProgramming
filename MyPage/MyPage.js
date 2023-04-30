function Login_() {
    var ID = document.getElementById("id").value;
    var PW = document.getElementById("pw").value;
    if(PW == ''){
        alert("비밀번호를 입력하세요");
    }
    else {
        alert('ID: '+ID +' PW: '+ PW);   
    }
}

function Search() {
    var str = document.getElementById("search").value;
    if(str==""){
        alert('검색어를 입력하세요');
    }
    else {
        alert(str);
    }
}
