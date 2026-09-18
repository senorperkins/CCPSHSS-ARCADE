# Lower James atlas — 0.11

The atlas now draws geographic river geometry instead of straight connections between stops. It covers the lower James from above Richmond to the Chesapeake. Compact labeled dots have 44px touch targets, keyboard focus, current-stop flags, and click/tap facts. Undiscovered stop labels remain hidden.

## Geographic sources

Bundled `content/hydrography.json` contains simplified, WGS84 geometry downloaded September 16, 2026:

- USGS National Hydrography Dataset, public NOAA-hosted copies for HUC8 02080205 and 02080206. Layer 3, filtered to `gnis_name = 'James River'`, supplies 375 flowline segments; layer 16 of 02080206 supplies 332 water-area polygons. Query simplification: 0.0008 degrees for lines and 0.0015 for areas; neither response exceeded the transfer limit.
  - https://services2.arcgis.com/C8EMgrsFcRFL6LrL/arcgis/rest/services/NHD_H_02080205_HU8_Shape/FeatureServer
  - https://services2.arcgis.com/C8EMgrsFcRFL6LrL/arcgis/rest/services/NHD_H_02080206_HU8_Shape/FeatureServer
- Natural Earth public-domain 1:10m land polygons, clipped to the displayed region and rounded to four decimal places: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_10m_land.geojson

Projection uses approximately equal ground scale around latitude 37.5° (longitude scaled by cosine of latitude). The 20 km scale is approximate. Line width is exaggerated for readability; shoreline and hydrography have different source scales. This is a classroom reference, not a navigation chart. Fictional supply/camp locations retain schematics and are not assigned fabricated geographic pins. This map covers the expedition corridor, not every Virginia river.

The exporter embeds these local data directly; no network connection or map service is used by students. Edit geography in source JSON and run `npm run build:river` to rebuild.

## Verification

Fourteen model/content checks passed. Offline Chrome desktop and touch integration passed all 40 question interactions, discovery locks, reference-return state, fact interactions, steering, damage, recovery, and replay. No JavaScript errors or HTTP requests. Desktop docking-map screenshot inspected for river shape, flag placement, and unobstructed labels. Evidence: `v11-dock-map.png` and `browser-results.json`.
