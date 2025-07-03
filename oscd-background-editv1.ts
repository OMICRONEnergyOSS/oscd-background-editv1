import { EditEvent } from '@omicronenergy/oscd-api';
import { convertEdit } from '@omicronenergy/oscd-api/utils.js';
import { XMLEditor } from '@omicronenergy/oscd-editor';

class OscdBackgroundEditV1 extends HTMLElement {
  private xmlEditor!: XMLEditor;

  constructor() {
    super();
    document.addEventListener('oscd-edit', (event: Event) => {
      const editV2 = convertEdit((event as EditEvent).detail);

      this.editor.commit(editV2);
    });
  }

  set editor(value: XMLEditor) {
    this.xmlEditor = value;
  }

  get editor(): XMLEditor {
    return this.xmlEditor;
  }
}

export default OscdBackgroundEditV1;
