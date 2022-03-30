import { Provider } from "react-redux";
import { AppContainer } from "./src/navigation";
import { store } from "./src/state";
import * as Updates from "expo-updates";
import AppLoading from "expo-app-loading";
import { useEffect, useState } from "react";

export default function App() {
  const [newUpdates, setNewUpdates] = useState(false);

  useEffect(() => {
    Updates.fetchUpdateAsync()
      .then(async ({ isNew }) => {
        if (isNew) {
          await Updates.reloadAsync();
        } else {
          setNewUpdates(true);
        }
      })
      .catch(async (error) => {
        console.log(error);
        setNewUpdates(true);
      });
  }, []);

  if (newUpdates)
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  else return <AppLoading />;
}
