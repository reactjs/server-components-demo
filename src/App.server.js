/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Note from './Note.server';
import NoteList from './NoteList.server';
import EditButton from './EditButton.client';

export default function App({selectedId, isEditing}) {
  return (
    <div className="main">
      <section className="col sidebar">
        <section className="sidebar-header">
          <img
            className="logo"
            src="logo.svg"
            width="22px"
            height="20px"
            alt=""
            role="presentation"
          />
          <strong>React Notes</strong>
        </section>
        <section className="sidebar-menu" role="menubar">
          <form className="search" role="search">
            <label className="offscreen" htmlFor="sidebar-search-input">
              Search for a note by title
            </label>
            <input id="sidebar-search-input" placeholder="Search" />
          </form>
          <EditButton noteId={null}>New</EditButton>
        </section>
        <nav role="navigation">
          <NoteList />
        </nav>
      </section>
      <section key={selectedId} className="col note-viewer">
        <Note selectedId={selectedId} isEditing={isEditing} />
      </section>
    </div>
  );
}
