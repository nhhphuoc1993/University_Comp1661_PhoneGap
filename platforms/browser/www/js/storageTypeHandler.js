const storageTypeHandler = {
    loadStorageTypes: function(displayStorageTypes) {
        databaseHandler.db.readTransaction(function(tx) {
            tx.executeSql(
                "SELECT * FROM storageType",
                [],
                function(tx, results) {
                    //Do the display
                    displayStorageTypes(results, "pgAddStorageType");
                    displayStorageTypes(results, "pgSearchStorageType");
                },
                function(tx, error) {
                    //TODO: Alert the message to user
                    console.log("Error while selecting the storageTypes" + error.message);
                },
            );
        });
    },
};
