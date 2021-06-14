import React, { useContext } from "react";
import { Context } from "../../Context/AuthContext";

export const Dashboard = () => {
  //Para destruir o token apos sair
  const { handleLogout } = useContext(Context);

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Botão com a função de sair */}
      <button type="button" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
};
