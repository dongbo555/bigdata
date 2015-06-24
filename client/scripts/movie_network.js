//返回随机颜色代码
function movie_network(filename) {
	
			
			function random_color() {
				var letters = '0123456789ABCDEF'.split('');
				var color = '#';
				for (var i = 0; i < 6; i++ ) {
					color += letters[Math.round(Math.random() * 15)];
				}
				return color;
			}
			
			

			var nodesByName = {};
			var moviesByName = {};
			
			var nodeGraph,
					nest,
					nest2,
					nest3,
			nodes=[];
			var width = 1000,
			height = 600;
			
			var activeMovie = undefined;
			var currentOffset = { x : 0, y : 0 };
			var currentZoom = 1.0;
			var graphLinks,
				graphNodes;


var x = d3.scale.linear()
    .domain([0, width])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([0, height])
    .range([height,0]);

	var svg = d3.select("#recmovieNetwork").append("svg:svg")
				.attr('xmlns','http://www.w3.org/2000/svg')
				.attr("width", width)
				.attr("height", height)
				.attr("id","graph")
				.attr("viewBox", "0 0 " + width + " " + height )
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
        scaleExtent([0.4,10]).
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

		queue()
		.defer(d3.csv,"user.csv")
		.defer(d3.csv,filename+".csv")
		.defer(d3.csv,"uitem.csv")
		.await(function(error, userdata,csvdata,moviedata) {	
			
			 nest = d3.nest()
			.key(function(d) { return d.userId; })
			.map(userdata, d3.map);
			
			
			
			 nest2 = d3.nest()
			.key(function(d) { return d.userID; })
			.map(csvdata, d3.map);
			
			 nest3 = d3.nest()
			.key(function(d) { return d.movieId; })
			.map(moviedata, d3.map);
			
			nodeGraph=csvdata;
			update2();
		});	 
		
		
		
		
		
		
		function nodeByName(ID) {
			return nodesByName[ID] || (nodesByName[ID] = {id:ID,age:nest.get(ID)[0].age,gender:nest.get(ID)[0].gender,occupation:nest.get(ID)[0].occupation});
		}
		
		function movieByName(ID) {
			
			return moviesByName[ID] || (moviesByName[ID] = {id:ID,movieTitle:nest3.get(ID)[0].movieTitle,realeaseDate:nest3.get(ID)[0].realeaseDate,IMDbURL:nest3.get(ID)[0].IMDbURL,movieType:nest3.get(ID)[0].movieType});
		}
		
		function update2(){
			
			links=nodeGraph;
			links.forEach(function(link) {
				nodeByName(link.userID);
				movieByName(link.itemId);
			});
			
			
		  // Extract the array of nodes from the map by name.
			nodes = d3.values(nodesByName);
			
			 force
			  .nodes(nodes) 
			  .start();
	
			 //.links(links)
			
			
			 var networkGraph =vis.attr('class','grpParent');
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
			
		
		  graphNodes = networkGraph.append('svg:g').attr('class','grp gNodes')
		  .selectAll("circle")
			  .data(nodes,function(d){ return d.id; })
			.enter().append("svg:circle")
			   .attr('id', function(d) { return "c" + d.id; } )
			  .attr("class", function(d) { return 'node level1';})
			  .attr("r", 4)
			  .attr('pointer-events', 'all')
			  .style("fill", function(){ return random_color();})
			  .on("click", function(d) {
				  d3.selectAll("circle").attr("r", 4);
				  $(this).attr("r", 30);
				  showMoviePanel(d);} )
			  .call(force.drag);
		
			d3.select("#searchId")
				.on("click", function() {
					var date = $("#userId").val();
					
					if(nodes[date]!== undefined){
						d3.selectAll("circle").attr("r", 4);
						d3.select( '#c' + nodeByName(date).id ).attr("r",30);
						 showMoviePanel(nodeByName(date));
						
					}
					
				});
			
		  graphNodes.append("title")
			  .text(function(d) { 
					 return '用户:'+d.id+'\n'+'年龄:'+d.age+'\n'+'用户性别:'+d.gender+'\n'+'用户职业:'+d.occupation;  
			  });

		  force.on("tick", function() {
				
				//graphLinks.attr("x1", function(d) { return d.source.x; })
				//.attr("y1", function(d) { return d.source.y; })
				//.attr("x2", function(d) { return d.target.x; })
				//.attr("y2", function(d) { return d.target.y; });
		
			
				graphNodes.attr("transform", function (d) {
					return "translate(" + x(d.x)+ "," + y(d.y) + ")";
				});
			//if(force.alpha()<=0.05){ 
				//force.stop(); 
			//}
		  });
		  
		
		}
	
	function showMoviePanel( node ) {
      // Fill it and display the panel
     d3.select("#movieInfo")
	.html( getMovieInfo(node,nodes) )
	.attr("class","panel_on");
}	

function getMovieInfo( n, nodeArray ){
	
	var id=parseInt(n.id, 10); 
	
	info = '<div id="cover">';
	
	info +='<img src="../images/close.png" class="action" style="top: 0px;" title="close panel" onClick="toggleDiv(\'movieInfo\');"/>'
	info += '<div class=f><span class=l></span></div>';
	//info += '<div class=f><span class=l><input id="searchNode" type="text" /><input type="button" value="searchNode"  onclick="selectMovie('  
	    // +$(this).prev().value+ ',true);"/></span></div>';

    info += '<div class=f><span class=l>用户</span>: <span class=d>' 
           + n.id + '</span></div>';
	
	
	
	info += '<div class=f><span class=l>为该用户推荐的电影</span></div>';
	info += '<ul class="nav">';
	
	var recMovie=nest2.get(id);
	
	recMovie.forEach(function(d) {
		
		
			var neighborID1=d.itemId;
			
			 info += '<div class=f><span class=l>movie</span>: ';
			 info += '<li class="dropdown">';
			 info += '[<a href="#" class="dropdown-toggle" data-toggle="dropdown">' +movieByName(neighborID1).id+'-'+movieByName(neighborID1).movieTitle + ' <b class="caret"></b></a>]';
			 info += '<ul class="dropdown-menu">';
			 info += '<li><a href="#one">' +movieByName(neighborID1).realeaseDate+'</a></li>';
			 info += '<li><a href="#two">' +movieByName(neighborID1).IMDbURL+'</a></li>';
			 info += '<li class="divider"></li>';
			 info += '<li><a href="#three">' +movieByName(neighborID1).movieType+'</a></li>';
			 info += '</ul>';
			 info += '</li>';
			 info += '</div>';
			 
	
	});
	
	info += '</ul>';
	                
	info += '<br/></div>';
	
	return info;
}

toggleDiv = function( id, status ) {
    d = d3.select('div#'+id);
    if( status === undefined )
      status = d.attr('class') == 'panel_on' ? 'off' : 'on';
    d.attr( 'class', 'panel_' + status );
    return false;
  }
  
  }