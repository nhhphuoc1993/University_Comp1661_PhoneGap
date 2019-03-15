$(document).on("ready", function() {
    databaseHandler.createDatabase();
});

function addStorage() {
    let storageType = $("#pgAddStorageType").val();
    let dimension = $("#pgAddDimension").val();
    let addingDatetime = $("#pgAddDatetime").val();
    let storageFeature = $("#pgAddStorageFeature").val();
    let price = $("#pgAddPrice").val();
    let reporter = $("#pgAddReporter").val();
    let notes = $("#pgAddNotes").val();
    let condition = $("#pgAddCondition").val();
    let shopDistance = $("#pgAddShopDistance").val();
    let publicTransport = $("#pgAddPublicTransport").val();

    if (!storageType || !dimension || !addingDatetime || !storageFeature || !price || !reporter) {
        event.preventDefault();
        const emptyAlert = "This field cannot be empty!";
        // storage type alert
        $("#pgAddStorageTypeAlert").text(storageType === "" ? emptyAlert : null);
        // dimension alert
        var dimensionAlert = null;
        $("#pgAddDimensionAlert").text(dimension === "" ? emptyAlert : null);
        // datetime alert
        var datetimeAlert = null;
        $("#pgAddDatetimeAlert").text(addingDatetime === "" ? emptyAlert : null);
        // storage feature alert
        $("#pgAddStorageFeatureAlert").text(storageFeature === "" ? emptyAlert : null);
        // price alert
        $("#pgAddPriceAlert").text(price === "" ? emptyAlert : null);
        // reporter alert
        $("#pgAddReporterAlert").text(reporter === "" ? emptyAlert : null);
    } else {
        console.log(
            `Storage type: ${storageType}; Dimension: ${dimension}, Datetime of adding storage: ${
                addingDatetime.value
            }, storageFeature: ${storageFeature}, Price: ${price}, Reporter: ${reporter}, Notes: ${notes}, Condition: ${condition}, Shop distance: ${shopDistance}, Public transport: ${publicTransport}`,
            "storage - add",
        );

        storageHandler.addStorage(
            storageType,
            dimension,
            addingDatetime,
            storageFeature,
            price,
            reporter,
            notes,
            condition,
            shopDistance,
            publicTransport,
        );

        $(`#pgAddStorageType option[value='']`).attr("selected", "selected");
        $("#pgAddStorageType").selectmenu("refresh");

        $("#pgAddDimension").val(null);
        $("#pgAddDatetime").val(null);
        $("#pgAddStorageFeature").val(null);
        $("#pgAddPrice").val(null);
        $("#pgAddReporter").val(null);
        $("#pgAddNotes").val(null);
        $("#pgAddCondition").val(null);
        $("#pgAddShopDistance").val(null);

        $(`#pgAddPublicTransport option:selected`).removeAttr("selected");
        $("#pgAddPublicTransport").selectmenu("refresh");
    }
}

var currentStorage = {
    id: -1,
    storageType: "",
    dimension: null,
    addingDatetime: null,
    storageFeature: null,
    price: null,
    reporter: null,
    notes: null,
    condition: null,
    shopDistance: null,
    publicTransport: null,
};

function displayStorages(results) {
    let length = results.rows.length;
    let lstStorages = $("#lstStorages");
    lstStorages.empty(); //Clean the old data before adding.
    for (let i = 0; i < length; i++) {
        let item = results.rows.item(i);

        elementStorage = `
            <li>
                <a>
                    <p name="_id" class="ui-hidden-accessible">Id: ${item._id}</p>
                    <p name="type"><span>Storage type:</span> ${item.storageType}</p>
                    <p name="dimension"><span>Dimension:</span> ${item.dimension}</p>
                    <p name="datetime"><span>Date and time:</span> ${item.addingDatetime}</p>
                    <p name="feature"><span>Feature:</span> ${item.storageFeature}</p>
                    <p name="price"><span>Price:</span> ${item.price}</p>
                    <p name="reporter"><span>Reporter:</span> ${item.reporter}</p>
                    <p name="condition" class="ui-hidden-accessible">Condition: ${
                        item.condition
                    }</p>
                    <p name="distance" class="ui-hidden-accessible">Shop distance: ${
                        item.shopDistance
                    }</p>
                    <p name="publicTransport" class="ui-hidden-accessible">Public transportation: ${
                        item.publicTransport
                    }</p>
                    <p name="notes" class="ui-hidden-accessible">Notes: ${
                        item.notes
                    }</p>                   
                </a>
            </li>
        `;

        lstStorages.append(elementStorage);
    }

    lstStorages.listview("refresh");

    lstStorages.on("tap", "li", function() {
        currentStorage.id = $(this)
            .find("[name='_id']")
            .text();
        currentStorage.storageType = $(this)
            .find("[name='type']")
            .text();
        currentStorage.dimension = $(this)
            .find("[name='dimension']")
            .text();
        currentStorage.datetime = $(this)
            .find("[name='datetime']")
            .text();
        currentStorage.storageFeature = $(this)
            .find("[name='feature']")
            .text();
        currentStorage.price = $(this)
            .find("[name='price']")
            .text();
        currentStorage.reporter = $(this)
            .find("[name='reporter']")
            .text();
        currentStorage.notes = $(this)
            .find("[name='notes']")
            .text();
        currentStorage.condition = $(this)
            .find("[name='condition']")
            .text();
        currentStorage.shopDistance = $(this)
            .find("[name='shopDistance']")
            .text();
        currentStorage.publicTransport = $(this)
            .find("[name='publicTransport']")
            .text();

        //Set event for the list item
        $("#popupUpdateDeleteStorage").popup("open");
    });
}

$(document).on("pagebeforeshow", "#pgListStorage", function() {
    storageHandler.loadStorages(displayStorages);
});

function deleteStorage() {
    storageHandler.deleteStorage(currentStorage.id);
    storageHandler.loadStorages(displayStorages);
    $("#popupUpdateDeleteStorage").popup("close");
}

$(document).on("pagebeforeshow", "#dialogUpdateStorage", function() {
    $("#dialogUpdateNotes").val(currentStorage.notes);
});

function updateStorage() {
    let newNotes = $("#dialogUpdateNotes").val();
    storageHandler.updateStorage(currentStorage.id, newNotes);
    $("#dialogUpdateStorage").dialog("close");
}
