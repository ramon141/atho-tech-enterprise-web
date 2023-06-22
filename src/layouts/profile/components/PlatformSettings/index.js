/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import { NAME, ID, E_MAIL } from "services/auth";
import api from "services/api";
import { login } from "services/auth";
// import { ID } from "services/auth";
// import { NAME } from "services/auth";
// import { E_MAIL } from "services/auth";

function PlatformSettings() {

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const olderPassword = e.target[3].value;

    const data = { name, email, password, olderPassword };

    api.put(`enterprises/${ID}`, data)
      .then((response) => {
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('id', response.data.id);
        alert("Informações atualizadas com sucesso!");
        updateFields();
      })
      .catch((err) => {
        const message = err.response?.data?.error?.message || "Erro ao atualizar as informações do usuário";

        alert(message);
      })
  }

  const updateFields = () => {
    document.getElementById("nameEnterprise").value = NAME;
    document.getElementById("emailEnterprise").value = E_MAIL;
    document.getElementById("passwordEnterprise").value = '';
  }

  return (
    <Card>
      <ArgonBox pt={2} px={2}>
        <ArgonTypography variant="h5" fontWeight="medium" textTransform="capitalize">
          Informações básicas:
        </ArgonTypography>
      </ArgonBox>
      <ArgonBox pt={1.5} pb={2} px={2} lineHeight={1.25}>

        <form onSubmit={handleSubmit}>
          <ArgonTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            Novo Nome:
          </ArgonTypography>
          <ArgonBox mb={2}>
            <ArgonInput type="text" defaultValue={NAME} id="nameEnterprise" required placeholder="Nome: " />
          </ArgonBox>

          <ArgonTypography variant="h6" fontWeight="medium">
            Novo E-mail:
          </ArgonTypography>
          <ArgonBox mb={2}>
            <ArgonInput type="email" defaultValue={E_MAIL} id="emailEnterprise" required placeholder="Email da Empresa: " />
          </ArgonBox>

          <ArgonTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            Nova Senha:
          </ArgonTypography>
          <ArgonBox mb={2}>
            <ArgonInput type="password" id="passwordEnterprise" required placeholder="Senha: " />
          </ArgonBox>


          <hr />
          <br />

          <ArgonTypography variant="h6" fontWeight="medium">
            Para confirmar as alterações digite a senha atual:
          </ArgonTypography>
          <ArgonBox mb={2}>
            <ArgonInput type="password" id="olderPasswordEnterprise" required placeholder="Senha: " />
          </ArgonBox>


          <ArgonBox mt={4} mb={1}>
            <ArgonButton type="submit" variant="gradient" color="dark" fullWidth>
              Atualizar informações
            </ArgonButton>
          </ArgonBox>
        </form>
      </ArgonBox>
    </Card>
  );
}

export default PlatformSettings;
