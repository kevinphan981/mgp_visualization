// university_coordinates.js
// University coordinates matching the MGP data format (with country names)

const UNIVERSITY_COORDS = {
  // United States Universities (with ", United States" suffix)
  'Iowa State University, United States': [42.0267, -93.6465],
  'University of Tennessee - Knoxville, United States': [35.9544, -83.9295],
  'Wayne State University, United States': [42.3584, -83.0680],
  'The University of North Carolina at Chapel Hill, United States': [35.9049, -79.0469],
  'University of North Carolina at Chapel Hill, United States': [35.9049, -79.0469],
  'Harvard University, United States': [42.3770, -71.1167],
  'MIT, United States': [42.3601, -71.0942],
  'Massachusetts Institute of Technology, United States': [42.3601, -71.0942],
  'Stanford University, United States': [37.4275, -122.1697],
  'University of California, Berkeley, United States': [37.8719, -122.2585],
  'Princeton University, United States': [40.3430, -74.6514],
  'Yale University, United States': [41.3163, -72.9223],
  'The University of Chicago, United States': [41.7886, -87.5987],
  'Columbia University, United States': [40.8075, -73.9626],
  'Cornell University, United States': [42.4534, -76.4735],
  'University of Michigan, United States': [42.2780, -83.7382],
  'University of Pennsylvania, United States': [39.9522, -75.1932],
  'California Institute of Technology, United States': [34.1377, -118.1253],
  'Caltech, United States': [34.1377, -118.1253],
  'Duke University, United States': [36.0014, -78.9382],
  'Northwestern University, United States': [42.0565, -87.6753],
  'Johns Hopkins University, United States': [39.3299, -76.6205],
  'Brown University, United States': [41.8268, -71.4025],
  'Dartmouth College, United States': [43.7044, -72.2887],
  'University of California, Los Angeles, United States': [34.0689, -118.4452],
  'UCLA, United States': [34.0689, -118.4452],
  'University of California, San Diego, United States': [32.8801, -117.2340],
  'University of Texas at Austin, United States': [30.2849, -97.7341],
  'University of Illinois at Urbana-Champaign, United States': [40.1020, -88.2272],
  'University of Wisconsin-Madison, United States': [43.0766, -89.4125],
  'University of Minnesota, United States': [44.9740, -93.2277],
  'Ohio State University, United States': [40.0067, -83.0305],
  'Pennsylvania State University, United States': [40.7982, -77.8599],
  'Purdue University, United States': [40.4237, -86.9212],
  'University of Maryland, United States': [38.9869, -76.9426],
  'University of Washington, United States': [47.6553, -122.3035],
  'University of Hawaii, United States': [21.2969, -157.8170],
  'University of Virginia, United States': [38.0336, -78.5080],
  'Georgia Institute of Technology, United States': [33.7756, -84.3963],
  'Texas A&M University, United States': [30.6187, -96.3365],
  'University of Arizona, United States': [32.2319, -110.9501],
  'University of Colorado Boulder, United States': [40.0076, -105.2659],
  'University of Florida, United States': [29.6436, -82.3549],
  'New York University, United States': [40.7295, -73.9965],
  'University of Southern California, United States': [34.0224, -118.2851],
  
  // Canada
  'University of Alberta, Canada': [53.5232, -113.5263],
  'University of Toronto, Canada': [43.6629, -79.3957],
  'McGill University, Canada': [45.5048, -73.5772],
  'University of British Columbia, Canada': [49.2606, -123.2460],
  'University of Waterloo, Canada': [43.4723, -80.5449],
  'McMaster University, Canada': [43.2609, -79.9192],
  
  // Germany
  'Technische Universität Chemnitz, Germany': [50.8136, 12.9281],
  'University of Göttingen, Germany': [51.5415, 9.9355],
  'Ludwig Maximilian University of Munich, Germany': [48.1507, 11.5809],
  'University of Munich, Germany': [48.1507, 11.5809],
  'Heidelberg University, Germany': [49.4093, 8.6943],
  'Humboldt University of Berlin, Germany': [52.5186, 13.3928],
  'Technical University of Munich, Germany': [48.1497, 11.5677],
  'University of Bonn, Germany': [50.7283, 7.0850],
  'Free University of Berlin, Germany': [52.4539, 13.2896],
  'University of Hamburg, Germany': [53.5678, 9.9851],
  'University of Frankfurt, Germany': [50.1282, 8.6648],
  'Technical University of Berlin, Germany': [52.5122, 13.3267],
  
  // United Kingdom
  'University of Cambridge, United Kingdom': [52.2034, 0.1235],
  'University of Oxford, United Kingdom': [51.7548, -1.2544],
  'Imperial College London, United Kingdom': [51.4988, -0.1749],
  'University College London, United Kingdom': [51.5246, -0.1340],
  'UCL, United Kingdom': [51.5246, -0.1340],
  'University of Edinburgh, United Kingdom': [55.9445, -3.1892],
  'University of Manchester, United Kingdom': [53.4668, -2.2339],
  'King\'s College London, United Kingdom': [51.5115, -0.1160],
  'University of Bristol, United Kingdom': [51.4585, -2.6030],
  'University of Warwick, United Kingdom': [52.3788, -1.5603],
  'London School of Economics, United Kingdom': [51.5145, -0.1167],
  
  // France
  'Sorbonne University, France': [48.8480, 2.3564],
  'Université Paris-Sud, France': [48.7014, 2.1744],
  'École Normale Supérieure, France': [48.8434, 2.3446],
  'École Polytechnique, France': [48.7114, 2.2078],
  'Université de Paris, France': [48.8275, 2.3811],
  'University of Paris, France': [48.8275, 2.3811],
  'Pierre and Marie Curie University, France': [48.8466, 2.3574],
  
  // Switzerland
  'ETH Zurich, Switzerland': [47.3769, 8.5417],
  'University of Zurich, Switzerland': [47.3744, 8.5500],
  'EPFL, Switzerland': [46.5191, 6.5668],
  'École Polytechnique Fédérale de Lausanne, Switzerland': [46.5191, 6.5668],
  'University of Geneva, Switzerland': [46.1991, 6.1420],
  
  // Netherlands
  'University of Amsterdam, Netherlands': [52.3555, 4.9550],
  'Leiden University, Netherlands': [52.1579, 4.4864],
  'Utrecht University, Netherlands': [52.0893, 5.1128],
  'Delft University of Technology, Netherlands': [51.9988, 4.3732],
  
  // Australia
  'University of Sydney, Australia': [-33.8886, 151.1873],
  'University of Melbourne, Australia': [-37.7982, 144.9606],
  'Australian National University, Australia': [-35.2777, 149.1200],
  'University of Queensland, Australia': [-27.4975, 153.0137],
  
  // Israel
  'Hebrew University of Jerusalem, Israel': [31.7930, 35.2428],
  'Tel Aviv University, Israel': [32.1133, 34.8043],
  'Weizmann Institute of Science, Israel': [31.9065, 34.8106],
  
  // Japan
  'University of Tokyo, Japan': [35.7138, 139.7625],
  'Kyoto University, Japan': [35.0262, 135.7808],
  'Osaka University, Japan': [34.8210, 135.5232],
  
  // China
  'Peking University, China': [39.9925, 116.3164],
  'Tsinghua University, China': [40.0003, 116.3264],
  'Fudan University, China': [31.2989, 121.5025],
  
  // Russia
  'Moscow State University, Russia': [55.7028, 37.5308],
  'Saint Petersburg State University, Russia': [59.9406, 30.2991],
  'Steklov Institute of Mathematics, Russia': [55.7453, 37.6193],
  
  // India
  'Indian Institute of Technology Bombay, India': [19.1334, 72.9133],
  'IIT Bombay, India': [19.1334, 72.9133],
  'Indian Institute of Technology Delhi, India': [28.5450, 77.1920],
  'IIT Delhi, India': [28.5450, 77.1920],
  'Indian Institute of Science, India': [13.0215, 77.5672],
  
  // Other European
  'University of Vienna, Austria': [48.2192, 16.3565],
  'KU Leuven, Belgium': [50.8798, 4.7005],
  'University of Copenhagen, Denmark': [55.6802, 12.5707],
  'Stockholm University, Sweden': [59.3646, 18.0570],
  
  // FRANCE 
  'Universit\u00e9 de Bourgogne, France': [47.30749877, 5.06916639],
};

export default UNIVERSITY_COORDS;
