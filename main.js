grid = []
interval = 20

newCellTimer = 0

cellSize = 25
cellSpacing = 5

d = new Date()

function cell(x, y) {
	
	this.x=x
	this.y=y
	
	this.ticker = 0
	this.speedy = 1
	
	this.color = '#D5D5D5'
	
}

window.onload = function() {
	
	canvas = document.getElementById('canvas')
	cG = canvas.getContext('2d')
	
	width = window.innerWidth
	height = window.innerHeight
	
	canvas.width = width
	canvas.height = height
	
	mapWidth = parseInt(width / cellSize)
	mapHeight = parseInt(height / cellSize)
	
	newCellTimer = d.getTime()
	setInterval('update()', interval)
	window.onresize = resize
	
}

function update() {
		
	cG.fillStyle = '#ffffff'
	cG.fillRect(0, 0, width, height)
	d = new Date()
	
	var elapsedTime = d.getTime() - newCellTimer
	
	if(elapsedTime > 1000){
		newBlock()
		newCellTimer = d.getTime()
	}
	
	for(var i = 0;i<grid.length;i++) {
		
		var temp = grid[i].y + grid[i].speedy
		collision = collides(temp, grid[i].x)
		
		if(!collision) {
			
			grid[i].y = temp
			
			if(grid[i].ticker % 20 == 0)grid[i].speedy++
			grid[i].ticker++
				
		} else if(collision) {
			
			
				
		} else {
			
			grid[i].y = temp - collision
				
		}
		
	}
	
	for(i=0;i<grid.length;i++) {
			
		cG.fillStyle = grid[i].color
		cG.fillRect(grid[i].x, grid[i].y, cellSize, cellSize)
			
	}
	
}

function newBlock() {
	
	xIndex = Math.floor((Math.random() * mapWidth)) * (cellSize + cellSpacing) + cellSpacing
	if(!collides(0, xIndex)) {
		
		grid.push(new cell(xIndex, 0))
		
	}
	
}

function collides(y, x) {
	
	var newPos = y + cellSize + cellSpacing
	
	if(newPos >= height)return true
	
	for(i = 0;i<grid.length;i++) {
		
		if(newPos >= grid[i].y && newPos <= grid[i].y + cellSize && grid[i].x == x) {
			
			return newPos - grid[i].y
				
		}
			
	}
	
	return false
		
}

function resize() {
	
	width = window.innerWidth
	height = window.innerHeight
	mapWidth = width / cellSize
	mapHeight = width / cellSize
	
	canvas.width = width
	canvas.height = height
		
}
