var TILE_SIZE = 16;

var map_width = 25;
var map_height = 25;
var map_tile_data = new Array(
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
1, 2, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0,
1, 3, 3, 3, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 1, 1, 1, 0,
1, 3, 3, 3, 4, 4, 4, 4, 4, 4, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0,
1, 3, 3, 3, 4, 4, 4, 4, 4, 4, 3, 3, 1, 2, 2, 2, 2, 2, 4, 4, 4, 4, 1, 1, 0,
1, 3, 3, 3, 4, 4, 4, 4, 4, 4, 3, 3, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 0,
1, 3, 3, 3, 3, 1, 4, 4, 4, 4, 3, 3, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0,
1, 1, 3, 3, 3, 1, 1, 3, 3, 3, 3, 3, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0,
1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 0,
0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0,
0, 1, 1, 1, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0, 0, 0, 0, 0,
0, 1, 1, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0, 0, 0, 0, 0,
0, 1, 1, 3, 3, 3, 3, 3, 1, 4, 4, 4, 4, 4, 4, 4, 3, 3, 2, 1, 0, 0, 0, 5, 0,
0, 1, 1, 3, 3, 3, 3, 1, 1, 4, 4, 4, 4, 4, 4, 4, 3, 3, 2, 1, 0, 0, 1, 5, 1,
0, 1, 1, 1, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 3, 3, 2, 1, 0, 0, 1, 5, 1,
0, 1, 4, 4, 4, 4, 4, 4, 1, 1, 4, 4, 4, 1, 2, 2, 3, 3, 2, 4, 4, 4, 4, 1, 1,
0, 1, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 3, 3, 3, 2, 2, 2, 2, 4, 4, 4, 4, 1, 1,
0, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 1, 1,
0, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1, 0,
0, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1, 1, 0,
0, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0);

var settlement_index_locations = new Array(52, 144);
var tower_index_location = 448;

// Return the tile index of an elf's starting point (pass in the elf type)
function GetStart(elfType)
{
	return settlement_index_locations[elfType];
}

// Return the goal tile index
function GetEnd()
{
	return tower_index_location;
}

// Return a 1-dimensional tile index based on 2d coordinate system
function GetTileIndex(x, y)
{
	return y * map_width + x;
}

// Return the terrain based on 2d coordinates
function GetTileTerrain(x, y)
{
	return map_tile_data[GetTileIndex(x,y)];//I fixed this line, GetTileIndex was missing it's args
}

// Return the terrain of a given index
function GetTileTerrainIndex(index)
{
	return map_tile_data[index];
}

// Return the pixel x and pixel y of the tile index relative to the top left corner of the "map" div, in the center of the tile
function GetTileCenterPixelCoordinates(tileIndex)
{
	var center_tile_coords = new Object();
	center_tile_coords.x = (((tileIndex % map_width) * TILE_SIZE) + TILE_SIZE / 2);
	center_tile_coords.y = ((((tileIndex - (tileIndex % map_width)) / map_width) * TILE_SIZE) + TILE_SIZE / 2);
	return center_tile_coords;
}

// Return an array of indices up to 8 elements which are the N, E, S, W, NE, SE, SW and NW
// neighbours of the given tile.
function GetNeighbours(tileIndex)
{
	var neighbours = new Array();
	var x = tileIndex % map_width;
	var y = (tileIndex - x) / map_width;
	var hasNorth = (y > 0);
	var hasEast = (x < map_width - 1);
	var hasSouth = (y < map_height - 1);
	var hasWest = (x > 0);
	var tileDiagonal = Math.sqrt(TILE_SIZE * TILE_SIZE * 2);
	
	if (hasNorth)
	{
		var index = GetTileIndex(x, y - 1);
		neighbours.push(new Neighbour(index, map_tile_data[index], TILE_SIZE));
	}
	if (hasEast)
	{
		var index = GetTileIndex(x + 1, y);
		neighbours.push(new Neighbour(index, map_tile_data[index], TILE_SIZE));
	}
	if (hasSouth)
	{
		var index = GetTileIndex(x, y + 1);
		neighbours.push(new Neighbour(index, map_tile_data[index], TILE_SIZE));
	}
	if (hasWest)
	{
		var index = GetTileIndex(x - 1, y);
		neighbours.push(new Neighbour(index, map_tile_data[index], TILE_SIZE));
	}
	if (hasNorth && hasEast)
	{
		var index = GetTileIndex(x + 1, y - 1);
		neighbours.push(new Neighbour(index, map_tile_data[index], tileDiagonal));
	}
	if (hasEast && hasSouth)
	{
		var index = GetTileIndex(x + 1, y + 1);
		neighbours.push(new Neighbour(index, map_tile_data[index], tileDiagonal));
	}
	if (hasSouth && hasWest)
	{
		var index = GetTileIndex(x - 1, y + 1);
		neighbours.push(new Neighbour(index, map_tile_data[index], tileDiagonal));
	}
	if (hasWest && hasNorth)
	{
		var index = GetTileIndex(x - 1, y - 1);
		neighbours.push(new Neighbour(index, map_tile_data[index], tileDiagonal));
	}
	
	return neighbours;
}

// http://en.wikipedia.org/wiki/Taxicab_geometry - to estimate the distance between two points 
function GetManhattanHeuristicEstimate(start, end)
{
	if (start == end) return 0;
	
	return (Math.abs((end % map_width) - (start % map_width)) + Math.abs(((end - (end % map_width)) / map_width) - ((start - (start % map_width)) / map_width)));
}


//easier to use heuristic because it allows 2d coords
function GetManhattanHeuristicEstimate2D(start, end)
{
        var d1 = Math.abs (start.x - end.x);
        var d2 = Math.abs (start.y - end.y);
        return d1 + d2;
}