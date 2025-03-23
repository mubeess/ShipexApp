import 'nativewind';
import './global.css';
import AnimatedSplashScreen from '@shipex/screens/splash_screen/AnimatedSplashScreen';
import {useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppNavigation from '@shipex/navigations/AppNavigation';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message';
export default function App() {
  const [visible, setVisible] = useState(true);
  return (
    <>
      {visible ? (
        <AnimatedSplashScreen
          onAnimationEnd={() => {
            setVisible(false);
          }}
        />
      ) : (
        <GestureHandlerRootView style={{flex: 1}}>
          <BottomSheetModalProvider>
            <AppNavigation />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      )}
      <Toast />
    </>
  );
}
