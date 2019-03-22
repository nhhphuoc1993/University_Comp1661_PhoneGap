const cameraHandler = {
    setOptions: function(srcType) {
        let options = {
            // Some common settings are 20, 50, and 100
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            // In this app, dynamically set the picture source, Camera or photo gallery
            sourceType: srcType,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            correctOrientation: true, //Corrects Android orientation quirks
        };
        return options;
    },
    takePicture: function() {
        let srcType = Camera.PictureSourceType.CAMERA;
        let options = cameraHandler.setOptions(srcType);
        navigator.camera.getPicture(
            imgUri => cameraHandler.success(imgUri),
            error => cameraHandler.fallure(error),
            options,
        );
    },
    selectPicture: function() {
        let srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
        let options = setOptions(srcType);
        navigator.camera.getPicture(
            imgUri => cameraHandler.success(imgUri),
            error => cameraHandler.fallure(error),
            options,
        );
    },
    success: function(imgUri) {
        alert(imgUri);
        document.getElementById("pgAddBookImagePreview").src = imgUri;
        // $("#pgAddBookImagePreview").attr("src", imgUri);
    },
    fallure: function(error) {
        alert("Unable to obtain picture: " + error, "app");
    },
};
