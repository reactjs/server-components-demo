/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useState, Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';

import {useServerResponse} from './Cache.client';
import {LocationContext} from './LocationContext.client';
import {ILocation} from './types';

const Root = () => {
  return (
    <Suspense fallback={null}>
      <ErrorBoundary FallbackComponent={Error}>
        <Content />
      </ErrorBoundary>
    </Suspense>
  );
}

const Content = () => {
  const [location, setLocation] = useState<ILocation>({
    selectedId: null,
    isEditing: false,
    searchText: '',
  });
  const response = useServerResponse(location);
  return (
    <LocationContext.Provider value={[location, setLocation]}>
      {response.readRoot()}
    </LocationContext.Provider>
  );
}

interface ErrorProps {
  error: Error;
}

const Error: React.FC<ErrorProps> = ({error}) => {
  return (
    <div>
      <h1>Application Error</h1>
      <pre style={{whiteSpace: 'pre-wrap'}}>{error.stack}</pre>
    </div>
  );
}

export default Root;