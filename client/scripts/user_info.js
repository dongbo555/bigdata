// Generate a Bates distribution of 10 random variables.

// A formatter for counts.
var formatCount = d3.format(",.0f");
var formatCount2 = d3.format(",.2f");

var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var nodesByName = {};
var nodeGraph,
	nest,
	values,
	nodes1
	;
	


var bin_num;	
// Generate a histogram using twenty uniformly-spaced bins.


d3.selectAll("input").on("change", change);

var timeout = setTimeout(function() {
  d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
}, 1000);

function change() {
  clearTimeout(timeout);
  if (this.value === "grouped") transitionGrouped();
  else transitionStacked();
}

function transitionGrouped() {
  
  //bin_num=10;
 
}

function transitionStacked() {
 
  //bin_num=20;
 
}

bin_num=20;
function drew(file){		
var path ="uploads/"+file+".csv";
d3.csv(path,function(error,csvdata){
			
			nodeGraph=csvdata;
		 nest = d3.nest()
			.key(function(d) { return d.userId; })
			.map(csvdata, d3.map);
		 
		  update();
		});	   
}
function nodeByName(ID) {
			return nodesByName[ID] || (nodesByName[ID] = {gender:nest.get(ID)[0].gender});
}


function update(){
	
	var nodes2=nodeGraph.map(function(link) {
			  return {gender: nest.get(link.userId)[0].gender};
			});
	
	nodeGraph.forEach(function(link) {
		
				nodeByName(link.userId);
	});
	
	
	nodes1 = d3.values(nodes2);
	
	
	values=nodeGraph.map(function(d) {return d.age;});
	
	var x = d3.scale.linear()
    .domain([0, 100])
    .range([0, width]);
	
	var data = d3.layout.histogram()
    .bins(x.ticks(bin_num))
    (values);
	
	
var y = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.y; })])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
	
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var xScale = d3.scale.ordinal()
	.domain(d3.range(bin_num))
	.rangeRoundBands([0,width],0.05);
							
var yScale = d3.scale.linear()
	.domain([0, d3.max(data, function(d) { return d.y; })])
    .range([height, 0]);

var svg = d3.select("#movieInfos").append("svg:svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append('svg:g')
	.attr("id","graph")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var vis = svg.append("svg:g");

var bar = vis.selectAll(".bar")
    .data(data)
	.enter()
	.append("g")
    .attr("class", "bar");
	
var rect=bar.append("rect")
    .attr("x", function(d) { return x(d.x); })
    .attr("y", height)
    .attr("width", xScale.rangeBand())
    .attr("height", 0)
	.attr("fill","red");

rect.transition()
		   .duration(3000)
		   .ease("bounce")
		   .delay(function(d,i){
				return 10*i;
		   })
		   .attr("y",function(d) { return y(d.y); })
		   .attr("height", function(d) { return height - y(d.y); })
		   .attr("fill","steelblue");

rect.on("mouseover",function(d,i){
				d3.select(this)
				  .attr("fill","yellow");
	})
	.on("mouseout",function(d,i){
				d3.select(this)
				  .transition()
		          .duration(500)
				  .attr("fill","steelblue");
	});
	

 bar.append("title")
			  .text(function(d) { 
					return '这个区间的数量:'+formatCount(d.y)+'\n'+'占样本的比重:'+formatCount2(d.y/values.length*100)+'%';  
			  });

vis.append("text")
	        .attr("class","title")
	        .attr("x", (width / 2))             
	        .attr("y", 20)
	        .attr("text-anchor", "middle")  
	        .style("font-size", "16px") 
	        .style("text-decoration", "underline")  
	        .text("Age distribution");
			
vis.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

vis.append("g")
    .attr("class", "y axis")
    .call(yAxis);
	
}

		
 
