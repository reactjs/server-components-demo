/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export default function SidebarNote({children}) {
  return (
    <div className="sidebar-note-list-item">
      {children}
      <button className="sidebar-note-open">Open note for preview</button>
      <button className="sidebar-note-toggle-expand">
        <img src="chevron-up.svg" width="10px" height="10px" alt="Expand" />
      </button>
      <p className="sidebar-note-excerpt">Some excerpt</p>
    </div>
  );
}
