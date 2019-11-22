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
              }, // Before the content of a slide is being loaded
              afterLoad: function () {
                console.log('afterLoad')

                EXIF.getData($('.fancybox-image')[0], function () {
                  var allMetaData = EXIF.getAllTags(this)
                  $('.fancybox-image').attr('class', 'fancybox-image')
                  $('.fancybox-image').addClass('rotate-' + allMetaData.Orientation)

                  console.log('---------------')
                  console.log('orientatation', allMetaData.Orientation)
                  console.log($('.fancybox-image').attr('class'))
                  console.log('------xxx------')
                })
              }, // When the content of a slide is done loading

              beforeShow: function () {
                console.log('beforeshot')
              },

              afterShow: function () {
                console.log('afterShow')
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
