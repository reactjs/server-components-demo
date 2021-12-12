/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import TextWithMarkdown from './TextWithMarkdown';

interface NotePreviewProps {
  body: string;
}

const NotePreview: React.FC<NotePreviewProps> = ({body}) => {
  return (
    <div className="note-preview">
      <TextWithMarkdown text={body} />
    </div>
  );
};

export default NotePreview;
