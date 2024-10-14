import { registerRootComponent } from "expo";
import UserProvider from "./context/userContext";

import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
const RootComponent = () => (
  <UserProvider>
    <App />
  </UserProvider>
);

registerRootComponent(RootComponent);
