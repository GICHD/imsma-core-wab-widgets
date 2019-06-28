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
  'dojo/on',
  'dijit/form/Select'

],
function (declare, BaseWidgetSetting, On, Select) {
  return declare([BaseWidgetSetting
    // Select
  ], {
    baseClass: 'jimu-widget-demo-setting',

    postCreate: function () {
    },
    startup: function () {
      // the config object is passed in
      this.setConfig(this.config)

      this.inherited(arguments)

      var layers = this.map.graphicsLayerIds
      var map = this.map
      if (layers.length <= 0) {
        console.log('no layers found')
      } else {
        var select = document.getElementById('layerIdselect')
        var layerIdselect2 = document.getElementById('layerIdselect2')

        for (var i = 0; i < layers.length; i++) {
          // TODO: make this layer take the title if available else use the id in dropdown
          if (false) { 
            select.options[select.options.length] = new Option(this.map.getLayer(layers[i]).arcgisProps.title, layers[i])
          } else {
            select.options[select.options.length] = new Option(layers[i], layers[i])
          }

          console.log('loading layer options')
        }
      }
    },

    // getConfig—to return the config data input by the user—and setConfig—to initialize the widget setting page depending on the widget config data.

    setConfig: function (config) {
      this.layerId.value = config.layerId
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
