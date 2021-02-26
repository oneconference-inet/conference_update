// @flow

import { ColorPalette, createStyleSheet } from "../../../base/styles";

export const SECRET_COLOR = ColorPalette.secret;

export default createStyleSheet({
    /**
     * Style for the recording indicator.
     */
    secretCircleLabel: {
        backgroundColor: SECRET_COLOR,
        border: "1px solid white",
    },
});