define(['dojo/_base/declare',
  'jimu/BaseWidget',
  'jimu/loaderplugins/jquery-loader!https://code.jquery.com/jquery-3.4.1.js,https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.js',
  'esri/dijit/Popup', 'esri/dijit/PopupTemplate',
  'dojo/dom-class',
  'dojo/on',
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
  on,
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
      $("div[title|='GICHD Popup Gallery']").hide()

      // load settings
      var LayerToAttachId = this.config.layerId
      console.log('attaching to ', LayerToAttachId)

      // listen for click event to get objectid
      connect.connect(this.map.infoWindow, 'onSetFeatures', function () {
        var featureLayer = this.map.getLayer(LayerToAttachId)
        if (featureLayer && featureLayer.hasAttachments) {
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
            $('.contentPane').append('<div id="initialImageDiv"></div><div id="otherImagesDiv" style="display:none"></div>')
            // count to show only first image in popup for intiial viewing
            i = 0
            infos.forEach(function (photoInfo) {
              if (i === 0) {
                // initialImageDiv append
                $('#initialImageDiv').append('<a data-fancybox="gallery" href="' + photoInfo.url + '"><img src="' + photoInfo.url + '"></a>')
                i = 1
              } else {
                // otherImagesDiv append
                $('#otherImagesDiv').append('<a data-fancybox="gallery" href="' + photoInfo.url + '"><img src="' + photoInfo.url + '"></a>')
              }
            })

            $.fancybox.defaults.thumbs = {
              autoStart: true,
              hideOnClose: true,
              parentEl: '.fancybox-container',
              axis: 'y'
            }
            $.fancybox.defaults.helpers = { 'overlay': null }
            $('.fancybox').fancybox()
          })
        } else {
          console.log('gichdGallery - selected layer not suitable, not loaded')
        }
      })
    }

  })
})
