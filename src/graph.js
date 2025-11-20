   // we need more methods for graphs, especially for the nodes and edges

   
    //TODO: addParent method

    //TODO: addChild method

   /*
    render takes the graph data and then renders it using d3.
   */
     export function render(graphData) {
        if (graphData == null || graphData.size == 0) {
            console.error("No data");
            return;
        }
                
        
        //we actually make the graph, initially empty
        const graph = new dagreD3.graphlib.Graph({}).setGraph({});

        // add all nodes
            for (const [key, value] of graphData.entries()) {

                let label = ''; 
                let detail = null;

                //TESTs
                if (key === "18" || key === "258") {
                    console.log(`SET NODE: Key for ${key} is type ${typeof key}`);
                }

                if (!value || !value.detail) {
                    console.warn(`Skipping node ${storeKey}: Missing 'detail' data.`);
                     continue;
                }
            
                detail = value.detail;
                // Defensive Label Construction (in case properties are null/undefined)
                label = `${detail.givenName || ''} ${detail.familyName || ''} (${detail.yearAwarded || 'N/A'})`;

                // possible white space or numbers in the keys throwing off the retrieval?
                const storeKey = String(key); // <-- NEW: Normalize the key

                // set up a node for each respective entry in the data
                graph.setNode(storeKey, {
                    label: `${value.detail.givenName} ${value.detail.familyName} (${value.detail.yearAwarded})`,
                    detail: value.detail
                });

                try {
                    graph.setNode(storeKey, {
                        label: label,
                        academicData:detail
                    });
                } catch (e) {
                    console.error(`ERROR:failed to set node ${storeKey}...`, e);
                }
            
        }

        //gets the edges that we have in the data
        for (const [key, value] of graphData.entries()) {

            // possible white space in the keys throwing off the retrieval?
            const storeKey = String(key); // <-- NEW: Normalize the key

            //logic to draw the downstream/children

            value.edges.forEach(adviseeId => {

                //we only include the edge if the advisee is in the map, data is limited
                if (graphData.has(adviseeId)) {
                    graph.setEdge(storeKey, adviseeId, {
                        arrowhead: "normal",
                        curve: d3.curveBasis,
                        label: " "
                    });
                }
            });

            //logic for upstream parents/advisors, yes it is the same thing essentially
            value.advisors.forEach(advisorId => {
                if (graphData.has(advisorId)) {
                    graph.setEdge(advisorId, storeKey, {
                        arrowhead: "normal",
                        curve: d3.curveBasis,
                        label: " "
                    });
                }
            });

         }

         console.log("Graph Nodes keys:", graph.nodes());

        // now setting up the scene using d3 for the visual

        const svg = d3.select("div#container").select("svg"),
            inner = svg.select("g")

        //zoom feature
        const zoom = d3.zoom().on("zoom", function(event) {
            inner.attr("transform", event.transform);
        });
        svg.call(zoom);


        //make render obj
        const renderer = new dagreD3.render();
        //run render and use the graph data to draw graph
        renderer(inner, graph)


        //centering the visual
        const svgWidth = svg.node().getBoundingClientRect().width;
        const initialScale = 0.75;
        // svg.call(zoom.transform, d3.zoomIdentity
        //     .translate((svg.attr("width") - graph.graph().width * initialScale) / 2, 20)
        //     .scale(initialScale));
        svg.call(zoom.transform, d3.zoomIdentity
            .translate((svgWidth - graph.graph().width * initialScale) / 2, 20)
            .scale(initialScale));

        svg.attr('height', graph.graph().height * initialScale + 40);
        
        //TODO: hover/click features with a method


        svg.selectAll("g.node")
            .on("mouseover", function(event, nodeId) { //d is the "ID" in this case, the internal one

                const targetElement = d3.select(event.currentTarget); //focuses only on the hover
                targetElement.raise(); //raises the hover feature over the nodes
                
                // NEW DEFENSE: Ensure 'this' is a valid DOM element before selecting it
                if (!this) return; 

                // 1. Correctly retrieve the node data object
                const lookupId = String(nodeId); 
                const nodeValue = graph.node(lookupId); 
                
                // 2. Perform the defensive check on the stored property (academicData)
                if (!nodeValue || !nodeValue.academicData) {
                    console.error("Missing custom data (academicData) for node ID:", lookupId);
                    return;
                }
                
                // 3. Assign the detail object to a readable variable
                const nodeData = nodeValue.academicData; 

                const node = d3.select(this);
                
                // Remove old tooltips before creating a new one
                node.selectAll(".hover-tooltip").remove(); 
                
                const tooltipGroup = targetElement.append("g")
                    .attr("class", "hover-tooltip-group")
                    .attr("transform", "translate(50, -50)");

                const tooltipText = tooltipGroup.append("text")
                    .attr("x", 30) //5
                    .attr("y", -20) //5
                    .attr("text-anchor", "start")
                    .style("font-size", "12px")
                    .style("fill", "#333");

                // 4. Bind the tooltip data
                tooltipText.selectAll("tspan")
                // Bind the data array, using || 'N/A' for safety
                .data([
                    `Family Name: ${nodeData.familyName || 'N/A'}`,
                    `Given Name: ${nodeData.givenName || 'N/A'}`,
                    `Year Awarded: ${nodeData.yearAwarded || 'N/A'}`,
                    `MRAUTH ID: ${nodeData.mrauth_id || 'N/A'}`,
                    `Internal ID: ${nodeData.internal_id || 'N/A'}`
                ])
                .enter()
                .append("tspan")
                .attr("x", 40) // Reset X for each tspan line
                .attr("dy", "1.2em") // Offset Y for each tspan line
                .text(d => d);

                // rectangle box that needs to come in AFTER the text above
                // requires a timeout

                setTimeout(() => {
                    try {
                        const box = tooltipText.node().getBBox();

                        // append the rectangle to group before text
                        tooltipGroup.insert("rect", "text")
                            .attr("x", box.x -5) //padding
                            .attr("y", box.y - 5)
                            .attr("width", box.width + 10)
                            .attr("height", box.height + 10)
                            .style("fill", "f9f9f9") //light gray
                            .style("stroke", "#666") //also gray
                            .style("stroke-width", 0.75);
                            // .style("opacity", .9);
                    } catch (e) {
                        console.warn("Could not calculate tooltip bounding box: ", e);
                    }
                }, 0); //small timeout, could increase
                
            }).on("mouseout", function(d) {
                // This logic is safe and should remain as is
                d3.select(event.currentTarget).selectAll(".hover-tooltip-group").remove();                
            });
    
            // .on("click", function(d) {
            //     alert("Node clicked: " + id);
            //     //needs to reset the graphData in order to render the new graph

            // });


     }

