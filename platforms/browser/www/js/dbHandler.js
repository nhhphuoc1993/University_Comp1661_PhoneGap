const dbName = "Comp_1661";
const dbVersion = "1.0";
const dbDescribe = "Comp 1661 Web SQL Database";
const dbSize = 1 * (1024 * 1024);

const databaseHandler = {
    db: null,
    createLoadDatabase: function() {
        this.db = window.openDatabase(dbName, dbVersion, dbDescribe, dbSize);
    },
    createTables: function() {
        this.db.transaction(
            function(tx) {
                //Run sql here using tx
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS storage(storageType text, dimension real, addingDatetime text, storageFeature text, price real, reporter text, notes text, condition text, shopDistance numeric, publicTransport text, imgURI text, PRIMARY KEY (storageType, dimension, storageFeature, price, reporter))",
                    [],
                    function(tx, results) {},
                    function(tx, error) {
                        console.log("Error while creating storage table: " + error.message);
                    },
                );
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS storageType (type text, description text, PRIMARY KEY (type))",
                    [],
                    function(tx, results) {},
                    function(tx, error) {
                        console.log("Error while creating type table : " + error.message);
                    },
                );
            },
            function(error) {
                console.log("Transaction error: " + error.message);
            },
            function() {
                console.log("Create or load DB transaction completed successfully");

                databaseHandler.initialInsert();
            },
        );
    },
    initialInsert: function() {
        storageTypes = [
            {
                type: "Home",
                description: "Home description",
            },
            {
                type: "Business",
                description: "Business description",
            },
        ];
        for (var t = 0; t < storageTypes.length; t++) {
            (function(i) {
                let item = storageTypes[i];
                let item_type = item.type;
                let item_description = item.description;
                databaseHandler.db.transaction(function(tx) {
                    var insertStatement = "INSERT INTO storageType (type, description) VALUES(?,?)";
                    tx.executeSql(
                        insertStatement,
                        [item_type, item_description],
                        function(tx, results) {},
                        function(tx, error) {
                            console.log(
                                "Error while inserting into storageType table : " + error.message,
                            );
                        },
                    );
                });
            })(t);
        }
    },
};
