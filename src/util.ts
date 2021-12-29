import {useState} from 'react';
import {ILocation} from './types';

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
