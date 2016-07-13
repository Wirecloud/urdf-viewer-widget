/* globals $, MashupPlatform, MockMP, URDFViewer, beforeAll, afterAll, beforeEach */

(function () {

    "use strict";

    describe("Test URDFViewer", function () {
        var widget;
        beforeAll(function () {
            window.MashupPlatform = new MockMP.MockMP();
        });

        beforeEach(function () {
            MashupPlatform.reset();
            widget = new URDFViewer();
        });

        it("Dummy test", function () {
            expect(true).toBeTruthy();
        });

    });
})();
