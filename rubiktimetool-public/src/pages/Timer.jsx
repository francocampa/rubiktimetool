import { useTranslation } from "react-i18next";
import { MdTimer } from "react-icons/md";

export default function Timer() {
  const [t, i18n] = useTranslation("global");

  return (
    <>
      <MdTimer size="5rem" />
      <h1>{t("Timer")}</h1>
    </>
  );
}
