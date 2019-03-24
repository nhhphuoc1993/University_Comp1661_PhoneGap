const dbName = "Comp_1661";
const dbVersion = "1.0";
const dbDescribe = "Comp 1661 Web SQL Database";
const dbSize = 1 * (1024 * 1024);

const databaseHandler = {
    db: null,
    createDatabase: function() {
        this.db = window.openDatabase(dbName, dbVersion, dbDescribe, dbSize);
        this.db.transaction(
            function(tx) {
                //Run sql here using tx
                tx.executeSql(
                    "CREATE TABLE IF NOT  EXISTS storage(storageType text, dimension real, addingDatetime numeric, storageFeature text, price real, reporter text, notes text, condition text, shopDistance numeric, publicTransport text, imgURI text, PRIMARY KEY (storageType, dimension, addingDatetime, storageFeature, price, reporter))",
                    [],
                    function(tx, results) {},
                    function(tx, error) {
                        console.log("Error while creating the table: " + error.message);
                    },
                );
            },
            function(error) {
                console.log("Transaction error: " + error.message);
            },
            function() {
                console.log("Create or load DB transaction completed successfully");
            },
        );
    },
};
