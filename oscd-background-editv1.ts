import { EditEvent } from '@omicronenergy/oscd-api';
import { convertEdit } from '@omicronenergy/oscd-api/utils.js';
import { XMLEditor } from '@omicronenergy/oscd-editor';

export default class OscdBackgroundEditV1 extends HTMLElement {
  editor!: XMLEditor;

  constructor() {
    super();
    document.addEventListener('oscd-edit', (event: Event) => {
      const editV2 = convertEdit((event as EditEvent).detail);
      this.editor.commit(editV2);
    });
  }
}
