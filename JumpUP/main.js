document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const jumper = document.createElement('div')

    let jumperLeftSpace = 50    //jumper 왼쪽 공간값
    let jumperBottomSpace = 150 //jumper 아래 공간값
    let isGameOver = false
    let platformCnt = 5;
    let platforms = []
    let upTimerID
    let downTimerID


    /* jumper를 그리드에 생성 */
    function createJumper(){  
        grid.appendChild(jumper)
        /* jumper 처음 위치 설정 */
        jumper.classList.add('jumper')
        jumperLeftSpace = platforms[0].left     //점퍼 시작 위치를 플랫폼에 위치시키기
        jumper.style.left = jumperLeftSpace + 'px'      
        jumper.style.bottom = jumperBottomSpace + 'px'
    }
    /* 플랫폼 */
    class Platform {
        constructor(newPlatBottom){
            this.bottom = newPlatBottom
            this.left = Math.random() * 315 //400 - 85
            
            this.visual = document.createElement('div')
            const visual = this.visual

            visual.classList.add('platformm') //platform에 추가
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)
        }
    }

    /* 플랫폼 생성 */
    function createPlatforms() {
        for(let i=0; i< platformCnt; i++){
            let platSpace = 600 / platformCnt   //플랫폼 공간
            let newPlatBottom = 100 + i * platSpace
            let newPlatform = new Platform (newPlatBottom)
            platforms.push(newPlatform)
            console.log(platforms)
            
        }   
    }
    
    function movePlatforms(){
        //점퍼가 200 이상으로 올라가면 플랫폼이 움직이기 시작한다.
        if(jumperBottomSpace > 200){ 
            platforms.forEach(platform => {
                platform.bottom -= 4
                let visual = platform.visual
                visual.style.bottom = platform.bottom + 'px'
            })
        }
    }
    /* 게임 종료 */
    function GameOver(){
        alert("game over")
        isGameOver = true
        clearInterval(upTimerID)
        clearInterval(downTimerID)
    }
    /*  */
    function fall(){
        clearInterval(upTimerID)
        downTimerID = setInterval(
            function () {
                jumperBottomSpace -= 5
                jumper.style.bottom = jumperBottomSpace + 'px'
                if(jumperBottomSpace < 0 ){
                    GameOver()
                }
        }, 30)
    }

    function jump() {
        clearInterval(downTimerID)
        upTimerID = setInterval(
            function() {
                jumperBottomSpace += 20
                jumper.style.bottom = jumperBottomSpace + 'px'
                if (jumperBottomSpace > 350) {
                    fall()
                }
        }, 30)
    }

    /* 게임 시작 함수 */
    function start() {
        if (!isGameOver) {
            createPlatforms()
            createJumper()
            setInterval(movePlatforms, 30)
            jump()
        } 
    }
    
    start()

})