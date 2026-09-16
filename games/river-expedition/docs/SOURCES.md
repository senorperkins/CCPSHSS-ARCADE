# Geography and instructional review

Checked 2026-09-16. Source references are documentation and embedded metadata only; the game never requests them.

- [National Park Service — A Short History of Jamestown](https://www.nps.gov/jame/learn/historyculture/a-short-history-of-jamestown.htm): founding in 1607, location on the James, deep-water access, and the already inhabited Indigenous landscape.
- [National Park Service — The Jamestown Riverfront](https://www.nps.gov/jame/learn/historyculture/new-towne-the-jamestown-riverfront-1630-1690.htm): deep-water port and goods arriving by river.
- [National Park Service — James River Pocket Guide](https://www.nps.gov/cajo/planyourvisit/upload/James-River-Pocket-Guide-508-2.pdf): James/Chesapeake connection, Indigenous history, Jamestown, and travel to the falls near present-day Richmond.
- [Virginia DWR — 2021 Non-Tidal James River Fisheries Management Report](https://dwr.virginia.gov/wp-content/uploads/media/James-River-Non-Tidal-Management-Report-2021.pdf): Richmond's Fall-Line section separates tidal and non-tidal water.
- [VDOE — 2023 History and Social Science Standards](https://www.doe.virginia.gov/teaching-learning-assessment/k-12-standards-instruction/history-and-social-science/standards-of-learning): curriculum framework context. This release targets selected VS.1b/c concepts and Jamestown geography. It does not claim full blueprint coverage or exact substandard completion. The exact linked Word standards/blueprint downloads were inaccessible in this environment during the earlier repository work; final alignment remains subject to teacher review.

Atlas coordinates locate the James mouth/Hampton Roads connection (approximately 36.96 N, 76.30 W), Jamestown (37.209 N, 76.778 W), and Richmond (37.535 N, 77.436 W). The lines joining them indicate itinerary order only, explicitly not river geometry. State outlines are a copy of the existing project's generalized [PublicaMundi US states GeoJSON](https://github.com/PublicaMundi/MappingAPI/blob/master/data/geojson/us-states.json); retain this attribution with the map data. All sprite drawings are original code-authored art.

The supply landing and base camp are fictional instructional destinations. Navigation time, obstacles, forest tiles, channel bends, and the portage trail are compressed game abstractions. The modern expedition is not placed in 1607; Jamestown's founding is a historical discovery, not the expedition's date. The game avoids implying that Virginia was uninhabited before English arrival. Local tidal currents are represented as variable; the upper approach uses a simplified opposing current. It makes no claims about present-day boating safety or the capabilities of all craft.

## Version 0.2 question provenance

Each question now has a stable id, answer key, explanation, source key, review date, and a distinction between source-reviewed content and authored game rules. Sources are embedded metadata only, never runtime requests. The two sets at each stop deliberately connect the trip to docking/camp preparation; fictional locations and simulation behaviors are identified as such.

Additional checks: [USGS Water-Supply Paper 2374](https://pubs.usgs.gov/wsp/wsp2374/pdf/wsp_2374.pdf) describes the Piedmont eastward to the Fall Line and Coastal Plain boundary; [NPS Portage Route](https://www.nps.gov/places/portage-route.htm) explains carrying a boat overland around navigation obstacles. These support the regional/portage questions, without claiming the game's short trail is a real Richmond route.

Design guidance was drawn from the user's [Osorio Systems — Game Design Bible](https://docs.google.com/document/d/1wkYDwqmYhZPBUaaZhxapXS30RxD87fcuafHEaR0UDZ8/edit). See `OSORIO-REVIEW.md` for the concrete implementation decisions. That private document is not bundled in the game.

## Version 0.5 curriculum review

See [CURRICULUM.md](CURRICULUM.md) for the item-by-item 2023 SOL crosswalk and limits of the released-test comparison. This supersedes earlier provisional alignment notes. All questions now assess curriculum content, with four choices and region metadata. They are original practice, not official released items.

Additional source keys:
- nps-site: https://www.nps.gov/jame/learn/historyculture/why-settle-on-jamestown.htm — site advantages and water problems.
- nps-tobacco: https://www.nps.gov/jame/learn/historyculture/tobacco-colonial-cultivation-methods.htm — production, export, demand, harvest risk, labor.
- dcr-regions: https://www.dcr.virginia.gov/recreational-planning/document/srreportjamesriver.pdf — Piedmont, Coastal Plain, and Fall Line; supplemented by the earlier USGS regional review.

Regional map/river questions are informed by VDOE Spring 2014 items 15–18, while current content codes come from the adopted April 2023 standards. No released question text is bundled.
