import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme/theme";
import AppRoutes from "./Routes/AppRoutes";
import "./App.css";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
