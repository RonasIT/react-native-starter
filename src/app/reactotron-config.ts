import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron, { networking } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure()
  .useReactNative()
  .use(networking())
  .use(reactotronRedux())
  .connect();

export default reactotron;
