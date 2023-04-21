export type AddressOptionsType = {
  code: number;
  name: string;
};

export type AddressOptionsParams = {
  city: AddressOptionsType;
  district: AddressOptionsType;
  ward: AddressOptionsType;
  street?: string;
};
