import {useState, useTransition} from 'react';
import {ILocation} from './types';
// @ts-ignore
import {createFromReadableStream} from 'react-server-dom-webpack';
import {useRefresh} from './Cache.client';
import {useLocation} from './LocationContext.client';

export function useMutation({
  endpoint,
  method,
}: {
  endpoint: string;
  method: string;
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [didError, setDidError] = useState(false);
  const [error, setError] = useState(null);
  if (didError) {
    // Let the nearest error boundary handle errors while saving.
    throw error;
  }

  async function performMutation(
    payload: {title?: string; body?: string; favorite?: boolean},
    requestedLocation: ILocation
  ) {
    setIsSaving(true);
    try {
      const response = await fetch(
        `${endpoint}?location=${encodeURIComponent(
          JSON.stringify(requestedLocation)
        )}`,
        {
          method,
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error(await response.text());
      }
      return response;
    } catch (e) {
      setDidError(true);
      setError(e as any);
    } finally {
      setIsSaving(false);
    }
  }

  return {isSaving, performMutation};
}

export function useNavigation() {
  const refresh = useRefresh();
  const [isNavigating, startNavigating] = useTransition();
  const {location, setLocation} = useLocation();

  function navigate(response: Response) {
    const cacheKey = response.headers.get('X-Location');

    if (!cacheKey) {
      throw new Error('X-Location header is not set');
    }

    const nextLocation = JSON.parse(cacheKey);
    const seededResponse = createFromReadableStream(response.body);
    startNavigating(() => {
      refresh(cacheKey, seededResponse);
      setLocation && setLocation(nextLocation);
    });
  }

  return {isNavigating, location, navigate};
}
