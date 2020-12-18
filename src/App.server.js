/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import NoteList from './NoteList.client';

export default function App() {
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
        <nav>
          <NoteList />
        </nav>
      </section>
      <section className="col note-viewer">
        <div className="note--empty-state">
          <span className="note-text--empty-state">
            We haven't built this yet!
          </span>
        </div>
      </section>
    </div>
  );
}
