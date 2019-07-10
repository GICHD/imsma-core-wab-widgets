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
  'dojo/_base/lang',
  'dojo/_base/array',
  'dijit/_WidgetsInTemplateMixin',
  'jimu/LayerInfos/LayerInfos',
  'dijit/form/Select'

],
function (declare, BaseWidgetSetting, lang, array, _WidgetsInTemplateMixin, LayerInfos, Select) {
  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin
    // Select
  ], {
    baseClass: 'jimu-widget-popupgallery-setting',

    postCreate: function () {
      this.setConfig(this.config);
    },
    // getConfig—to return the config data input by the user—and setConfig—to initialize the widget setting page depending on the widget config data.

    setConfig: function (config) {

      // this.layerId.value = config.layerId

      // Get all feature layers from the map
      LayerInfos.getInstance(this.map, this.map.itemInfo)
      .then(lang.hitch(this, function(layerInfosObj) {
        var infos = layerInfosObj.getLayerInfoArray();
        var options = [];
        array.forEach(infos, function(info) {
          if(info.originOperLayer.layerType === 'ArcGISFeatureLayer' && info.originOperLayer.layerObject.hasAttachments) { 
            options.push({
              label: info.title,
              value: info.id
            });

            // TODO - handle no layers on map. Give users an error nothing to
            // seelect. 
          }
        });
        this.layerId.set('options', options);
		if(options.length < 1) {
          this.unsuitableLayerWarning.innerHTML = 'current webmap does not contain any suitable layers with attachments';
          this.layerId.setDisabled(true) // disable dropdown fr selecting layers for widget

        }

    }));
  },

    getConfig: function () {
      // WAB will get config object through this method
      return {
        layerId: this.layerId.value
        // configText: "configtests"
      }
    }
  })
})
