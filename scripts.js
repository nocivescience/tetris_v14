const gamesEl=document.getElementById('games');
const ctx=gamesEl.getContext('2d');
const scale=32;
const shapes=[
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0],
    ],[
        [1,1,1],
        [0,0,1],
        [0,0,0]
    ],[
        [1,1],
        [1,1],
    ],[
        [1,1,0],
        [0,1,1],
        [0,0,0]
    ],[
        [1,1,1],
        [1,0,0],
        [0,0,0]
    ],[
        [0,1,0],
        [1,1,1],
        [0,0,0]
    ],[
        [0,1,1],
        [1,1,0],
        [0,0,0]
    ]
];
const colors=[
    'black',
    'aqua',
    'brown',
    'salmon',
    'teal',
    'mediumseagreen',
    'yellow',
    'gold',
];
const cols=10;
const rows=20;
class Pieces{
    constructor(shape,ctx){
        this.shape=shape;
        this.ctx=ctx;
        this.y=-1;
        this.x=Math.floor(cols/2);
    }
    renderPiece(){
        this.shape.map((row,i)=>{
            row.map((cell,j)=>{
                if(cell!==0){
                    this.ctx.fillStyle=colors[cell];
                    this.ctx.fillRect(this.x+j,this.y+i,1,1)
                }
            })
        })
    }
}
class GameModel{
    constructor(ctx){
        this.ctx=ctx;
        this.fallingPiece=null;
        this.grid=this.makeStartingGrid();
    }
    //construccion del grid
    makeStartingGrid(){
        let grid=[];
        for(let i=0; i<rows;i++){
            grid[i]=[];
            for(let j=0;j<cols;j++){
                grid[i][j]=0
            }
        }
        return grid
    }
    collision(x,y,candidate=null){
        const shape=candidate||this.fallingPiece.shape;
        const n=shape.length;
        for(let i=0;i<n;i++){
            for(let j=0;j<n;j++){
                if(shape[i][j]!==0){
                    let p=x+j;
                    let q=y+i;
                    if(p>=0&&p<cols&&q<rows){
                        if(this.grid[q][p]>0){
                            return true
                        }
                    }else{
                        return true
                    }
                }
            }
        }
        return false
    }
    renderGameState(){
        for(let i=0;i<this.grid.length;i++){
            for(let j=0;j<this.grid[i].length;j++){
                let cell=this.grid[i][j];
                this.ctx.fillStyle=colors[cell];
                this.ctx.fillRect(j,i,1,1)
            }
        }
        if(this.fallingPiece!==null){
            this.fallingPiece.renderPiece();   
        }
    }
    moveDown(){
        if(this.fallingPiece===null){
            this.renderGameState()
        }else if(this.collision(this.fallingPiece.x,this.fallingPiece.y+1)){
            const shape=this.fallingPiece.shape;
            const x=this.fallingPiece.x;
            const y=this.fallingPiece.y;
            shape.map((row,i)=>{
                row.map((cell,j)=>{
                    let p=x+j;
                    let q=y+i;
                    if(p>=0&&p<cols&&q<rows&&cell>0){
                        this.grid[q][p]=shape[i][j];
                    }
                })
            });
            if(this.fallingPiece.y===0){
                alert('Game Over');
                this.grid=this.makeStartingGrid();
            }
            this.fallingPiece=null;
        }else{
            this.fallingPiece.y+=1;
        }
        this.renderGameState();
    }
    move(right){
        if(this.fallingPiece===null){
            return
        }
        let x=this.fallingPiece.x;
        let y=this.fallingPiece.y;
        if(right){
            if(!this.collision(x+1,y)){
                this.fallingPiece.x+=1;
            }
        }else{
            if(!this.collision(x-1,y)){
                this.fallingPiece.x-=1;
            }
        }
        this.renderGameState()
    }
    rotate(){
        if(this.fallingPiece!==null){
            let shape=[...this.fallingPiece.shape.map((row)=>[...row])];
            for(let y=0;y<shape.length;++y){
                for(let x=0;x<y;++x){
                    [shape[x][y],shape[y][x]]=[shape[y][x],shape[x][y]];
                }
            }
            shape.forEach((row=>row.reverse()));
            if(!this.collision(this.fallingPiece.x,this.fallingPiece.y,shape)){
                this.fallingPiece.shape=shape;
            }
        }
        this.renderGameState()
    }
}
ctx.scale(32,32);
const model=new GameModel(ctx)
setInterval(()=>{
    newGameState()
},1000)
function newGameState(){
    fullSend();
    if(model.fallingPiece===null){
        const rand=Math.floor(Math.random()*shapes.length);
        const newPiece= new Pieces(shapes[rand],ctx);
        model.fallingPiece=newPiece;
        model.fallingPiece.renderPiece();
        model.moveDown();
    }
    model.moveDown();
}
function fullSend(){
    const allFilled=(row)=>{
        for(let x of row){
            if(x===0){
                return false
            }
        }
        return true
    }
    for(let i=0;i<model.grid.length;i++){
        if(allFilled(model.grid[i])){
            
        }
    }
}
document.addEventListener('keydown',(e)=>{
    e.preventDefault()
    switch(e.key){
        case 'w':
            model.rotate();
            break;
        case 'd':
            model.move(true);
            break;
        case 's':
            model.moveDown();
        case 'a':
            model.move(false);
            break;
    }
})