# GGR472 Lab 3

This repo contains code for an interactive web map of Mumbai's points of interest and tourism routes, as required by Lab 3.

Link: https://rohanh03.github.io/GGR472-lab-3/

## Repo Table of Contents

**/data**: Contains `mumbai-poi.geojson` — a reference GeoJSON file of all 20 Mumbai POIs. Not loaded by the map directly; the active dataset is `mumbai-poi.js`.

**mumbai-poi.js**: JavaScript file declaring `POI_DATA`, a GeoJSON FeatureCollection of 10 Mumbai points of interest (2 per category: Heritage, Market, Nature, Beach, Temple). Loaded via `<script>` tag before `script.js` so `POI_DATA` is available globally.

**index.html**: HTML file to render the webmap with Mapbox GL JS. Contains the map container div, a combined filter panel and legend (with category checkboxes and route checkboxes), and script tags loading `mumbai-poi.js` and `script.js`.

**script.js**: JavaScript file that initializes the map centered on Mumbai, adds four route line layers from published Lab 2 GeoJSON URLs, adds a classified POI circle layer coloured by category, shows a popup on click with POI name, category badge, and description, enlarges circles on hover, and builds the filter panel.

**style.css**: CSS file that creates the map container, styles the fixed filter panel overlay, and styles popup badge elements.
