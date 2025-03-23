import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@shipex/navigations/types';

export type ModalLoginProps = {
  closeBottomSheet: () => void;
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
};
export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;
