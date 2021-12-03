/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {createContext, Dispatch, SetStateAction, useContext} from 'react';
import {ILocation} from './types';

export const LocationContext = createContext<
  (ILocation | Dispatch<SetStateAction<ILocation>>)[]
>([
  {
    selectedId: null,
    isEditing: false,
    searchText: '',
  },
]);
export function useLocation() {
  return useContext(LocationContext);
}
