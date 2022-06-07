import { createEntityAdapter } from '@reduxjs/toolkit';
import { BaseEntityPlain } from '../models';

export const entityAdapter = createEntityAdapter<BaseEntityPlain>();

export const entityAdapterSelectors = entityAdapter.getSelectors();
