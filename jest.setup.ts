// Opcional: configurar variables globales o mocks antes de cada test.
// Por ejemplo:
// process.env.DATABASE_URL = "postgresql://root:rootpassword@127.0.0.1:5444/agrotech_db?schema=public"

jest.mock('leaflet', () => ({
  map: jest.fn(() => ({
    setView: jest.fn().mockReturnThis(),
    invalidateSize: jest.fn().mockReturnThis(),
    remove: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    flyTo: jest.fn().mockReturnThis(),
  })),
  tileLayer: jest.fn(() => ({
    addTo: jest.fn(),
  })),
  geoJSON: jest.fn(() => ({
    addTo: jest.fn(),
    bindTooltip: jest.fn().mockReturnThis(),
    on: jest.fn().mockReturnThis(),
  })),
  marker: jest.fn(() => ({
    addTo: jest.fn(),
    bindPopup: jest.fn().mockReturnThis(),
  })),
  icon: jest.fn(),
}));
