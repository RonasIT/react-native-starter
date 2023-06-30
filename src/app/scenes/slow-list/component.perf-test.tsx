import React from 'react';
import { measurePerformance } from 'reassure';
import { Component } from './component';

test('Slow list', async () => {
  await measurePerformance(<Component count={200} />);
});
