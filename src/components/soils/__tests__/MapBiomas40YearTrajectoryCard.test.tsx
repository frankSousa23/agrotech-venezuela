import React from 'react';
import { renderToString } from 'react-dom/server';
import MapBiomas40YearTrajectoryCard, { formatRegenerativeLimingBags } from '../MapBiomas40YearTrajectoryCard';

describe('MapBiomas40YearTrajectoryCard & Bag Conversions', () => {
  it('correctly converts metric tons per ha to traditional 50kg bags', () => {
    // 1.5 t/ha -> 1.5 * 20 = 30 bags
    const res1 = formatRegenerativeLimingBags(1.5);
    expect(res1.tons).toBe(1.5);
    expect(res1.bags50kg).toBe(30);
    expect(res1.label).toContain('30 sacos de 50 kg');

    // 2.0 t/ha -> 40 bags
    const res2 = formatRegenerativeLimingBags(2.0);
    expect(res2.bags50kg).toBe(40);
  });

  it('renders 40-year trajectory metadata and regenerative guidance in markup', () => {
    const html = renderToString(
      <MapBiomas40YearTrajectoryCard
        lat={9.324}
        lon={-69.112}
        currentOrganicMatterPct={2.8}
      />
    );

    expect(html).toContain('Memoria Territorial MapBiomas Venezuela (1985–2024)');
    expect(html).toContain('mapbiomas-40year-trajectory-card');
    expect(html).toContain('Cobertura 1985');
    expect(html).toContain('Cobertura Actual');
    expect(html).toContain('Pérdida Estimada de M.O.');
    expect(html).toContain('sacos de 50 kg por hectárea');
    expect(html).toContain('Abono Verde');
  });
});
