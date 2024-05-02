import { DeliveryAsItem, PackageAsItem } from "../interfaces";

export async function fetchData<T>(url: string): Promise<T | undefined> {
  try {
    const res = await fetch(url);

    if (res.status === 200) return res.json();
    throw await res.json();
  } catch (error: any) {
    console.error("fetch data error", error);

    if ("message" in error) alert(error.message);
  }
}

export const fetchPackage = async (id: string) => {
  const url = `${import.meta.env.VITE_API_URL}/package/${id}`;
  const data = await fetchData<PackageAsItem>(url);
  console.log("fetch package data", data);

  return data;
};

export const fetchDelivery = async (id: string) => {
  const url = `${import.meta.env.VITE_API_URL}/delivery/${id}`;
  const data = await fetchData<DeliveryAsItem>(url);
  console.log("fetch package", data);

  return data;
};
