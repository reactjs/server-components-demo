/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// @ts-ignore
import {Pool} from 'react-pg';
import credentials from '../credentials';
import {DbPool} from './types';

// Don't keep credentials in the source tree in a real app!
export const db = new Pool(credentials) as DbPool;
