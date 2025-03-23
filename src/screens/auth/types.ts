import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

export type ModalLoginProps = {
  closeBottomSheet: () => void;
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
};
