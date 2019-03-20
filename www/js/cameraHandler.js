let cameraHandler = {
    takePhoto: function() {
        let opts = {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            encodingType: Camera.EncodingType.JPEG,
            cameraDirection: Camera.Direction.BACK,
            targetWidth: 0,
            targetHeight: 0
        };
        navigator.camera.getPicture(cameraHandler.ftw, cameraHandler.wtf, opts);
    },
    selectPhoto: function() {
        let opts = {
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            targetWidth: 0,
            targetHeight: 0
        };
        navigator.camera.getPicture(
            (cameraSuccess = imageUri => {
                document.getElementById("photo").src = imageUri;
            }),
            (cameraError = error => {
                alert("Unable to obtain picture: " + error, "app");
            }),
            opts
        );
    },
    ftw: imgURI => {
        document.getElementById("photo").src = imgURI;
    },
    wtf: msg => {}
};
