export type LoginRequest = {usr: string; pwd: string};
export type LoginResponse = {
  full_name: string;
  home_page: string;
  message: string;
};
export type ShipmentType = {
  adjusted_cod: number;
  awb_date: string;
  barcode: string;
  company: string;
  currency: string;
  consignee: string;
  creation: string;
  destination_city: string;
  destination_country: string;
  destination_state: string;
  destination_zone: string;
  docstatus: number;
  modified: string;
  modified_by: string;
  name: string;
  origin_city: string;
  origin_country: string;
  origin_state: string;
  origin_zone: string;
  owner: string;
  pieces: number;
  posting_date: string;
  posting_time: string;
  sender: string;
  sender_name: string;
  shipping_service: string;
  status: string;
  total_weight: number;
};

export type ShipmentStatus = {
  _assign: string | null;
  _comments: string | null;
  _liked_by: string | null;
  _user_tags: string | null;
  color: string;
  creation: string;
  docstatus: number;
  idx: number;
  modified: string;
  modified_by: string;
  name: string;
  owner: string;
  status: string;
};
export type ShipmentStatusResponse = {
  message: ShipmentStatus[];
};

export type ShipmentResponse = {
  message: ShipmentType[];
};
