import { createEntityAdapter } from '@reduxjs/toolkit';
import { BaseEntityPlain } from '../models';
import { Entities } from '../config';

export const entityAdapter = createEntityAdapter<BaseEntityPlain & Partial<Entities[keyof Entities]>>();

export const entityAdapterSelectors = entityAdapter.getSelectors();
