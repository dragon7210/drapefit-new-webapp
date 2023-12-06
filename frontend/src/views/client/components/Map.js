import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { useMediaQuery, useTheme } from '@mui/material';

import geoUrl from 'assets/map/us-albers.json';

const markers = [
  { markerOffsetY: 8, markerOffsetX: 60, name: 'Houston', coordinates: [-95.369804, 29.760427] },
  { markerOffsetY: -10, markerOffsetX: 0, name: 'Austin', coordinates: [-97.743057, 30.267153] },
  { markerOffsetY: 24, markerOffsetX: 0, name: 'San Antonio', coordinates: [-98.494614, 29.425171] },
  { markerOffsetY: -10, markerOffsetX: 0, name: 'Dallas', coordinates: [-96.796989, 32.776665] },
  { markerOffsetY: -10, markerOffsetX: 0, name: 'Los Angeles', coordinates: [-118.243683, 34.052235] },
  { markerOffsetY: -10, markerOffsetX: 0, name: 'San Francisco', coordinates: [-122.419418, 37.774929] },
  { markerOffsetY: -10, markerOffsetX: 0, name: 'Chicago', coordinates: [-87.629799, 41.878113] },
  { markerOffsetY: -10, markerOffsetX: 0, name: 'New York', coordinates: [-74.005974, 40.712776] },
  { markerOffsetY: -10, markerOffsetX: 0, name: 'Florida', coordinates: [-81.515755, 27.664827] },
  { markerOffsetY: -10, markerOffsetX: 0, name: 'Seattle', coordinates: [-122.332069, 47.606209] }
];

const Map = () => {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <ComposableMap
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [100, -35, 1],
        scale: matchesMD ? 1020 : 700
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} fill="#EAEAEC" stroke="#D6D6DA" />)
        }
      </Geographies>
      {markers.map(({ name, coordinates, markerOffsetY, markerOffsetX }) => (
        <Marker key={name} coordinates={coordinates}>
          <circle r={5} fill="#F00" stroke="#fff" strokeWidth={2} />
          <text
            textAnchor="middle"
            x={markerOffsetX}
            y={markerOffsetY}
            style={{ fontFamily: 'system-ui', fill: '#5D5A6D', fontSize: '20px' }}
          >
            {name}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default Map;
