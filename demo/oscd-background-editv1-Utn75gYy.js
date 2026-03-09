function isRemove(edit) {
    return (edit.parent === undefined &&
        edit.node instanceof Node);
}
function isInsert(edit) {
    return ((edit.parent instanceof Element ||
        edit.parent instanceof Document ||
        edit.parent instanceof DocumentFragment) &&
        edit.node instanceof Node &&
        (edit.reference instanceof Node ||
            edit.reference === null));
}

function isNamespaced(value) {
    return (value !== null &&
        typeof value === 'object' &&
        'namespaceURI' in value &&
        typeof value.namespaceURI === 'string' &&
        'value' in value &&
        typeof value.value === 'string');
}
function isAttributes(attributes) {
    if (attributes === null || typeof attributes !== 'object') {
        return false;
    }
    return Object.entries(attributes).every(([key, value]) => typeof key === 'string' &&
        (value === null || typeof value === 'string' || isNamespaced(value)));
}
function isComplexEdit(edit) {
    return edit instanceof Array && edit.every(isEdit);
}
function isUpdate(edit) {
    return (edit.element instanceof Element &&
        isAttributes(edit.attributes));
}
function isEdit(edit) {
    if (isComplexEdit(edit)) {
        return true;
    }
    return isUpdate(edit) || isInsert(edit) || isRemove(edit);
}

function convertUpdate(edit) {
    let attributes = {};
    const attributesNS = {};
    Object.entries(edit.attributes).forEach(([key, value]) => {
        if (isNamespaced(value)) {
            const ns = value.namespaceURI;
            if (!ns) {
                return;
            }
            if (!attributesNS[ns]) {
                attributesNS[ns] = {};
            }
            attributesNS[ns] = { ...attributesNS[ns], [key]: value.value };
        }
        else {
            attributes = { ...attributes, [key]: value };
        }
    });
    return { element: edit.element, attributes, attributesNS };
}
function convertEdit(edit) {
    if (isRemove(edit)) {
        return edit;
    }
    if (isInsert(edit)) {
        return edit;
    }
    if (isUpdate(edit)) {
        return convertUpdate(edit);
    }
    if (isComplexEdit(edit)) {
        return edit.map(convertEdit);
    }
    return [];
}

class OscdBackgroundEditV1 extends HTMLElement {
    constructor() {
        super();
        document.addEventListener('oscd-edit', (event) => {
            const editV2 = convertEdit(event.detail);
            this.editor.commit(editV2);
        });
    }
}

export { OscdBackgroundEditV1 as default };
//# sourceMappingURL=oscd-background-editv1-Utn75gYy.js.map
