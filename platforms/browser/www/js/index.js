$(document).on("pagebeforeshow", "#pgHome", function() {
    databaseHandler.createDatabase();
    storageHandler.loadStorages(displayStorages);
    $("#tabs #navListItems li a").on("vclick", function() {
        $("#tabs #navListItems li a").removeClass("ui-state-persist");
        $(this).addClass("ui-state-persist");
    });
    $("#navViewItem").on("vclick", function() {
        storageHandler.loadStorages(displayStorages);
    });
    $("input[type=file]").change(function() {
        readURL(this);
    });
    $("#test").on("vclick", function() {
        readURL(this);
    });
    $("#test1").change(function() {
        readURL(this);
    });
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $("#pgAddBookImagePreview").attr("src", e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function openCameraToAdd() {
    cameraHandler.takePicture();
}

function selecPictureToAdd() {
    cameraHandler.selectPicture();
}

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
    let publicTransport = $("#pgAddPublicTransport").val() ? $("#pgAddPublicTransport").val() : "";

    if (!storageType || !dimension || !addingDatetime || !storageFeature || !price || !reporter) {
        event.preventDefault();
        const emptyAlert = "This field cannot be empty!";
        // storage type alert
        $("#pgAddStorageTypeAlert").text(storageType == "" ? emptyAlert : "");
        // dimension alert
        $("#pgAddDimensionAlert").text(dimension == "" ? emptyAlert : "");
        // datetime alert
        $("#pgAddDatetimeAlert").text(addingDatetime == "" ? emptyAlert : "");
        // storage feature alert
        $("#pgAddStorageFeatureAlert").text(storageFeature == "" ? emptyAlert : "");
        // price alert
        $("#pgAddPriceAlert").text(price == "" ? emptyAlert : "");
        // reporter alert
        $("#pgAddReporterAlert").text(reporter == "" ? emptyAlert : "");
    } else {
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

let currentStorage = {
    id: -1,
    storageType: "",
    dimension: -1,
    addingDatetime: "",
    storageFeature: "",
    price: -1,
    reporter: "",
    notes: "",
    condition: "",
    shopDistance: -1,
    publicTransport: "",
};

function displayStorages(results) {
    let length = results.rows.length;
    let lstStorages = $("#lstStorages");
    lstStorages.empty(); //Clean the old data before adding.
    for (let i = 0; i < length; i++) {
        let item = results.rows.item(i);
        elementStorage = `
            <li>
                <a href="#pgDetailStorage">
                    <p name="_id" class="ui-hidden-accessible">${item._id}</p>
                    <p>
                        <span class="field">Storage type: </span>
                        <span name="type">${item.storageType}</span>
                    </p>
                    <p>
                        <span class="field">Dimension:</span>
                        <span name="dimension">${item.dimension}</span>
                    </p>
                    <p>
                        <span class="field">Date and time:</span>
                        <span name="datetime">${item.addingDatetime}</span>
                    </p>
                    <p>
                        <span class="field">Feature:</span>
                        <span name="feature">${item.storageFeature}</span>
                    </p>
                    <p>
                        <span class="field">Price:</span>
                        <span name="price">${item.price}</span>
                    </p>
                    <p>
                        <span class="field">Reporter:</span>
                        <span name="reporter">${item.reporter}</span>
                    </p>
                    <p name="condition" class="ui-hidden-accessible">${item.condition}</p>
                    <p name="distance" class="ui-hidden-accessible">${item.shopDistance}</p>
                    <p name="publicTransport" class="ui-hidden-accessible">
                        ${item.publicTransport}
                    </p>
                    <p name="notes" class="ui-hidden-accessible">${item.notes}</p>
                </a>
            </li>
        `;

        lstStorages.append(elementStorage);
    }

    lstStorages.listview("refresh");

    lstStorages.on("vclick", "li", function() {
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
            .find("[name='distance']")
            .text();
        currentStorage.publicTransport = $(this)
            .find("[name='publicTransport']")
            .text();
    });
}

$(document).on("pagebeforeshow", "#pgDetailStorage", function() {
    let detailStorage = $("#detailStorage");
    detailStorage.empty(); //Clean the old data before
    elementDetailStorage = `
        <h4>Storage type:</h4>
        <p>${currentStorage.storageType}</p>
        <h4>Dimension:</h4>
        <p>${currentStorage.dimension}</p>
        <h4>Date and time:</h4>
        <p>${currentStorage.datetime}</p>
        <h4>Feature:</h4>
        <p>${currentStorage.storageFeature}</p>
        <h4>Price:</h4>
        <p>${currentStorage.price}</p>
        <h4>Reporter:</h4>
        <p>${currentStorage.reporter}</p>
        <h4>Condition:</h4>
        <p>${currentStorage.condition}</p>
        <h4>Distance to shops:</h4>
        <p>${currentStorage.shopDistance}</p>
        <h4>Public transportation:</h4>
        <p>${currentStorage.publicTransport}</p>
        <h4>Notes:</h4>
        <p id="detailStorageNotes">${currentStorage.notes}</p>
    `;
    detailStorage.append(elementDetailStorage);
});

function deleteStorage() {
    storageHandler.deleteStorage(currentStorage.id);
    $.mobile.changePage("#pgHome", {
        transition: "pop",
        reverse: false,
        changeHash: false,
    });
}

$(document).on("pagebeforeshow", "#pgUpdateStorage", function() {
    let publicTransportOptions = currentStorage.publicTransport
        ? currentStorage.publicTransport.trim().split(",")
        : "";
    if (publicTransportOptions.length > 0) {
        $.each(publicTransportOptions, function(i, v) {
            $("#pgUpdatePublicTransport option[value='" + v + "']").prop("selected", true);
            $("#pgUpdatePublicTransport").selectmenu("refresh");
        });
    }

    $("#pgUpdateShopDistance").val(currentStorage.shopDistance);
    $("#pgUpdateCondition").val(currentStorage.condition);
    $("#pgUpdateNotes").val(currentStorage.notes);
});

function updateStorage() {
    let newNotes = $("#pgUpdateNotes").val();
    let newCondition = $("#pgUpdateCondition").val();
    let newShopDistance = $("#pgUpdateShopDistance").val();
    let newPublicTransport = $("#pgUpdatePublicTransport").val();
    storageHandler.updateStorage(
        currentStorage.id,
        newNotes,
        newCondition,
        newShopDistance,
        newPublicTransport,
    );
    currentStorage.notes = newNotes;
    currentStorage.condition = newCondition;
    currentStorage.shopDistance = newShopDistance;
    currentStorage.publicTransport = newPublicTransport.join(",");
    $.mobile.changePage("#pgDetailStorage", {
        transition: "pop",
        reverse: false,
        changeHash: false,
    });
}
