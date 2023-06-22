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

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import getRows from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { useEffect, useState } from "react";
import api from "services/api";
import { ID } from "services/auth";
import ArgonButton from "components/ArgonButton";
import { E_MAIL } from "services/auth";
import { NAME } from "services/auth";

function Tables() {

  const columns = [
    { name: "Tentativa de Pagamento", align: "left" },
    { name: "Status", align: "center" },
    { name: "Data", align: "center" },
    { name: "Identificador do Pagamento", align: "center" }
  ]

  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { columns: prCols, rows: prRows } = projectsTableData;

  useEffect(() => {
    api.get(`enterprises/${ID}/payments`)
      .then((response) => {
        setRows(getRows(response.data));
      })
  }, [])

  const hasNewPayments = (older, newRow) => {
    return older?.length !== newRow?.length;
  };

  const hasNewApproved = (older, newRow) => {
    const re = /approved/g
    if ((JSON.stringify(older).match(re) || []).length !== (JSON.stringify(newRow).match(re) || []).length)
      return ""
  }

  useEffect(() => {
    if (refresh) {
      const interval = setInterval(() => {
        api.get(`enterprises/${ID}/payments`)
          .then((response) => {
            const newRows = getRows(response.data);

            if (hasNewPayments(rows, newRows)) {
              setRows(getRows(response.data));
            } else if (hasNewApproved(rows, newRows)) {
              setRefresh(false);
              setRows(getRows(response.data));
            }

          })
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [refresh])

  const handleDoPayments = () => {
    const data = {
      email: E_MAIL,
      first_name: NAME,
      last_name: "",
      cpf: "05860445237"
    }

    api.post(`/payments/${ID}/generate-intention-payments`, data)
      .then((response) => {
        window.open(response.data.link, '_blank');
        setRefresh(true);
      })
      .catch((err) => {
        alert("O sistema apresentou um erro ao gerar o QRCode");
      })
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">Tabela de Pagamentos</ArgonTypography>

              <ArgonButton onClick={handleDoPayments} color="info" size="small">
                Realizar pagamento
              </ArgonButton>
            </ArgonBox>
            <ArgonBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </ArgonBox>
          </Card>
        </ArgonBox>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
