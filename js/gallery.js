/*
 * @Author: Shen Huang
 * @Date:   2017-10-05 01:46:08
 * @Last Modified time: 2017-11-11 23:08:54
 */


function openPhotoSwipe() {
    var $pswp = $('.pswp')[0];
    var image = [];
    console.log("sss");
    $('.picture').each(function() {
        var $pic = $(this),
            getItems = function() {
                var items = [];
                $pic.find('a').each(function() {
                    var $href = $(this).attr('href'),
                        $size = $(this).data('size').split('x'),
                        $width = $size[0],
                        $height = $size[1];

                    var item = {
                        src: $href,
                        w: $width,
                        h: $height
                    }

                    items.push(item);
                });
                return items;
            }

        var items = getItems();
        console.log(items);

        $.each(items, function(index, value) {
            image[index] = new Image();
            image[index].src = value['src'];
        });

        $pic.on('click', 'figure', function(event) {
            event.preventDefault();

            var $index = $(this).index();
            var options = {
                index: $index,
                bgOpacity: 0.7,
                showHideOpacity: true
            }

            var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
            lightBox.init();
        });
    });
};


// Initialize Firebase
var config = {
    apiKey: "AIzaSyDmZAYedNvi2RATsx20WYb29OvyUCH-FVw",
    authDomain: "lichamnesia.firebaseapp.com",
    databaseURL: "https://lichamnesia.firebaseio.com",
    projectId: "lichamnesia",
    storageBucket: "lichamnesia.appspot.com",
    messagingSenderId: "997536981175"
};
firebase.initializeApp(config);


var imgslength = 5;
function getImg() {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = firebase.storage();

    // Create a storage reference from our storage service
    var storageRef = storage.ref();

    var item_num = 0;

    // Create a reference to the file we want to download
    for (var _imgid = 1000; _imgid < 1000 + imgslength; _imgid++) {
        var starsRef = storageRef.child('images/Photo_' + _imgid + '.JPG');

        // Get the download URL
        starsRef.getDownloadURL().then(function(url) {
            // Insert url into an <img> tag to "download"
            console.log(url);
            item_num ++;
            var gallery = $('#photo-gallery')[0];
            var newfigure = document.createElement('figure');
            newfigure.setAttribute('itemprop', 'associatedMedia');
            var newa = document.createElement('a');
            // console.log(newa);
            newa.setAttribute('href', url);
            newa.setAttribute('itemprop', 'contentUrl');
            newa.setAttribute('data-size', '1000x667');
            var newimg = document.createElement('img');
            newimg.setAttribute('src', url);
            newimg.setAttribute('height', '400');
            newimg.setAttribute('width', '600');
            newimg.setAttribute('itemprop', 'thumbnail');
            newimg.setAttribute('alt', '');
            newa.appendChild(newimg);
            newfigure.appendChild(newa);
            gallery.appendChild(newfigure);
            console.log(item_num);
            if (item_num >= imgslength) {
                openPhotoSwipe();
            }

        }).catch(function(error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/object_not_found':
                    console.log(error.code);
                    // File doesn't exist
                    break;

                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;

                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
            }
        });
    }
}


$(document).ready(function() {
    getImg();
});


