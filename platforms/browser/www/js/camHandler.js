let cameraHandler = {
    takephoto: () => {
        let opts = {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            encodingType: Camera.EncodingType.JPEG,
            cameraDirection: Camera.Direction.BACK,
            targetWidth: 0,
            targetHeight: 0,
            // correctOrientation: true  //Corrects Android orientation quirks
        };
        navigator.camera.getPicture(
            imgURI => cameraHandler.ftw(imgURI),
            error => cameraHandler.wtf(error),
            opts,
        );
    },
    selectPhoto: () => {
        let opts = {
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            targetWidth: 0,
            targetHeight: 0,
        };
        navigator.camera.getPicture(
            imgURI => cameraHandler.ftw(imgURI),
            error => cameraHandler.wtf(error),
            opts,
        );
    },
    ftw: imgURI => {
        document.getElementById("msgAddImage").textContent = imgURI;
        document.getElementById("photoAddImage").src = imgURI;
    },
    wtf: error => {
        document.getElementById("msgAddImage").textContent = error;
    },
};
