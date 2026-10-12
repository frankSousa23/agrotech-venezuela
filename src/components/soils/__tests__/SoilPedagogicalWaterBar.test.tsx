import React from 'react';
import { renderToString } from 'react-dom/server';
import SoilPedagogicalWaterBar, { getWaterZone, calculateDaysOfAutonomy } from '../SoilPedagogicalWaterBar';

describe('SoilPedagogicalWaterBar & Hydrological Comfort Math', () => {
  it('correctly classifies physiological water zones', () => {
    // Franco: wilting=14, critical=20, fieldCapacity=28
    expect(getWaterZone(10, 14, 20, 28).zone).toBe('wilting');
    expect(getWaterZone(14, 14, 20, 28).zone).toBe('wilting');
    expect(getWaterZone(18, 14, 20, 28).zone).toBe('stress');
    expect(getWaterZone(24, 14, 20, 28).zone).toBe('comfort');
    expect(getWaterZone(28, 14, 20, 28).zone).toBe('comfort');
    expect(getWaterZone(35, 14, 20, 28).zone).toBe('saturation');
  });

  it('calculates days of autonomy accurately', () => {
    // 24% moisture, 14% wilting point -> (10/100)*300 = 30mm depth. 30mm / 4.5 = 6.66 -> 6.7 days
    expect(calculateDaysOfAutonomy(24, 14, 4.5)).toBeCloseTo(6.7, 1);
    // At or below wilting point
    expect(calculateDaysOfAutonomy(14, 14, 4.5)).toBe(0);
    expect(calculateDaysOfAutonomy(10, 14, 4.5)).toBe(0);
  });

  it('renders the component markup with vernacular information and days of autonomy', () => {
    const html = renderToString(
      <SoilPedagogicalWaterBar
        texture="franco"
        moisturePct={24}
        fieldCapacity={28}
        wiltingPoint={14}
        criticalThreshold={20}
        saturationTheta={46}
        cropName="Maíz Blanco"
      />
    );

    expect(html).toContain('La Esponja de tu Suelo &amp; Confort Hídrico');
    expect(html).toContain('Confort Radicular Óptimo');
    expect(html).toContain('6.7');
    expect(html).toContain('días de agua útil');
    expect(html).toContain('Suelo Franco');
    expect(html).toContain('soil-pedagogical-water-bar');
  });
});
