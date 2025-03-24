import React, { useContext } from "react";
import SettingsForm from "./SettingsForm";

const SettingsTab = () => {
  const { userData } = useContext(MyContext);
  
  return (
    <div className="bg-white p-6 rounded-lg">
      <SettingsForm userData={userData} />
    </div>
  );
};

export default SettingsTab;