import { useCallback, useState } from "react";
import api from "../../../libs/api/api";
import {
  ResidentType,
  ResidentTypeType,
} from "../../../libs/types/ResidentType";
import utils from "../../../libs/utils/utils";
import {
  CAlertInfo,
  CAlertLoading,
  CAlertQuestion,
} from "../CAlert/CAlertNotification";
import { FeedImageType } from "../FeedImages/FeedImages";
import { InvokeQrScanner } from "../QRScanner/QRScannerModule";
const TAG = "USER REGISTER MOCULE";
function go(resInfo: ResidentType | null = null) {
  const [checkResident, setCheckResident] = useState(false);

  const [form, setForm] = useState<ResidentType>(
    resInfo === null ? new ResidentType("", null) : resInfo,
  );

  const cleanForm = useCallback(() => {
    const newForm = utils.objects.cloneObject(form);
    for (const key in newForm) {
      if (key === "isVisitor") {
        newForm[key] = true;
        continue;
      }
      newForm[key] = "";
    }
    setForm(newForm);
  }, [form]);

  const formChange = useCallback(
    (property: keyof ResidentTypeType, isNum = false) => {
      return (newValue: any) => {
        if (isNum) {
          if (isNaN(newValue)) return;
        }
        const newobj: any = new ResidentType("", null);
        newobj.cloneFrom(form);
        newobj[property] = newValue;
        setForm(newobj);
      };
    },
    [form],
  );

  const onSend = useCallback(() => {
    type rField = {
      name: keyof ResidentType;
      text: string;
    };
    const necesaries: Array<rField> = [
      { name: "name", text: "name" },
      { name: "idCard", text: "ID Card" },
      { name: "profileImage", text: "Profile image" },
      { name: "phone", text: "Phone" },
    ];
    const nForm: any = form;
    for (const key in nForm) {
      const element = nForm[key];
      const n = necesaries.filter((item) => item.name == key);
      for (const keyN in n) {
        const elementN = n[keyN];
        if (element === "" || (element === 0 && key === keyN)) {
          console.log(TAG, "element", key, "is empty");
          CAlertInfo("Complete Form", `The field ${elementN.text} is necesary`);
          return;
        }
      }
    }
    if (nForm.sector === "" && checkResident) {
      CAlertInfo(
        "The field sector is empty",
        "Is needed sector value into the resident info.",
      );
      return;
    }
    const newResi = new ResidentType("", {
      name: nForm.name,
      sector: nForm.sector,
      idCard: nForm.idCard,
      qr: nForm.qr,
      telegram: "",
      phone: nForm.phone,
      profession: nForm.profession,
      profileImage: nForm.profileImage,
      isVisitor: !checkResident,
    });
    const alertLoading = CAlertLoading("Creating new user...");
    api.residents
      .saveResident(newResi)
      .then(() => {
        alertLoading.close();
        cleanForm();
        const alert = CAlertQuestion(
          "Registered user",
          "Can now be searched in the access screen",
          undefined,
          {
            text: "Ok",
            onPress: () => alert.close(),
          },
        );
      })
      .catch((err) => {
        console.log(TAG, "fail", err);
        const alert = CAlertQuestion(
          "Failed registration",
          "try again later",
          undefined,
          {
            text: "Ok",
            onPress: () => alert.close(),
          },
        );
      });
  }, [form, cleanForm, checkResident]);

  const onImageSelect = (
    data: FeedImageType,
    field: "profileImage" | "idCardImage",
  ) => {
    if (!data.imageFromCamera) {
      CAlertInfo(
        "Imagen Rechazada",
        "Aqui solo puedes ingresar fotografias tomadas en el momento",
      );
      return;
    }

    formChange(field)(data.uri);
  };

  const onQrSelect = useCallback(
    (qrScanned: string) => {
      if (!(qrScanned.length > 0)) {
        return;
      }
      formChange("qr")(qrScanned);
    },
    [form],
  );

  const goQrCamera = InvokeQrScanner((text) => {
    onQrSelect(text);
  });

  const updateResident = useCallback(
    (originalResident: ResidentType) => {
      console.log(TAG, "updateResident");
      const alert = CAlertLoading("Actualizando usuario...");
      api.residents
        .updateResident(originalResident, form)
        .then((residentResult) => {
          alert.close();
          CAlertInfo(
            "Usuario actualizado",
            `${residentResult.name} ha sido actualizado`,
          );
          originalResident.cloneFrom(residentResult, true);
        })
        .catch(() => {
          alert.close();
          CAlertInfo(
            "Actualizacion fallida!",
            `${form.name} no logro ser actualizado`,
          );
        });
    },
    [form],
  );

  return {
    form: form,
    goQrCamera,
    onQrSelect,
    updateResident: updateResident,
    onImageSelect: onImageSelect,
    onSend: onSend,
    formChange: formChange,
    cleanForm,
    checkResident,
    setCheckResident,
  };
}

export const UserRegisterModule = go;
