randomMasterData()

fetch('/MasterDataCollection')
    .then(response => response.json())
    .then(data => displayMasterDataCollection(data));

fetch('/Environment')
    .then(response => response.json())
    .then(data => displayEnvironment(data));

function displayMasterData(data) {
    var col1 = data[0].id;
    var col2 = (data[0].name) ? data[0].name : data[0].firstName;
    var col3 = (data[0].price) ? data[0].price : data[0].email;

    document.getElementById("col1").innerHTML = col1;
    document.getElementById("col2").innerHTML = col2;
    document.getElementById("col3").innerHTML = col3;
}

function displayMasterDataCollection(data) {
    var container = document.getElementById("dbRow")

    data.slice().reverse().forEach(masterData => {
        var tr = document.createElement("tr");
        
        var td = document.createElement("td");
        td.innerHTML = masterData.id;
        tr.appendChild(td);

        var td = document.createElement("td");
        td.innerHTML = masterData.name;
        tr.appendChild(td);

        var td = document.createElement("td");
        td.innerHTML = masterData.value;
        tr.appendChild(td);

        var td = document.createElement("td");
        td.innerHTML = masterData.masterdata;
        tr.appendChild(td);

        container.appendChild(tr);
    });
}

function displayEnvironment(data) {
    var container = document.getElementById("environment");

    Object.keys(data).forEach(function (key) {
        var tag = document.createElement("div");
        var text = document.createTextNode(key + " = " + data[key]);
        tag.appendChild(text);
        container.appendChild(tag);
    });
}

function randomMasterData() {
    fetch('/RandomMasterData')
        .then(response => response.json())
        .then(data => displayMasterData(data));
}

function addMasterData() {
    // POST request using fetch()
    fetch("/MasterData", {
        method: "POST",
        body: JSON.stringify({
            id: document.getElementById("col1").innerHTML,
            name: document.getElementById("col2").innerHTML,
            value: document.getElementById("col3").innerHTML
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(() => {
        console.log("all good, refresh")
        location.reload()
    });
}