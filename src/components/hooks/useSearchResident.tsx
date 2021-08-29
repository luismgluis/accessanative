import { useEffect, useState } from "react";
import api from "../../libs/api/api";
import { ResidentType } from "../../libs/types/ResidentType";
const TAG = "useSearchResident";
export function useSearchResident(
  type: "idCard" | "sector" | "id" | "vehicle",
  value = "",
  withUpdates = false,
) {
  const [resident, setResident] = useState(new ResidentType("", null));

  useEffect(() => {
    if (!withUpdates) return;
    const unsubs = resident.onUpdate((res) => {
      //setResident(res);
      setResident(new ResidentType("", null));
      setResident(res);
    });
    return () => {
      unsubs();
    };
  }, [resident]);
  useEffect(() => {
    console.log(TAG, "useSearchResident");
    api.residents.searchResident(type, value, true).then((arrRes) => {
      const resi = arrRes[0];
      if (resi instanceof ResidentType) {
        setResident(resi);
      }
    });
  }, []);
  return resident;
}
