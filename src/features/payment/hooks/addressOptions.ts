import { useEffect, useState } from "react";
import axios from "axios";
import { AddressOptionsType } from "../types/address.type";

export const useAddressOptions = () => {
  const [city, setCity] = useState<AddressOptionsType | null>(null);
  const [cityList, setCityList] = useState<AddressOptionsType[]>([]);
  const [district, setDistrict] = useState<AddressOptionsType | null>(null);
  const [districtList, setDistrictList] = useState<AddressOptionsType[]>([]);
  const [ward, setWard] = useState<AddressOptionsType | null>(null);
  const [wardList, setWardList] = useState<AddressOptionsType[]>([]);
  const [isRecallData, setIsRecallData] = useState(true);

  const getCities = async () => {
    return axios.get("https://provinces.open-api.vn/api/p/");
  };
  const getDistricts = async () => {
    return axios.get(`https://provinces.open-api.vn/api/p/${city?.code}?depth=2`);
  };
  const getWards = async () => {
    return axios.get(`https://provinces.open-api.vn/api/d/${district?.code}?depth=2`);
  };

  useEffect(() => {
    setCity(null);
    getCities().then((data) => {
      if (data) {
        setCityList(data.data);
      }
    });
  }, []);
  useEffect(() => {
    if (!city || !isRecallData) {
      return;
    }
    setDistrict(null);
    getDistricts().then((data) => {
      if (data) {
        setDistrictList(data.data.districts);
      }
    });
  }, [city]);
  useEffect(() => {
    if (!district || !isRecallData) {
      return;
    }
    setWard(null);
    getWards().then((data) => {
      if (data) {
        setWardList(data.data.wards);
      }
    });
  }, [district]);

  const reset = () => {
    setCity(null);
    setDistrict(null);
    setWard(null);
  };

  return {
    city,
    district,
    ward,
    cityList,
    districtList,
    wardList,
    setCity,
    setDistrict,
    setWard,
    reset,
    setIsRecallData
  };
};
