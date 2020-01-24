import { createMuiTheme } from "@material-ui/core/styles";
import { blue, red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[900]
    },
    secondary: {
      main: red[500]
    }
  },
  shape: {
    borderRadius: 10
  }
});

export default theme;
