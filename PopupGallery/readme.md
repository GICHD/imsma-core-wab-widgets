# GICHD Gallery

A widget to allow for multiple attachement pictures to be visualised in a popup gallery.  

Aswell as the ArcGIS Web App Builer modules, this widget makes use of JQuery and the [FancyBox Gallery](https://github.com/fancyapps/fancybox). 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)


## Installation

- You can either put it on a web-facing server
- register the URL to the manifest.json in the arcgis portal you want to use the widget
- looking in custom widgets



## Usage
- add the widget to the web application you want to use it
- enable it by clicking the eye icon on the widget list of the webmap
- Customise the settings of the widget to select the layer which has the attachments you want to visualise

- All other customisation settings for the popup are made on the normal interface where you build the web application (unrelated to this widget).

## Old installation way *-ignore-*

files to edit:


### init.js (app level)
add lines ~ 100
	  
      "https://code.jquery.com/jquery-3.3.1.min.js",
      "https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.6/dist/jquery.fancybox.min.css",
      "https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.6/dist/jquery.fancybox.min.js",
	
### index.html 

at the bottom, above other js file imports

    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
      integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>



