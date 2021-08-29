import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import Panel from "../Panel/Panel";
import CText from "../CText/CText";
import CInput from "../CInput/CInput";
import CButton from "../CButton/CButton";
import AddIcon from "../../Icons/Home/AddIcon";
import { Icon, Input } from "@ui-kitten/components/ui";
import { theme0 } from "../../../themes/theme0";
import { useTheme } from "../../hooks/useTheme";
import { ResidentType } from "../../../libs/types/ResidentType";
import api from "../../../libs/api/api";
import { VehicleType } from "../../../libs/types/VehicleType";
import utils from "../../../libs/utils/utils";
import { CAlertInfo, CAlertLoading } from "../CAlert/CAlertNotification";

const styles = StyleSheet.create({
  container: {},
  input: { flex: 12, marginHorizontal: 5 },
});

const TAG = "VEHICLE REGISTER";
type VehicleRegisterProps = {
  resident: ResidentType;
};
const VehicleRegister: React.FC<VehicleRegisterProps> = ({ resident }) => {
  const theme = useTheme();
  const [vehicles, setVehicles] = useState<Array<VehicleType>>([]);
  const [currentVehicle, setCurrentVehicle] = useState({
    licensePlate: "",
    color: "",
  });

  useEffect(() => {
    const unsubs = api.residents.getVehicles(resident, (data) => {
      setVehicles(data);
    });
    return () => {
      unsubs();
    };
  }, [resident]);

  const createVehicle = () => {
    const vehicle = new VehicleType("", {
      creationDate: utils.dates.dateNowUnix(),
      color: currentVehicle.color,
      licensePlate: currentVehicle.licensePlate.toUpperCase(),
      comment: "",
      idResident: resident.id,
    });
    const alert = CAlertLoading("Agregando vehiculo...");
    api.residents
      .createVehicle(resident, vehicle)
      .then(() => {
        alert.close();
        CAlertInfo("Vehiculo agregado", "");
        setCurrentVehicle({ licensePlate: "", color: "" });
      })
      .catch((err) => {
        alert.close();
        CAlertInfo("Vehiculo fallo!", err);
      });
  };

  return (
    <Panel>
      <Panel level="6" paddingHorizontal={5}>
        <CText titleText="Vehiculos actuales"></CText>
        {vehicles.map((vehicle, index) => {
          return (
            <Panel paddingHorizontal={10} paddingVertical={5} level="5">
              <CText titleText={`${index + 1}:`}>
                {`${vehicle.licensePlate}, Color: ${vehicle.color}`}
              </CText>
            </Panel>
          );
        })}
      </Panel>
      <Panel level="6" paddingVertical={10} paddingHorizontal={10}>
        <CText>Agregar vehiculo:</CText>
        <Panel flexDirection="row">
          <CInput
            value={currentVehicle.licensePlate}
            onChangeText={(t) =>
              setCurrentVehicle({
                ...currentVehicle,
                licensePlate: t,
              })
            }
            placeholder="ABC123"
            style={styles.input}
          />
          <CInput
            value={currentVehicle.color}
            onChangeText={(t) =>
              setCurrentVehicle({ ...currentVehicle, color: t })
            }
            placeholder="Color"
            style={styles.input}
          />
          <CButton
            width={50}
            onPress={() => createVehicle()}
            imageInsertComponent={() => (
              <AddIcon color={theme.colors["color-primary-500"]} width={30} />
            )}
          />
        </Panel>
      </Panel>
    </Panel>
  );
};
export default VehicleRegister;
