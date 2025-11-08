

// helper function to parse the right data from json
function getAcademicData(allData, id) {
    if (!allData || !allData[id] || !allData[id].MGP_academic) {
        return null;
    }
    return allData[id].MGP_academic;
}

// helper function to extract node details
function addNodeToMap(map, allData, id) {
    const academic = getAcademicData(allData, id);
    if (!academic) {
        return;
    }
    const adviseeList = academic["student_data"]["descendants"]["advisees"] || [];
    const edges = adviseeList.filter(id => id && id.length > 0);
    
    // we have to deal with both masters and phd degrees fml
    const allDegrees = academic["student_data"]["degrees"] || [];
    const phdDegree = allDegrees.find(degree => degree.degree_type === "Ph.D.");    
     //use the phd when available
    const degreeData = phdDegree || null;
    
    const inputs = degreeData ? Object.keys(degreeData["advised by"] || {}) : [];

   
    // make sure the variable names match
    const yearAward = degreeData ? degreeData["degree_year"] : "N/A";

    const detail = {
        familyName: academic.family_name || "",
        givenName: academic.given_name || "",
        yearAward: yearAward 
    };

    map.set(id, {
        edges: edges,
        detail: detail,
        inputs: inputs
    });
}

/*
    function: created()
    - Accepts a rootMrauthId
    - Fetches the JSON
    - Finds the matching internal ID
    - Builds a small map for that person and their children
*/
export async function created(rootMrauthId) {
    
    let myMap = new Map();
    let allData; // This will hold our data

    try {
        const response = await fetch("../sample-data/all_academics_merged_backup.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // assign the fetched data DIRECTLY to allData
        allData = await response.json(); 
        console.log("Fetched JSON data successfully.");


    } catch(e) {
        console.error("Failed to fetch/parse JSON data: ", e);
        return null;
    }

    if (!allData) {
        console.error("Data object is empty.");
        return null;
    }

    // This loop finds the internal ID from the mrauth_id
    let rootId = null;
    for (const key in allData) {
        const academic = allData[key]?.MGP_academic;
        if (academic && academic.mrauth_id === rootMrauthId) {
            rootId = academic.ID; // e.g., "258"
            break; // We found them
        }
    }

    if (!rootId) {
        console.error(`Could not find academic with mrauth_id ${rootMrauthId}`);
        return null;
    }
    // --- END FIX 3 ---

    console.log(`Found internal ID ${rootId} for mrauth_id ${rootMrauthId}`);

    // --- This logic now works correctly ---
    
    // 2. Add the ROOT node to the map
    addNodeToMap(myMap, allData, rootId);

    // 3. Get the root node's edges (advisees)
    const rootNode = myMap.get(rootId);
    if (!rootNode) {
        console.error(`Root ID ${rootId} not found in data.`);
        return null;
    }
    
    // 4. Add all ADVISEE nodes (children) to the map
    for (const adviseeId of rootNode.edges) {
        addNodeToMap(myMap, allData, adviseeId);
    }
    
    return myMap;
};