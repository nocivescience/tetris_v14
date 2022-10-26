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
        this.y=0;
        this.x=Math.floor(cols/2);
    }
    renderPiece(){
        this.shape.map((row,i)=>{
            row.map((cell,j)=>{
                if(cell!==0){
                    this.ctx.fillStyle=colors[cell];
                    this.ctx.fillRect(this.x+j,this.i+i,1,1)
                }
            })
        })
    }
    renderGameState(){
        for(let i=0;i<this.grid.length;i++){
            for(let j=0;j<this.grid[i].length;j++){

            }
        }
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
    renderGameState(){
        for(let i=0;i<this.grid;i++){
            for(let j=0;j<this.grid[i];j++){
                let cell=this.grid[i][j];
                this.ctx.fillStyle.color(cell);
                this.fillRect(j,i,1,1)
            }
        }
        if(this.fallingPiece!==null){
            this.fallingPiece.renderPiece();   
        }
    }
    moveDown(){
        if(this.fallingPiece===null){
            this.renderGameState();
            return
        }else{
            this.renderGameState();
        }
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
            // console.log('hola')
        }else{
            // console.log('adhios');
        }
    }
}