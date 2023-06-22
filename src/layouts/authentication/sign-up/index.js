// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import axios from "axios";

// Images
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg";

function Cover() {

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const data = { name, email, password };

    axios.create({
      baseURL: process.env.REACT_APP_BASE_API_URL,
    }).post('enterprises', data)
      .then((response) => {
        alert("A empresa foi cadastrada com sucesso!");
        cleanFields();
      })
      .catch((err) => {
        alert("O sistema apresentou um erro ao cadastrar o usuário.");
      })
  }

  const cleanFields = () => {
    document.getElementById("nameEnterprise").value = "";
    document.getElementById("emailEnterprise").value = "";
    document.getElementById("passwordEnterprise").value = "";
  }


  return (
    <CoverLayout
      title="Bem-vindo!"
      description="Utilize esses formulários para fazer login ou criar uma nova conta gratuitamente."
      image={bgImage}
      imgPosition="top"
      button={{ color: "dark", variant: "gradient" }}
    >
      <Card>
        <ArgonBox p={3} mb={1} textAlign="center">
          <ArgonTypography variant="h5" fontWeight="medium">
            Registre sua empresa
          </ArgonTypography>
        </ArgonBox>

        <form onSubmit={handleSubmit}>
          <ArgonBox pt={2} pb={3} px={3}>
            <ArgonBox mb={2}>
              <ArgonInput required id="nameEnterprise" placeholder="Nome da Empresa" />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput type="email" id="emailEnterprise" required placeholder="Email da Empresa" />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput type="password" id="passwordEnterprise" required placeholder="Senha" />
            </ArgonBox>

            <ArgonBox mt={4} mb={1}>
              <ArgonButton type="submit" variant="gradient" color="dark" fullWidth>
                Criar Conta
              </ArgonButton>
            </ArgonBox>

            <ArgonBox mt={2} style={{ textAlign: "center" }}  >
              <ArgonTypography variant="button" color="text" style={{ textAlign: "center" }} fontWeight="regular">
                Você já tem uma conta?&nbsp;
                <ArgonTypography
                  component={Link}
                  to="/"
                  variant="button"
                  type="submit"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Entrar
                </ArgonTypography>
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </form>
      </Card>
    </CoverLayout >
  );
}

export default Cover;
