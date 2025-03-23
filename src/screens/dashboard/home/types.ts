import BottomSheet from '@gorhom/bottom-sheet';
import {ShipmentType} from '@shipex/api/types';

export interface ItemProps extends ShipmentType {
  markAll?: boolean;
  className?: string;
  boxClassName?: string;
  detailsClassName?: string;
  locationClassName?: string;
  nameClassName?: string;
  statusClassName?: string;
  expandClassName?: string;
}

export type FilterModalProps = {
    closeBottomSheet: () => void;
    bottomSheetRef: BottomSheet;
    className?: string;
    contentClassName?: string;
    buttonClassName?: string;
    headingClassName?: string;
    listClassName?: string;
    itemClassName?: string;
    loadingClassName?: string;
  };
  