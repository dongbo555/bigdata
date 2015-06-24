//返回随机颜色代码
function user_network(filename){
function random_color() {
				var letters = '0123456789ABCDEF'.split('');
				var color = '#';
				for (var i = 0; i < 6; i++) {
		color += letters[Math.round(Math.random() * 15)];
				}
				return color;
}



var nodesByName = {};
var nodeGraph,
	nest,
	nodes = [];
var width = 1000,
	height = 600;

var activeMovie = undefined;
var currentOffset = { x: 0, y: 0 };
var currentZoom = 1.0;
var graphLinks, graphNodes;

var temp = d3;
var x = d3.scale.linear()
    .domain([0, width])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([0, height])
    .range([height, 0]);
var svg = d3.select("#userNetwork").append("svg:svg")
	.attr('xmlns', 'http://www.w3.org/2000/svg')
	.attr("width", width)
	.attr("height", height)
	.attr("id", "graph")
	.attr("viewBox", "0 0 " + width + " " + height)
	.attr("preserveAspectRatio", "xMidYMid meet");



svg.append("rect")
	.attr("x", 0)
	.attr("y", 0)
	.attr("height", height)
	.attr("width", width)
	.style("stroke", 'black')
	.style("fill", "none")
	.style("stroke-width", 1);

var zoomer = d3.behavior.zoom().
	scaleExtent([0.4, 10]).
	x(x).
	y(y).
	on("zoom", redraw);

var svg_graph = svg
	.append('svg:g')
	.call(zoomer)
	;

var rect = svg_graph.append('svg:rect')
	.attr('width', width)
	.attr('height', height)
	.attr('fill', 'transparent')
	.attr('stroke', 'transparent')
	.attr('stroke-width', 1)
	.attr("id", "zrect");

var vis = svg_graph.append("svg:g");





function redraw() {
	vis.attr("transform",
		"translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
}

var color = d3.scale.category20();

var force = d3.layout.force()
	.charge(-90)
	.size([width, height]);

var path = "uploads/" + filename + ".csv";
d3.csv(path, function (error, csvdata) {

	nodeGraph = csvdata;
	nest = d3.nest()
		.key(function (d) { return d.userId; })
		.map(csvdata, d3.map);

	update1();
});




function nodeByName(ID) {
	return nodesByName[ID] || (nodesByName[ID] = { id: ID, age: nest.get(ID)[0].age, gender: nest.get(ID)[0].gender, occupation: nest.get(ID)[0].occupation });
}

function update1() {


	links = nodeGraph;
	links.forEach(function (link) {
		nodeByName(link.userId);
	});
			
			
			
		  // Extract the array of nodes from the map by name.
	nodes = d3.values(nodesByName);

			 force
		.nodes(nodes)
		.start();
	
			 //.links(links)
			
			  
			 var networkGraph = vis.attr('class', 'grpParent');
	// graphLinks= networkGraph.append('svg:g').attr('class','grp gLinks')
		  //.selectAll("line")
	// .data(links,function(d) {return d.source.id+'-'+d.target.id;})
	//.enter().append("line")
			 //.style('stroke-width', function(d) { return 1;} )
			 // .attr("class", function(d) { return 'line level2';})
			
	//resetNode(selectedNode)
			 // link.exit().remove();
	// enhanceNode(selectedNode)
	//d3.select(this)
	//node.exit().remove();
			
		
		  graphNodes = networkGraph.append('svg:g').attr('class', 'grp gNodes')
		.selectAll("circle")
		.data(nodes, function (d) { return d.id; })
		.enter().append("svg:circle")
		.attr('id', function (d) { return "c" + d.id; })
		.attr("class", function (d) { return 'node level1'; })
		.attr("r", 4)
		.attr('pointer-events', 'all')
		.style("fill", function () { return random_color(); })
		.call(force.drag);



		  graphNodes.append("title")
		.text(function (d) {
		return '用户:' + d.id + '\n' + '年龄:' + d.age + '\n' + '用户性别:' + d.gender + '\n' + '用户职业:' + d.occupation;
	});

		  force.on("tick", function () {
				
		//graphLinks.attr("x1", function(d) { return d.source.x; })
		//.attr("y1", function(d) { return d.source.y; })
		//.attr("x2", function(d) { return d.target.x; })
		//.attr("y2", function(d) { return d.target.y; });
		
			
		graphNodes.attr("transform", function (d) {
			return "translate(" + x(d.x) + "," + y(d.y) + ")";
		});
		//if(force.alpha()<=0.05){ 
		//force.stop(); 
		//}
		  });


}
	
}