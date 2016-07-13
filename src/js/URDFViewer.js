/*
 * urdf-viewer
 * https://github.com/Wirecloud/urdf-viewer-widget
 *
 * Copyright (c) 2016 CoNWeT Lab, Universidad Politécnica de Madrid
 * Licensed under the Apache-2.0 license.
 */

/* exported URDFViewer */
/* globals ROS3D, ROSLIB */

var URDFViewer = (function (MP) {

    "use strict";

    var URDFViewer = function URDFViewer() {
    };

    URDFViewer.prototype.init = function init() {
        this.connect();

        MP.widget.context.registerCallback(function (newValues) {
            if (this.viewer && ("heightInPixels" in newValues || "widthInPixels" in newValues)) {
                this.viewer.resize(window.innerWidth, window.innerHeight);
            }
        }.bind(this));

        MP.widget.prefs.registerCallback(function (newValues) {
            this.connect();
        }.bind(this));
    };

    URDFViewer.prototype.connect = function connect() {
        this.ros = new ROSLIB.Ros({
            url: MP.prefs.get('ros_bridge_url')
        });

        this.viewer = new ROS3D.Viewer({
            divID: 'urdf',
            width: window.innerWidth,
            height: window.innerHeight,
            antialias: true,
            background: '#002233'
        });
        this.viewer.addObject(new ROS3D.Grid({
            color: '#0181c4',
            cellSize: 0.5,
            num_cells: 20
        }));


        this.tfClient = new ROSLIB.TFClient({
            ros: this.ros,
            angularThres: 0.01,
            transThres: 0.01,
            rate: 10.0,
            fixedFrame: '/base_link'
        });

        this.urdfClient = new ROS3D.UrdfClient({
            ros: this.ros,
            tfClient: this.tfClient,
            path: MP.prefs.get('static_resources_url'),
            rootObject: this.viewer.scene,
            loader:  ROS3D.COLLADA_LOADER_2
        });
    };

    /* test-code */

    /* end-test-code */

    return URDFViewer;

})(MashupPlatform);
