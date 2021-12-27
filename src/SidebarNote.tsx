/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {format, isToday} from 'date-fns';
// @ts-ignore
import excerpts from 'excerpts';
// @ts-ignore
import marked from 'marked';

import ClientSidebarNote from './SidebarNote.client';
import {Note} from './types';

interface SidebarNoteProps {
  note: Note;
}

const SidebarNote: React.FC<SidebarNoteProps> = ({note}) => {
  const updatedAt = new Date(note.updated_at);
  const lastUpdatedAt = isToday(updatedAt)
    ? format(updatedAt, 'h:mm bb')
    : format(updatedAt, 'M/d/yy');
  const summary = excerpts(marked(note.body), {words: 20});
  return (
    <ClientSidebarNote
      id={note.id}
      title={note.title}
      isFavorite={note.is_favorite}
      expandedChildren={
        <p className="sidebar-note-excerpt">{summary || <i>(No content)</i>}</p>
      }>
      <header className="sidebar-note-header">
        <strong>{note.title}</strong>
        <small>{lastUpdatedAt}</small>
      </header>
    </ClientSidebarNote>
  );
};

export default SidebarNote;
