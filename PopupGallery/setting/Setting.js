/// ////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/// ////////////////////////////////////////////////////////////////////////

define([
  'dojo/_base/declare',
  'jimu/BaseWidgetSetting',

  'dijit/form/MultiSelect', 'dojo/dom', 'dojo/_base/window', 'dojo/dom-construct', 'dijit/form/Button',

  'dojo/_base/lang',
  'dojo/_base/array',
  'dijit/_WidgetsInTemplateMixin',
  'jimu/LayerInfos/LayerInfos',
  'dijit/form/Select'

],
function (declare, BaseWidgetSetting, MultiSelect, dom, win, domConstruct, Button, lang, array, _WidgetsInTemplateMixin, LayerInfos, Select) {
  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin
    // Select
  ], {
    baseClass: 'jimu-widget-popupgallery-setting',

    postCreate: function () {
      this.setConfig(this.config)
    },
    // getConfig—to return the config data input by the user—and setConfig—to initialize the widget setting page depending on the widget config data.

    setConfig: function (config) {
      // this.layerId.value = config.layerId
      WTFBBQ = null,
      // Get all feature layers from the map
      LayerInfos.getInstance(this.map, this.map.itemInfo)
        .then(lang.hitch(this, function (layerInfosObj) {
          var infos = layerInfosObj.getLayerInfoArray()

          var options = []

          array.forEach(infos, function (info) {
            if (info.originOperLayer.layerType === 'ArcGISFeatureLayer' && info.originOperLayer.layerObject.hasAttachments) {
              options.push({
                label: info.title,
                value: info.id
              })
            }
          })
          this.layerId.set('options', options)

          console.log(options)
          for (i in options) {
            var opData = domConstruct.create('option')
            opData.innerHTML = options[i]['label']
            opData.value = options[i]['value']
            this.activitiesNode.appendChild(opData)
          }
          new MultiSelect({
            onClick: function () {
              WTFBBQ = this.value
            },
            name: 'activitiesMultiS',
            id: 'activitiesMultiS',
            style: 'width:100%;height:100px'
          }, this.activitiesNode).startup()

          console.log('sel is', this.activitiesNode)
          if (options.length < 1) {
            this.unsuitableLayerWarning.innerHTML = 'Current webmap does not contain any suitable layers with attachments.'
            this.layerId.setDisabled(true) // disable dropdown fr selecting layers for widget
            //  this.activitiesMultiS.setDisabled(true) // disable dropdown fr selecting layers for widget
            //TODO Add warning for no layers selected
          }
        }))
    },

    getConfig: function () {
      // WAB will get config object through this method
      return {
        layerId: this.layerId.value,
        layerIds: WTFBBQ,
        popupLocation: this.popupLocation.value
      }
    }
  })
})
