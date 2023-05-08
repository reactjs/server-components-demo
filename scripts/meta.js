const path = require('path');

const root = path.resolve(__dirname, '..');

module.exports.clientFiles = [
  path.join(root, 'src/EditButton.js'),
  path.join(root, 'src/NoteEditor.js'),
  path.join(root, 'src/SearchField.js'),
  path.join(root, 'src/SidebarNoteContent.js'),
  path.join(root, 'src/framework/router.js'),
];
