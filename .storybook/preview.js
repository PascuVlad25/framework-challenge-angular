import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
require('!style-loader!css-loader!sass-loader!../src/styles.scss');

setCompodocJson(docJson);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
}