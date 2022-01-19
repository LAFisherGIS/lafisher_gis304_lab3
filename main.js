import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Projection from 'ol/proj/Projection';
import proj4 from 'proj4';
import {transformExtent} from 'ol/proj';
import {fromLonLat} from 'ol/proj';
import {register} from 'ol/proj/proj4';
import {Style, Fill, Stroke} from 'ol/style';
import Overlay from 'ol/Overlay';

proj4.defs("EPSG:2163","+proj=laea +lat_0=45 +lon_0=-100 +x_0=0 +y_0=0 +a=6370997 +b=6370997 +units=m +no_defs");
register(proj4);

const style1 = new Style({
  fill: new Fill({
    color: "green"
  }),
  stroke: new Stroke({
    stroke: "darkgreen"
  })
});

const style2 = new Style({
  fill: new Fill({
    color: "brown"
  }),
  stroke: new Stroke({
    stroke: "black"
  })
});

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: 'nps-project.json',
      }),
      style: function(feature, resolution) {
        const name = feature.get('UNIT_TYPE').toUpperCase();
        return name < "National Park" ? style1 : style2;
      }
    }),
  ],
  view: new View({
      projection: 'EPSG:2163',
      center: fromLonLat([37,-95], 'EPSG:2163'),
      zoom: 3,
      extent: transformExtent([167.65, 15.56, -65.69, 74.71], 'EPSG:4326', 'EPSG:2163'),
    })
});
