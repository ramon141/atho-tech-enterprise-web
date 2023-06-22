/* eslint-disable no-unused-vars */
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
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";
import CategoriesList from "examples/Lists/CategoriesList";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Argon Dashboard 2 MUI base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import Slider from "layouts/dashboard/components/Slider";

// Data
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import salesTableData from "layouts/dashboard/data/salesTableData";
import categoriesListData from "layouts/dashboard/data/categoriesListData";
import { useEffect, useState } from "react";
import api from "services/api";
import moment from "moment";

function Default() {
  const { size } = typography;

  const [enterprise, setEnterprise] = useState({});


  useEffect(() => {
    api.get('/enterprise/whoami')
      .then((response) => {
        setEnterprise(response.data);
      })
      .catch((err) => {
        alert("Ocorreu um erro inesperado, refaça o login");
      })
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Ramon");
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={4}>
            <DetailedStatisticsCard
              title="Total de Vendedores"
              count={enterprise.quantUsers}
              icon={{ color: "info", component: <i className="ni ni-money-coins" /> }}
              percentage={{ color: "error", count: "", text: "" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <DetailedStatisticsCard
              title="Total de Produtos"
              count={enterprise.quantProducts}
              icon={{ color: "error", component: <i className="ni ni-world" /> }}
              percentage={{ color: "error", count: "", text: "" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <DetailedStatisticsCard
              title="Total de Serviços"
              count={enterprise.quantServices}
              icon={{ color: "success", component: <i className="ni ni-paper-diploma" /> }}
              percentage={{ color: "error", count: "", text: "" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <DetailedStatisticsCard
              title="Válido até"
              count={moment(enterprise.expire_date).format('DD/MM/YYYY [às] HH:mm')}
              icon={{ color: "success", component: <i className="ni ni-paper-diploma" /> }}
              percentage={{ color: "error", count: "", text: "" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <DetailedStatisticsCard
              title="Total de Vendas"
              count={enterprise.budget || 0}
              icon={{ color: "warning", component: <i className="ni ni-cart" /> }}
              percentage={{ color: "success", count: "", text: "" }}
            />
          </Grid>
        </Grid>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Default;
