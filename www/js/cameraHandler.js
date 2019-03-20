let cameraHandler = {
    // Some common settings are 20, 50, and 100
    quality: 100,
    destinationType: Camera.DestinationType.FILE_URI,
    // In this app, dynamically set the picture source, Camera or photo gallery
    sourceType: srcType,
    // JPEG is the recommended encoding type for Android
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE,
    //Corrects Android orientation quirks
    correctOrientation: true,
    setOptions: function(srcType) {
        return {
            quality: this.quality,
            destinationType: this.destinationType,
            sourceType: srcType,
            encoding: this.encodingType,
            mediaType: this.mediaType,
            correctOrientation: true
        };
    },
    openCamera: function() {
        let srcType = Camera.PictureSourceType.CAMERA;
        let options = setOptions(srcType);

        navigator.camera.getPicture(
            function cameraSuccess(imageUri) {
                console.log(imageUri, "openCamera/imageUri");
                displayImage(imageUri);
            },
            function cameraError(error) {
                console.log("Unable to obtain picture: " + error, "app");
            },
            options
        );
    },
    openFilePicker: function() {
        let srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
        let options = setOptions(srcType);

        navigator.camera.getPicture(
            function cameraSuccess(imageUri) {
                console.log(imageUri, "openFilePicker/imageUri");
            },
            function cameraError(error) {
                console.log("Unable to obtain picture: " + error, "app");
            },
            options
        );
    }
};
