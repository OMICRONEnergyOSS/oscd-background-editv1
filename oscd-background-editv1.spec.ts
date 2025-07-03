import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import OscdMenuOpen from './oscd-background-editv1.js';
import OscdBackgroundEditV1 from './oscd-background-editv1.js';
import { XMLEditor } from '@omicronenergy/oscd-editor';
import { isEdit, isEditV2 } from '@omicronenergy/oscd-api/utils.js';

const doc = new DOMParser().parseFromString(
  '<SCL><Substation name="AA1"></Substation></SCL>',
  'application/xml',
);

customElements.define('oscd-background-editv1', OscdMenuOpen);

describe('oscd-background-editv1', () => {
  let plugin: OscdBackgroundEditV1;

  let xmlEditorCommit: SinonSpy;

  beforeEach(async () => {
    xmlEditorCommit = spy();

    plugin = await fixture(
      html`<oscd-background-editv1></oscd-background-editv1>`,
    );
    plugin.editor = {
      commit: xmlEditorCommit,
    } as unknown as XMLEditor;
    document.body.append(plugin);

    plugin.click();
  });

  afterEach(() => plugin.remove());

  it('It calls XMLEditor.commit when an oscd-edit event is recieved', async () => {
    const editV1 = {
      element: doc.querySelector('Substation')!,
      attributes: {
        attr1: {
          value: 'value1',
          namespaceURI: 'http://www.example.com/ns',
        },
      },
    };
    expect(editV1).to.satisfy(isEdit);
    document.dispatchEvent(
      new CustomEvent('oscd-edit', {
        detail: editV1,
      }),
    );
    expect(xmlEditorCommit.callCount).to.equal(1);
    const [editV2] = xmlEditorCommit.args;
    expect(editV2).to.satisfy(isEditV2);
  });
});
