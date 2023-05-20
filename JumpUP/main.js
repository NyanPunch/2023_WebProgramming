document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const jumper = document.createElement('div')

    let jumperLeftSpace = 50    //jumper 왼쪽 공간값
    let startPoint = 150
    let jumperBottomSpace = startPoint //jumper 아래 공간값
    let isGameOver = false      //게임오버 유무
    let platformCnt = 5;        //플랫폼 생성 갯수
    let platforms = []          //플랫폼 리스트
    let upTimerID               //점프시간
    let downTimerID             //추락시간
    let leftTimerID             
    let rightTimerID
    let isJumping = true
    let MovingLeft = false
    let MovingRight = false
    let score = 0
    let ActionTime = 20         //setInterval 시간 조절

    /* jumper를 그리드에 생성 */
    function createJumper(){  
        grid.appendChild(jumper)
        /* jumper 처음 위치 설정 */
        jumper.classList.add('jumper')
        jumperLeftSpace = platforms[0].left     //시작 위치를 플랫폼에 위치시키기
        jumper.style.left = jumperLeftSpace + 'px'      
        jumper.style.bottom = jumperBottomSpace + 'px'
    }

    /* 플랫폼 클래스 */
    class Platform {
        constructor(newPlatBottom) {
          this.left = Math.random() * 315 //400 - 85
          this.bottom = newPlatBottom

          this.visual = document.createElement('div')
    
          const visual = this.visual
          visual.classList.add('platform')
          visual.style.left = this.left + 'px'
          visual.style.bottom = this.bottom + 'px'
          grid.appendChild(visual)
        }
      }
    /* 플랫폼 생성 */
    function createPlatforms() {
        for(let i =0; i < platformCnt; i++) {
          let platSpace = 600 / platformCnt //플랫폼 공간
          let newPlatBottom = 100 + i * platSpace
          let newPlatform = new Platform (newPlatBottom)
          platforms.push(newPlatform) //리스트에 삽입
          console.log(platforms) //생성 확인
        }
    }
    /* 아래로 이동하는 플랫폼 */
    function movePlatforms(){
        //200 이상으로 올라가면 플랫폼이 움직이기 시작한다.
        if(jumperBottomSpace > 200){ 
            platforms.forEach(platform => {
                platform.bottom -= 4
                let visual = platform.visual
                visual.style.bottom = platform.bottom + 'px'
                /* 플랫폼이 바닥에 닿을 시 */
                if(platform.bottom < -3) {
                    let firstPlatform = platforms[0].visual
                    firstPlatform.classList.remove('platform')
                    platforms.shift()
                    score++ //점수 추가
                    if(score )
                    console.log(platforms)  //플랫폼 리스트 확인
                    let newPlatform = new Platform(600) //상단에 새 플랫폼 생성
                    platforms.push(newPlatform) //새 플랫폼을 리스트에 삽입
                }
            })
        }
    }
    /* 게임 종료 */
    function GameOver(){
        isGameOver = true
        while(grid.firstChild){
            grid.removeChild(grid.firstChild)
        }
        clearInterval(upTimerID)
        clearInterval(downTimerID)
        clearInterval(leftTimerID)
        clearInterval(rightTimerID)
        //점수 표시
        alert("Game Over\nScore : " + score)
    }
    /* 일정 높이 */
    function fall(){
        clearInterval(upTimerID)
        isJumping = false
        downTimerID = setInterval(
            function () {
                jumperBottomSpace -= 5  //5씩 감소하며 추락
                jumper.style.bottom = jumperBottomSpace + 'px'
                /* 화면 바닥에 닿을 시 게임 오버 */
                if(jumperBottomSpace < 0 ){
                    GameOver()
                }
                platforms.forEach(platform =>{
                    /* 플랫폼에 닿을 시 점프 */
                    if (jumperBottomSpace >= platform.bottom &&
                        jumperBottomSpace <= (platform.bottom + 15) && //platform height 15px
                        (jumperLeftSpace + 60) >= platform.left &&
                        jumperLeftSpace <= (platform.left + 85) && //platform width 85px
                        !isJumping //falling 중 일때
                        ) {
                            //console.log('landed') //콘솔로 플랫폼에 닿았는지 확인
                            startPoint = jumperBottomSpace
                            jump()
                        }
                })
        }, ActionTime)
    }
    /* 플랫폼에 닿을 시 점프 */
    function jump() {
        clearInterval(downTimerID)
        isJumping = true
        upTimerID = setInterval(
            function() {
                jumperBottomSpace += 10
                jumper.style.bottom = jumperBottomSpace + 'px'
                //일정 높이 이상으로 올라가면 fall 실행 점퍼의 점프 높이 설정
                if (jumperBottomSpace > startPoint + 200) {
                    fall()
                }
        }, ActionTime)
    }
    /* 점퍼 조작 */
    function control(event){
        if(event.key === "ArrowLeft"){
            moveLeft()      //왼쪽 이동
        }
        else if(event.key ==="ArrowRight"){
            moveRight()     //오른쪽 이동
        }
        else if(event.key ==="ArrowUp"){
            moveUp()        //제자리이동 좌우 이동 멈춤
        }
    }
    /* 윗 방향키 누를 시 */
    function moveUp(){ 
        //좌우동작을 멈추고 제자리에서 멈춤
        MovingLeft = false
        MovingRight = false
        clearInterval(leftTimerID)
        clearInterval(rightTimerID)
    }
    /* 왼쪽 방향키 누를 시 */
    function moveLeft(){
        //오른쪽 움직임 제거
        if(MovingRight){
            clearInterval(rightTimerID)
            MovingRight = false
        }
        MovingLeft = true
        leftTimerID = setInterval(
            function() {
                //왼쪽 벽에 부딪히지 않을때까지 왼쪽 이동
                if(jumperLeftSpace >= 0) {
                    jumperLeftSpace -= 5
                    jumper.style.left = jumperLeftSpace + 'px'
                }
                //왼쪽 벽에 부딪힐 시 오른쪽으로 이동(팅김)
                else moveRight()
        }, ActionTime) 
    }

    /* 오른쪽 방향키를 누를 시 */
    function moveRight(){
        //왼쪽 움직임 제거
        if(MovingLeft){
            clearInterval(leftTimerID)
            MovingLeft = false
        }
        MovingRight = true
        rightTimerID = setInterval(
                function() {
                //오른쪽 벽에 부딪히기 전까지 오른쪽 이동
                if(jumperLeftSpace <= 340) {
                    jumperLeftSpace += 5
                    jumper.style.left = jumperLeftSpace + 'px'
                }
                //오른쪽 벽에 부딪힐 시 왼쪽으로 이동
                else moveLeft()
            }, ActionTime)
    }

    /* 게임 시작 함수 */
    function start() {
        if (!isGameOver) {
            createPlatforms()
            createJumper()
            setInterval(movePlatforms, ActionTime)
            jump()
            document.addEventListener('keyup', control)
        } 
    }

    //게임 시작
    start()
})