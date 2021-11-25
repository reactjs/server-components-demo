/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {createRoot} from 'react-dom';
import Root from './Root.client';

const initialCache = new Map();
const root = createRoot(document.getElementById('root'));
root.render(<Root initialCache={initialCache} />);

// Note: in this example, the initial page is rendered on the client.
// However, the intended solution (which isn't built out yet) is to
// have the server send the initial HTML, and hydrate from it.
