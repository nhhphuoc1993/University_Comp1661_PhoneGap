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
};

function displayStorages(results) {
    var length = results.rows.length;
    var lstStorages = $("#lstStorages");
    lstStorages.empty(); //Clean the old data before adding.
    for (let i = 0; i < length; i++) {
        let item = results.rows.item(i);
        let a = $("<a />");

        let h3Type = $("<h3 />").text("Storage type: ");
        let spanType = $("<span />").text(item.storageType);
        spanType.attr("name", "type");
        h3Type.append(spanType);
        a.append(h3Type);

        let h4Dimension = $("<h4 />").text("Dimension: ");
        let spanDimension = $("<span />").text(item.dimension);
        spanDimension.attr("name", "dimension");
        h4Dimension.append(spanDimension);
        a.append(h4Dimension);

        let h4Datetime = $("<h4 />").text("Date and time: ");
        let spanAddingDatetime = $("<span />").text(item.addingDatetime);
        spanAddingDatetime.attr("name", "datetime");
        h4Datetime.append(spanAddingDatetime);
        a.append(h4Datetime);

        let h4Feature = $("<h4 />").text("Feature: ");
        let spanFeature = $("<span />").text(item.storageFeature);
        spanFeature.attr("name", "feature");
        h4Feature.append(spanFeature);
        a.append(h4Feature);

        let h4Price = $("<h4 />").text("Price: ");
        let spanPrice = $("<span />").text(item.price);
        spanPrice.attr("name", "price");
        h4Price.append(spanPrice);
        a.append(h4Price);

        let h4Reporter = $("<h4 />").text("Reporter: ");
        let spanReporter = $("<span />").text(item.reporter);
        spanReporter.attr("name", "reporter");
        h4Reporter.append(spanReporter);
        a.append(h4Reporter);

        let h4Notes = $("<h4 />").text("Notes: ");
        let spanNotes = $("<span />").text(item.notes);
        spanNotes.attr("name", "notes");
        h4Notes.append(spanNotes);
        a.append(h4Notes);

        let pId = $("<p />").text("Id: ");
        let spanId = $("<span />").text(item._id);
        spanId.attr("name", "_id");
        pId.append(spanId);
        pId.attr("class", "ui-hidden-accessible");
        a.append(pId);

        let li = $("<li/>");
        li.attr("data-filtertext", item.storageType);
        li.append(a);
        lstStorages.append(li);
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
