/*
 * urdf-viewer
 * https://github.com/Wirecloud/urdf-viewer-widget
 *
 * Copyright (c) 2016 CoNWeT Lab, Universidad Politécnica de Madrid
 * Licensed under the Apache-2.0 license.
 */

/* globals URDFViewer */

window.onload = function () {
    "use strict";
    var widget = new URDFViewer();
    widget.init();
};
