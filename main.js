//global canvas objects
var cv;
var ctx;
var cvTop;
var ctxTop;

function main()
{
	//Setup canvasas
	cv = document.getElementById('gameCanvas');
	ctx = cv.getContext('2d');
	cvTop = document.getElementById('gameCanvasTop');
	ctxTop = cvTop.getContext('2d');

	//setupPaths and their grids
	var sPath = new cellGrid(TILE_SIZE*map_width);
	sPath.setUpCosts(SnowElf);
	var fPath = new cellGrid(TILE_SIZE*map_width);
	fPath.setUpCosts(ForestElf);

	var snowStart = GetTileCenterPixelCoordinates(GetStart(SnowElf));
	var forestStart = GetTileCenterPixelCoordinates(GetStart(ForestElf));

	var snowElf = new elf(snowStart, TILE_SIZE/8, "rgb(0,0,255)",SnowElf);
	var forestElf = new elf(forestStart, TILE_SIZE/8+3, "rgb(0,255,0)",ForestElf);
	
	//Calculte Each elf's best path
	var snowPath = astar.search(sPath.grid, sPath.grid[snowStart.x][snowStart.y], sPath.grid[(GetEnd()%map_width)*TILE_SIZE][Math.floor(GetEnd()/map_width)*TILE_SIZE], true,GetManhattanHeuristicEstimate2D);
	var forestPath = astar.search(fPath.grid, fPath.grid[forestStart.x][forestStart.y], fPath.grid[(GetEnd()%map_width)*TILE_SIZE][Math.floor(GetEnd()/map_width)*TILE_SIZE], true,GetManhattanHeuristicEstimate2D);

	var fFrame = 0;
	var sFrame = 0;
	var mainloop = function ()
	{
		//Set elf to its next position along it's path and draw it
		if(fFrame<forestPath.length){
			var steps = 2;
			//make elf move faster when on its own element
			if(forestPath[fFrame].cost==1){
				steps=4;
			}else if(forestPath[fFrame].cost==4){
				steps=1;
			}
			for(var i=0;i<steps;i++){
				forestElf.pos.x=forestPath[fFrame+i].x;
				forestElf.pos.y=forestPath[fFrame+i].y;
				forestElf.draw();
			}
			fFrame+=steps;
		}
		if(sFrame<snowPath.length){
			var steps = 2;
			if(snowPath[sFrame].cost==1){
				steps=4;
			}else if(snowPath[sFrame].cost==4){
				steps=1;
			}
			for(var i=0;i<steps;i++){
				snowElf.pos.x=snowPath[sFrame+i].x;
			snowElf.pos.y=snowPath[sFrame+i].y;
			snowElf.draw();
			}
			sFrame+=steps;
		}
	}

	//Run next frame every 10th of a second
	var ONE_FRAME_TIME = 1000.0 / 10.0;
    setInterval(mainloop, ONE_FRAME_TIME);
}


function elf(pos, dim, color,type) {
	this.pos = pos;
	this.color=color;
	this.dim=dim;
	this.type=type;

	//render elf to canvas
	this.draw = function() {
			if(this.type==ForestElf){
	            ctx.fillStyle = this.color;
	            ctx.fillRect(this.pos.x, this.pos.y, this.dim, this.dim);
        	}else{
        		ctxTop.fillStyle = this.color;
            	ctxTop.fillRect(this.pos.x, this.pos.y, this.dim, this.dim);
        	}
    }
}

function cellGrid(size) {
	this.grid = new Array(size);
	for (var i = 0; i < this.grid.length; i++) {
		this.grid[i] = new Array(size);
	}

	//itterate through the original grid and create larger grid for elfs to walk
	this.setUpCosts = function(elfType){
		for (var i = 0; i < this.grid.length; i++) {
			for (var j = 0; j < this.grid.length; j++) {
				this.grid[i][j] = new Object();
				this.grid[i][j].f = 0;
                this.grid[i][j].g = 0;
                this.grid[i][j].h = 0;
                this.grid[i][j].closed = false;
                this.grid[i][j].visited = false;
                this.grid[i][j].parent = null;
                this.grid[i][j].x=i;
                this.grid[i][j].y=j;

                var ter = GetTileTerrain(Math.floor(i/16),Math.floor(j/16));
                if(ter == Water){
                	this.grid[i][j].cost = 1000;
                	this.grid[i][j].closed=true;
                }else if(ter == Grass){
                	this.grid[i][j].cost = 2;                	
                }else if(ter == Snow){
                	if(elfType==ForestElf){
						this.grid[i][j].cost = 4;
                	}else{
                		this.grid[i][j].cost = 1;
                	}                	
                }else if(ter == Forest){
                	if(elfType==ForestElf){
						this.grid[i][j].cost = 1;
                	}else{
                		this.grid[i][j].cost = 4;
                	}                	
                }else if(ter == Mountain){
                	this.grid[i][j].cost = 1000;
                	this.grid[i][j].closed=true;
                }else if(ter == Building){
                	this.grid[i][j].cost = 2;                	
                }else{
                	console.log('error terrain');
                }
			}
		}
	}
}
