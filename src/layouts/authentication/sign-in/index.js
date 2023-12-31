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

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import axios from "axios";
import { login } from "services/auth";

// Image
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg";

function Illustration() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    const data = {
      email, password
    };

    axios.create({
      baseURL: process.env.REACT_APP_BASE_API_URL,
    }).post('enterprise/login', data)
      .then((response) => {
        login(response.data);
        navigate('/dashboard');
      })
      .catch((err) => {
        const message = err.response?.data?.error?.message || "Erro ao autenticar o usuário";

        alert(message);
      })


  }

  return (
    <IllustrationLayout
      title="Login"
      description="Insira seu email e senha para entrar"
      illustration={{
        image: bgImage,
        title: 'Orçamento rápido e sem compromissos',
        description:
          "Venha conosco fazer a sua inscrição.",
      }}
    >
      <ArgonBox component="form" onSubmit={handleSubmit} role="form">
        <ArgonBox mb={2}>
          <ArgonInput type="email" placeholder="Email" size="large" />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput type="password" placeholder="Password" size="large" />
        </ArgonBox>
        <ArgonBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <ArgonTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Lembrar-me
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox mt={4} mb={1}>
          <ArgonButton type="submit" color="info" size="large" fullWidth>
            Entrar
          </ArgonButton>
        </ArgonBox>
        <ArgonBox mt={3} textAlign="center">
          <ArgonTypography variant="button" color="text" fontWeight="regular">
            Ainda não possui conta?{" "}
            <ArgonTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
            >
              Criar Conta
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>
    </IllustrationLayout>
  );
}

export default Illustration;
