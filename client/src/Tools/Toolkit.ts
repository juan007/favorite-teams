/**
 * randomly generates a number between the range of low and high
 * @param low 
 * @param high 
 * @returns 
 */

function getRandom(low:number = 1, high:number = 10) {
    let randomNumber:number;
    // calculate random number
    randomNumber = Math.round(Math.random() * (high - low)) + low;
    // returning value
    return randomNumber;
}

/**
 * Get XML Data
 * @param retrieveScript - location of XML
 * @param success - success callback function
 * @param failure - failure callback function
 */
function getXMLData(retrieveScript:string, success:Function, failure:Function) {
    // send out AJAX request
    let xmlhttp:XMLHttpRequest = new XMLHttpRequest();
    xmlhttp.addEventListener("load", (e:Event) => {
        // has the response been received successfully?
        if (xmlhttp.status === 200) {
            // data retrieved - call success method and pass along XML object response
            success(xmlhttp.responseXML);
        } else {
            failure();
        }
    });
    xmlhttp.addEventListener("error", (e:Event) => {
        failure();
    });
    xmlhttp.open("GET", retrieveScript, true);
    xmlhttp.send();
}

/**
 * Send JSON Data to an external API
 * @param sendScript - Location of the API
 * @param jsonString - The JSON body
 * @param success - callback function in case of success
 * @param failure  - callback function in case of failure
 * @param requestType - POST/PUT/DELETE
 */
function sendJSONData(sendScript:string, jsonString:string, success:Function, failure:Function,requestType:string) {
    // send out AJAX request
    let xmlhttp:XMLHttpRequest = new XMLHttpRequest();
    xmlhttp.addEventListener("load", (e:Event) => {
        // has the response been received successfully?
        if (xmlhttp.status === 200) {
            // data retrieved - call success method and pass along XML object response
            success(xmlhttp.responseText);
        } else {
            failure(xmlhttp.status);
        }
    });
    xmlhttp.addEventListener("error", (e:Event) => {
        failure(xmlhttp.responseText);
    });
    xmlhttp.open(requestType, sendScript, true);
    // setting the content-type of the request so the server knows what format that data is coming as
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(jsonString);
}

function getJSONData(retrieveScript:string, success:Function, failure:Function) {
    fetch(retrieveScript)
        .then((response:Response) => response.json())
        .then((data:any) => success(data))
        .catch((error:Error) => failure(error.message));
}

export {getRandom, getXMLData, sendJSONData, getJSONData};