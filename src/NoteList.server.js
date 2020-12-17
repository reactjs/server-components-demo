/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {fetch} from 'react-fetch';

import {db} from './db.server';
import SidebarNote from './SidebarNote';

export default function NoteList({searchText}) {
  // WARNING: This is for demo purposes only.
  // We don't encourage this in real apps. There are far safer ways to access
  // data in a real application!
  const notes = db.query(
    `SELECT * FROM notes WHERE title ilike $1 order by updated_at desc`,
    ['%' + searchText + '%']
  ).rows;

  return notes.length > 0 ? (
    <ul className="notes-list">
      {notes.map((note) => (
        <li key={note.id}>
          <SidebarNote note={note} />
        </li>
      ))}
    </ul>
  ) : (
    <div className="notes-empty">No notes created yet!</div>
  );
}
