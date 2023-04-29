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

function search() {
    var str = HTMLInputElement.value;
    document.write(str);
}
