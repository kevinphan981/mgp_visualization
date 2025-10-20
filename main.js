//everything is directed graphs (I would hope we are using arrows)
import * as dagreD3 from 'dagre-d3'; //for graphs using d3
// import * as graphlibDot from 'graphlibDot'; //for DOT files but no need.. for now?
import * as FuzzySet from 'fuzzyset.js' //string matching for searches

// will likely have to import more if need comes up

var data = null; //data comes later
var nameToID = new Object(); //set up for map
var fuzzynames = FuzzySet.default(); //to be used for string approx.

//arbitary, i have no idea how big this is in reality
let width = 1000;
let height = 800;
let svg = d3.select("#content").append("svg").attr("width", width)
                                             .attr("length", length)
                                             .style("cursor", "move");
                                             
let initialScale = '0.5';
let inner = svg.append("g").attr("transform", `scale(${initialScale},${initialScale})`);


//TODO: parse data (JSON) into graph (in general, somehow get a graph working)

function dataToGraph(d) {
    //what is decompression?
    let nodes = d.nodes;
    let edges = d.edges;
}
    // will need to deal with IDs and also with how each graph finds itself (adjacent nodes/edges)



//TODO: search bar feature functions

// setting up the search bar

function searchBar(text, textInputID, resultsID) {
    d3.select(textInputID).property('value', text);
    d3.select(resultsID).style('display', 'none');
}

function suggestNames(textInputID, resultsID) {
    let searchString = d3.select(textInputID).property('value');
    let autocomplete = d3.select(resultsID);
    console.log('Autocomplete: ' + searchString);
}