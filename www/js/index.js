document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // Now safe to use device APIs
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

let searchingStorage = {
    storageType: "",
    dimensionFrom: -1,
    dimensionTo: -1,
    dateFrom: "",
    dateTo: "",
    storageFeature: "",
    priceFrom: -1,
    priceTo: -1,
    reporter: "",
};

$(document).on("pagebeforeshow", "#pgHome", function() {
    databaseHandler.createLoadDatabase();

    storageHandler.loadStorages(displayStorages);
    storageHandler.getMaxPrice();
    storageHandler.getMaxDimension();
    storageTypeHandler.loadStorageTypes();

    activeViewStorageTab();

    $("#btnAddImage").on("vclick", function() {
        event.preventDefault();
        cameraHandler.takephoto();
        // cameraHandler.ftw("img/d.jpg");
    });

    $("#btnAddImageFromGallery").on("vclick", function() {
        event.preventDefault();
        cameraHandler.selectPhoto();
        // cameraHandler.ftw("img/c.jpg");
    });
});

$(document).on("pagebeforeshow", "#pgDetailStorage", function() {
    let detailStorage = $("#detailStorage");
    detailStorage.empty(); //Clean the old data before

    let width = window.innerWidth > 0 ? window.innerWidth : screen.width;

    let imgURI = currentStorage.imgURI
        ? `<img id="detailStorageImage" alt="${currentStorage.imgURI}" src="${
              currentStorage.imgURI
          }" style="width: ${width / 2}px; height: auto;" />`
        : "";

    elementDetailStorage = `
        <h4>Storage type</h4>
        <p>${currentStorage.storageType}</p>
        <h4>Dimension (m<sup>2</sup>)</h4>
        <p>${currentStorage.dimension}</p>
        <h4>Date and time</h4>
        <p>${currentStorage.datetime}</p>
        <h4>Feature</h4>
        <p>${currentStorage.storageFeature}</p>
        <h4>Price</h4>
        <p>${currentStorage.price}</p>
        <h4>Reporter</h4>
        <p>${currentStorage.reporter}</p>
        <h4>Condition</h4>
        <p>${currentStorage.condition}</p>
        <h4>Distance to shops (m)</h4>
        <p>${currentStorage.shopDistance}</p>
        <h4>Public transportation</h4>
        <p>${currentStorage.publicTransport}</p>
        <h4>Notes</h4>
        <p id="detailStorageNotes">${currentStorage.notes}</p>
        <h4>Image</h4>
        <div style="text-align: center;">${imgURI}</div>
    `;
    detailStorage.append(elementDetailStorage);
});

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

function searchStorage() {
    let searchStorageType = $("#pgSearchStorageType").val();
    let searchDimensionFrom = $("#pgSearchDimensionFrom").val();
    let searchDimensionTo = $("#pgSearchDimensionTo").val();
    let searchDateFrom = $("#pgSearchDateFrom").val();
    let searchDateTo = $("#pgSearchDateTo").val();
    let searchStorageFeature = $("#pgSearchStorageFeature")
        .val()
        .trim();
    let searchPriceFrom = $("#pgSearchPriceFrom").val();
    let searchPriceTo = $("#pgSearchPriceTo").val();
    let searchReporter = $("#pgSearchReporter")
        .val()
        .trim();

    searchingStorage.storageType = searchStorageType;
    searchingStorage.dimensionFrom = searchDimensionFrom;
    searchingStorage.dimensionTo = searchDimensionTo;
    searchingStorage.dateFrom = searchDateFrom;
    searchingStorage.dateTo = searchDateTo;
    searchingStorage.storageFeature = searchStorageFeature;
    searchingStorage.priceFrom = searchPriceFrom;
    searchingStorage.priceTo = searchPriceTo;
    searchingStorage.reporter = searchReporter;

    storageHandler.loadSpecificStorages(
        displayStorages,
        searchStorageType,
        searchDimensionFrom,
        searchDimensionTo,
        searchDateFrom,
        searchDateTo,
        searchStorageFeature,
        searchPriceFrom,
        searchPriceTo,
        searchReporter,
    );
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
    let imgURI = $("#pgAddImgURI").text();
    let isAddStorage = validator.validateAddStorageForm(
        storageType,
        dimension,
        addingDatetime,
        storageFeature,
        price,
        reporter,
    );

    if (isAddStorage === true) {
        addingDatetime = addingDatetime + getTimeZoneOffset();
        publicTransport = publicTransport ? publicTransport.filter(i => i !== "").join(",") : "";

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
            imgURI,
        );
    } else {
        event.preventDefault();
    }
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

function displayStorages(results) {
    let length = results.rows.length;
    let lstStorages = $("#lstStorages");
    lstStorages.empty(); //Clean the old data before adding.
    for (let i = 0; i < length; i++) {
        let item = results.rows.item(i);
        let imgURI = item.imgURI ? item.imgURI : "";
        elementStorage = `
            <li>
                <a href="#pgDetailStorage">
                    <p>
                        <span class="field">Storage type: </span>
                        <span name="type">${item.storageType}</span>
                    </p>
                    <p>
                        <span class="field">Dimension (m<sup>2</sup>): </span>
                        <span name="dimension">${item.dimension}</span>
                    </p>
                    <p>
                        <span class="field">Datetime:</span>
                        <span name="datetime">${item.addingDatetime}</span>
                    </p>
                    <p>
                        <span class="field">Feature:</span>
                        <span name="feature">${item.storageFeature}</span>
                    </p>
                    <p>
                        <span class="field">Price ($):</span>
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
        currentStorage.imgURI = $(this)
            .find("[name='image']")
            .text();
    });
}

function deleteStorage() {
    storageHandler.deleteStorage(
        currentStorage.storageType,
        currentStorage.dimension,
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
        currentStorage.imgURI,
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

function getTimeZoneOffset() {
    var timezone_offset_min = new Date().getTimezoneOffset(),
        offset_hrs = parseInt(Math.abs(timezone_offset_min / 60)),
        offset_min = Math.abs(timezone_offset_min % 60),
        timezone_standard;

    if (offset_hrs < 10) offset_hrs = "0" + offset_hrs;

    if (offset_min < 10) offset_min = "0" + offset_min;

    // Add an opposite sign to the offset
    // If offset is 0, it means timezone is UTC
    if (timezone_offset_min < 0) timezone_standard = "+" + offset_hrs + ":" + offset_min;
    else if (timezone_offset_min > 0) timezone_standard = "-" + offset_hrs + ":" + offset_min;
    else if (timezone_offset_min == 0) timezone_standard = "Z";
    return timezone_standard;
}
