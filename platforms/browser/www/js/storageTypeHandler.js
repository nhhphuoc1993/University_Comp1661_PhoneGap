const storageTypeHandler = {
    loadStorageTypes: function() {
        databaseHandler.db.readTransaction(function(tx) {
            tx.executeSql(
                "SELECT * FROM storageType",
                [],
                function(tx, results) {
                    //Do the display
                    storageTypeHandler.displayStorageTypes(results, "pgAddStorageType");
                    storageTypeHandler.displayStorageTypes(results, "pgSearchStorageType");
                },
                function(tx, error) {
                    //TODO: Alert the message to user
                    console.log("Error while selecting the storageTypes" + error.message);
                },
            );
        });
    },

    displayStorageTypes: function(results, elementId) {
        let length = results.rows.length;
        let lstStorageTypes = $(`#${elementId}`);
        lstStorageTypes.empty(); //Clean the old data before adding.

        elementStorageType = `<option value="">Choose option</option>`;
        lstStorageTypes.append(elementStorageType);

        for (let i = 0; i < length; i++) {
            let item = results.rows.item(i);
            elementStorageType = `
                <option value="${item.type}">${item.type}</option>
            `;

            lstStorageTypes.append(elementStorageType);
        }

        lstStorageTypes.selectmenu("refresh", true);
    },
};
