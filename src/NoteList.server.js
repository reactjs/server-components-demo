/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {fetch} from 'react-fetch';

export default function NoteList() {
  const notes = fetch('http://localhost:4000/notes').json();

  return notes.length > 0 ? (
    <ul className="notes-list">
      {notes.map((note) => (
        <li key={note.id}>
          <div className="sidebar-note-list-item">
            <header className="sidebar-note-header">
              <strong>{note.title}</strong>
              <small>{note.updated_at}</small>
            </header>
            <button className="sidebar-note-open" />
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className="notes-empty">No notes created yet!</div>
  );
}
