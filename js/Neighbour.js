// stores the information for neighbouring tiles returned from GetNeighbours

function Neighbour(index, terrain, distance)
{
	this.TileIndex = index;
	this.Terrain = terrain;
	this.Distance = distance;
}