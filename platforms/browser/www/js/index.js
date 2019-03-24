$(document).on("pagebeforeshow", "#pgHome", function() {
    databaseHandler.createDatabase();
    storageHandler.loadStorages(displayStorages);

    activeViewStorageTab();

    $("#btnAddImage").on("vclick", function() {
        event.preventDefault();
        // cameraHandler.takephoto();
        cameraHandler.ftw("img/c.jpg");
    });
    $("#btnAddImageFromGallery").on("vclick", function() {
        event.preventDefault();
        // cameraHandler.selectPhoto();
        cameraHandler.ftw("img/c.jpg");
    });
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
    let publicTransport = $("#pgAddPublicTransport").val() ? $("#pgAddPublicTransport").val() : "";
    let imgURI = $("#pgAddImgURI").text();
    let isAddStorage = validateAddStorageForm(
        storageType,
        dimension,
        addingDatetime,
        storageFeature,
        price,
        reporter,
    );

    if (isAddStorage === true) {
        storageHandler.addStorage(
            storageType,
            dimension,
            new Date(addingDatetime).toUTCString(),
            storageFeature,
            price,
            reporter,
            notes,
            condition,
            shopDistance,
            publicTransport,
            imgURI,
        );
    } else {
        event.preventDefault();
    }
}

function validateAddStorageForm(
    storageType,
    dimension,
    addingDatetime,
    storageFeature,
    price,
    reporter,
) {
    let result = true;

    const emptyAlert = "This field cannot be empty!";
    const invalidDateAlert = "Invalid datetime!";
    let pgAddStorageTypeAlert = "";
    let pgAddDimensionAlert = "";
    let pgAddDatetimeAlert = "";
    let pgAddStorageFeatureAlert = "";
    let pgAddPriceAlert = "";
    let pgAddReporterAlert = "";

    if (!storageType) {
        pgAddStorageTypeAlert = emptyAlert;
        result = false;
    }

    if (!dimension) {
        pgAddDimensionAlert = emptyAlert;
        result = false;
    }

    if (!addingDatetime) {
        pgAddDatetimeAlert = emptyAlert;
        result = false;
    } else {
        if (
            addingDatetime.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/g) === null ||
            new Date(addingDatetime) > new Date()
        ) {
            pgAddDatetimeAlert = invalidDateAlert;
            result = false;
        }
    }

    if (!storageFeature) {
        pgAddStorageFeatureAlert = emptyAlert;
        result = false;
    }

    if (!price) {
        pgAddPriceAlert = emptyAlert;
        result = false;
    }

    if (!reporter) {
        pgAddReporterAlert = emptyAlert;
        result = false;
    }

    $("#pgAddStorageTypeAlert").text(pgAddStorageTypeAlert);
    $("#pgAddDimensionAlert").text(pgAddDimensionAlert);
    $("#pgAddDatetimeAlert").text(pgAddDatetimeAlert);
    $("#pgAddStorageFeatureAlert").text(pgAddStorageFeatureAlert);
    $("#pgAddPriceAlert").text(pgAddPriceAlert);
    $("#pgAddReporterAlert").text(pgAddReporterAlert);

    return result;
}

function resetPageAddStorageInput() {
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
    $("#pgAddImgURI").val(null);
    $("#pgAddImagePhoto").attr("src", "");

    $(`#pgAddPublicTransport option:selected`).removeAttr("selected");
    $("#pgAddPublicTransport").selectmenu("refresh");
}

let currentStorage = {
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
    imgURI: "",
};

function displayStorages(results) {
    let length = results.rows.length;
    let lstStorages = $("#lstStorages");
    lstStorages.empty(); //Clean the old data before adding.
    for (let i = 0; i < length; i++) {
        let item = results.rows.item(i);
        let datetimeObj = new Date(item.addingDatetime);
        let imgURI = item.imgURI ? item.imgURI : "";
        elementStorage = `
            <li>
                <a href="#pgDetailStorage">
                    <p>
                        <span class="field">Storage type: </span>
                        <span name="type">${item.storageType}</span>
                    </p>
                    <p>
                        <span class="field">Dimension:</span>
                        <span name="dimension">${item.dimension}</span>
                    </p>
                    <p>
                        <span class="field">Datetime:</span>
                        <span name="datetime">${datetimeObj.getDate()}/${datetimeObj.getMonth() +
            1}/${datetimeObj.getFullYear()}, ${datetimeObj.getHours()}:${datetimeObj.getMinutes()}</span>
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
                    <p name="image" class="ui-hidden-accessible">${imgURI}</p>
                </a>
            </li>
        `;

        lstStorages.append(elementStorage);
    }

    lstStorages.listview("refresh");

    lstStorages.on("vclick", "li", function() {
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
        currentStorage.publicTransport = $(this)
            .find("[name='publicTransport']")
            .text();
        currentStorage.imgURI = $(this)
            .find("[name='image']")
            .text();
    });
}

$(document).on("pagebeforeshow", "#pgDetailStorage", function() {
    let detailStorage = $("#detailStorage");
    detailStorage.empty(); //Clean the old data before
    let imgURI = currentStorage.imgURI
        ? `<img id="detailStorageImage" alt="${currentStorage.imgURI}" src="${
              currentStorage.imgURI
          }" />`
        : "";
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
        <h4>Image:</h4>
        <p>${imgURI}</p>
    `;
    detailStorage.append(elementDetailStorage);
});

function deleteStorage() {
    storageHandler.deleteStorage(
        currentStorage.storageType,
        currentStorage.dimension,
        currentStorage.datetime,
        currentStorage.storageFeature,
        currentStorage.price,
        currentStorage.reporter,
    );
}

function changeToHomePage() {
    $.mobile.changePage("#pgHome", {
        transition: "pop",
        reverse: false,
        changeHash: false,
    });
}

$(document).on("pagebeforeshow", "#pgUpdateStorage", function() {
    let currentPublicTransport = currentStorage.publicTransport.trim();
    $("select#pgUpdatePublicTransport option").attr("selected", false);
    if (currentPublicTransport !== "") {
        $.each(currentPublicTransport.split(","), function(i, v) {
            $("#pgUpdatePublicTransport option[value='" + v.trim() + "']").prop("selected", true);
        });
    }
    $("#pgUpdatePublicTransport").selectmenu("refresh");

    $("#pgUpdateShopDistance").val(currentStorage.shopDistance);
    $("#pgUpdateCondition").val(currentStorage.condition);
    $("#pgUpdateNotes").val(currentStorage.notes);
});

function updateStorage() {
    let newNotes = $("#pgUpdateNotes").val();
    let newCondition = $("#pgUpdateCondition").val();
    let newShopDistance = $("#pgUpdateShopDistance").val();
    let newPublicTransport = $("#pgUpdatePublicTransport").val();
    newPublicTransport = newPublicTransport
        ? newPublicTransport.filter(i => i !== "").join(",")
        : "";
    storageHandler.updateStorage(
        newNotes,
        newCondition,
        newShopDistance,
        newPublicTransport,
        currentStorage.storageType,
        currentStorage.dimension,
        currentStorage.datetime,
        currentStorage.storageFeature,
        currentStorage.price,
        currentStorage.reporter,
    );
}

function activeViewStorageTab() {
    $("#navViewItem").click();
    $("#navViewItem").addClass("ui-btn-active ui-state-persist");
}

function changeToDetailPage(
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
    imgURI,
) {
    currentStorage.storageType = storageType;
    currentStorage.dimension = dimension;
    currentStorage.datetime = addingDatetime;
    currentStorage.storageFeature = storageFeature;
    currentStorage.price = price;
    currentStorage.reporter = reporter;
    currentStorage.notes = notes;
    currentStorage.condition = condition;
    currentStorage.shopDistance = shopDistance;
    currentStorage.publicTransport = publicTransport;
    currentStorage.imgURI = imgURI;

    $.mobile.changePage("#pgDetailStorage", {
        transition: "pop",
        reverse: false,
        changeHash: false,
    });
}
