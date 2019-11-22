define(['dojo/_base/declare',
  'jimu/BaseWidget',
  'jimu/loaderplugins/jquery-loader!https://code.jquery.com/jquery-3.4.1.js,https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.js,https://cdn.jsdelivr.net/npm/exif-js',
  'esri/dijit/Popup', 'esri/dijit/PopupTemplate',
  'dojo/dom-class',
  'dojo/on',  'dojo/_base/array',

  'dojo/_base/connect',
  'esri/domUtils',
  'dojo/date/locale',
  'dojo/_base/array',
  'esri/tasks/query',
  'esri/layers/FeatureLayer'
],
function (declare, BaseWidget, $,
  Popup,
  PopupTemplate,
  domClass,
  on,array,
  connect,
  domUtils,
  locale,
  array,
  Query,
  FeatureLayer) {
  return declare(BaseWidget, {

    startup: function () {
      console.log('starting gallery')
      this.inherited(arguments)
      
      // hide widget button
      $("div[title|='" + this.label + "']").hide()
      const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }
      // load settings
      var LayerToAttachId = this.config.layerId
      var services = this.config.layerIds
        var popupLocation = this.config.popupLocation
      console.log(services)
      console.log(this.config)
      // listen for click event to get objectid
      connect.connect(this.map.infoWindow, 'onSetFeatures', function () {
      //  for (var LayerToAttachId in services) {

      //TODO if not null...
        for (let LayerToAttachId of Object.values(services)) {

var featureLayer = this.map.getLayer(LayerToAttachId)
        if (featureLayer && featureLayer.hasAttachments) {
           console.log('attaching:',LayerToAttachId)
          var attributeData = this.map.infoWindow.getSelectedFeature()
          var fieldlist = featureLayer.fields

          for (var i = 0; fieldlist.length; i++) { // TODO make this use number of fields
            if (fieldlist[i].type === 'esriFieldTypeOID') {
              var idfield = fieldlist[i].name
              // attributeData.attributes.fid
              console.log(fieldlist[i])
              break
            } else {
              console.log('no suitable id found, trying objectid')
              // TODO: idfield = 'objectid';
            }
          }

          featureLayer.queryAttachmentInfos(attributeData.attributes[idfield], function (infos) {
            console.log('querying for image attachments')
            // preparing div for fancybox
            console.log("wtfbbq",popupLocation)
            if (popupLocation == 1) {
              $('.contentPane').prepend('<div id="initialImageDiv">No attachments found</div><div id="otherImagesDiv" style="display:none"></div>')
            } else {
              $('.contentPane').append('<div id="initialImageDiv">No attachments found</div><div id="otherImagesDiv" style="display:none"></div>')
            }

            i = 0
            infos.forEach(function (photoInfo) {
              if (i === 0) {
                // initialImageDiv append
                $('#initialImageDiv').html('')

                $('#initialImageDiv').append('<a data-fancybox="gallery" href="' + photoInfo.url + '"><img src="' + photoInfo.url + '"></a>')
                i = 1
              } else {
                // otherImagesDiv append
                $('#otherImagesDiv').append('<a data-fancybox="gallery" href="' + photoInfo.url + '"><img src="' + photoInfo.url + '"></a>')
              }
            })

            $.fancybox.defaults.hash = false

            $('[data-fancybox="gallery"]').fancybox({

              beforeLoad: function () {
                console.log('beforeLoad')
                $('.fancybox-slide--current.fancybox-slide > div > img').addClass('image-hide-temp')
              }, // Before the content of a slide is being loaded

              afterLoad: function (instance, current) {

              }, // When the content of a slide is done loading

              beforeShow: function (instance, current) {
                console.log('beforeshow')

                if ($('.fancybox-toolbar').find('#rotate_button').length === 0) {
                  $('.fancybox-toolbar').prepend('<button id="rotate_button" class="fancybox-button" title="Rotate Image"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M20 29v-9h1v6.88l1.566-1.076a12.5 12.5 0 1 0-13.923.14l-.716.715A13.494 13.494 0 1 1 29 15.5a13.398 13.398 0 0 1-5.3 10.706L21.36 28H29v1zm-3-15v3h-3v-3zm-1 1h-1v1h1z"/></svg></button>');
                }
                var click = 1;
                $('.fancybox-toolbar').on('click', '#rotate_button', function () {
                  console.log("rotating")
                  var n = 90 * ++click;
                  $('.fancybox-slide--current.fancybox-slide > div > img').css('webkitTransform', 'rotate(-' + n + 'deg)');
                  $('.fancybox-slide--current.fancybox-slide > div > img').css('mozTransform', 'rotate(-' + n + 'deg)');
                });
              },

              afterShow: function (instance, current) {
                console.log('afterShow')
/*
                EXIF.getData($('.fancybox-image')[0], function () {
                  // EXIF.getData($('.fancybox-slide--current'), function () {// ??
                  var allMetaData = EXIF.getTag(this, 'Orientation')

                  $('.fancybox-slide--current.fancybox-slide > div > img').removeClass('rotate-1 rotate-3 rotate-6 rotate-8')
                  $('.fancybox-slide--current.fancybox-slide > div > img').addClass('rotate-' + allMetaData)

                  console.log('---------------')
                  console.log('orientatation', allMetaData)
                  console.log('------xxx------')
                })

                sleep(1000).then(() => {
                  console.log('yo')
                  $('.fancybox-slide--current.fancybox-slide > div > img').removeClass('image-hide-temp')
                })

                */
              }, // When content is done loading and animating
              beforeClose: function () {
                console.log('beforeClose')
              }, // Before the instance attempts to close. Return false to cancel the close.
              afterClose: function () {
                console.log('afterClose')
              }, // After instance has been closed
              onActivate: function () {
                console.log('onActivate')
              }, // When instance is brought to front
              onDeactivate: function () {
                console.log('console')
              } // When other instance has been activated
            })
            // ready            
          })
        } else {
          console.log('PopupGallery - selected layer not suitable, not loaded')
        }





         }

        
      })
    }

  })
})
