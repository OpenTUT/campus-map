import { Feature, Map, View } from 'ol';
import { Point } from 'ol/geom';
import { Tile } from 'ol/layer';
import VectorLayer from 'ol/layer/Vector';
import { transform } from 'ol/proj';
import { OSM } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { useMemo, useState } from 'react';
import json from './assets/map.json';
import { OlFeature } from './components/OlFeature';
import { OlLayer } from './components/OlLayer';
import { OlMap } from './components/OlMap';
import { type Building, SearchBar } from './components/SearchBar';

function App() {
  const [building, setBuilding] = useState<Building | null>(null);
  const [buildings, _] = useState<Building[]>(json.buildings);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // map.on("click", (event) => {
  //   const coordinates = event.coordinate;
  //   const point = new Point(coordinates).transform("EPSG:3857", "EPSG:4326");
  //   console.log(point.getFlatCoordinates());
  // });

  const olMapMemo = useMemo(
    () => (
      <OlMap
        builder={() =>
          new Map({
            view: new View({
              center: transform([137.408, 34.7016], 'EPSG:4326', 'EPSG:3857'),
              zoom: 17, //ズームレベル
              minZoom: 16, //最小ズームレベル
              maxZoom: 19,
            }),
          })
        }
        onClick={() => {
          // alert("feature以外をクリック");
        }}
      >
        <OlLayer builder={() => new Tile({ source: new OSM() })} />
        <OlLayer
          builder={() => new VectorLayer({ source: new VectorSource() })}
        >
          {buildings.map((building) => (
            <OlFeature
              key={building.name}
              builder={() =>
                new Feature({
                  geometry: new Point([
                    building.position.x,
                    building.position.y,
                  ]).transform('EPSG:4326', 'EPSG:3857'),
                  name: building.name,
                })
              }
              onClick={() => {
                setIsPanelOpen(true);
                setBuilding(building);
              }}
            />
          ))}
        </OlLayer>
      </OlMap>
    ),
    [buildings],
  );

  return (
    <div
      style={{
        position: 'relative',
        height: '100dvh', // `h-dvh`はブラウザの100%の動的ビューポート高さ
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        <SearchBar
          onSelect={(e) => {
            setBuilding(e);
          }}
        />
      </div>
      <div
        style={{
          position: 'relative',
          height: '100%',
        }}
      >
        {olMapMemo}
      </div>
      {isPanelOpen && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '33.3333%',
            backgroundColor: '#ffffff',
            boxShadow:
              '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            zIndex: 20,
            padding: '1rem',
            overflowY: 'auto',
          }}
        >
          <h2
            style={{
              fontSize: '1.25rem', // text-xl
              fontWeight: 'bold', // font-bold
              marginBottom: '1rem', // mb-4
            }}
          >
            {building?.name}
          </h2>
          <p>{building?.description}</p>
          <button
            type="button"
            onClick={() => setIsPanelOpen(false)}
            style={{
              marginTop: '1rem', // mt-4
              padding: '0.5rem', // p-2
              backgroundColor: '#ef4444', // bg-red-500
              color: '#ffffff', // text-white
              borderRadius: '0.25rem', // rounded
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
