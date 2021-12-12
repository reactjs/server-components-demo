/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useState, useTransition} from 'react';
// @ts-ignore
import {createFromReadableStream} from 'react-server-dom-webpack';

import NotePreview from './NotePreview';
import {useRefresh} from './Cache.client';
import {useLocation} from './LocationContext.client';
import {ILocation} from './types';

interface NoteEditorProps {
  noteId: number | null;
  initialTitle: string;
  initialBody: string;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  noteId,
  initialTitle,
  initialBody,
}) => {
  const refresh = useRefresh();
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const {location, setLocation} = useLocation();
  const [isNavigating, startNavigating] = useTransition();
  const {isSaving, performMutation: saveNote} = useMutation({
    endpoint: noteId !== null ? `/notes/${noteId}` : `/notes`,
    method: noteId !== null ? 'PUT' : 'POST',
  });
  const {isSaving: isDeleting, performMutation: deleteNote} = useMutation({
    endpoint: `/notes/${noteId}`,
    method: 'DELETE',
  });

  async function handleSave() {
    const payload = {title, body};
    const requestedLocation = {
      selectedId: noteId,
      isEditing: false,
      searchText: location.searchText,
    };
    const response = await saveNote(payload, requestedLocation);

    if (!response) {
      throw new Error(`Something went wrong when saving note ${noteId}`);
    }

    navigate(response);
  }

  async function handleDelete() {
    const payload = {};
    const requestedLocation = {
      selectedId: null,
      isEditing: false,
      searchText: location.searchText,
    };
    const response = await deleteNote(payload, requestedLocation);

    if (!response) {
      throw new Error(`Something went wrong when deleting note ${noteId}`);
    }

    navigate(response);
  }

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

  const isDraft = noteId === null;
  return (
    <div className="note-editor">
      <form
        className="note-editor-form"
        autoComplete="off"
        onSubmit={(e) => e.preventDefault()}>
        <label className="offscreen" htmlFor="note-title-input">
          Enter a title for your note
        </label>
        <input
          id="note-title-input"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label className="offscreen" htmlFor="note-body-input">
          Enter the body for your note
        </label>
        <textarea
          id="note-body-input"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
      </form>
      <div className="note-editor-preview">
        <div className="note-editor-menu" role="menubar">
          <button
            className="note-editor-done"
            disabled={isSaving || isNavigating}
            onClick={() => handleSave()}
            role="menuitem">
            <img
              src="checkmark.svg"
              width="14px"
              height="10px"
              alt=""
              role="presentation"
            />
            Done
          </button>
          {!isDraft && (
            <button
              className="note-editor-delete"
              disabled={isDeleting || isNavigating}
              onClick={() => handleDelete()}
              role="menuitem">
              <img
                src="cross.svg"
                width="10px"
                height="10px"
                alt=""
                role="presentation"
              />
              Delete
            </button>
          )}
        </div>
        <div className="label label--preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview body={body} />
      </div>
    </div>
  );
};

function useMutation({endpoint, method}: {endpoint: string; method: string}) {
  const [isSaving, setIsSaving] = useState(false);
  const [didError, setDidError] = useState(false);
  const [error, setError] = useState(null);
  if (didError) {
    // Let the nearest error boundary handle errors while saving.
    throw error;
  }

  async function performMutation(
    payload: {title?: string; body?: string},
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

export default NoteEditor;
