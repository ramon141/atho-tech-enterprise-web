/* eslint-disable react/prop-types */
// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonBadge from "components/ArgonBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import moment from "moment";

function Author({ image, name, email }) {
  return (
    <ArgonBox display="flex" alignItems="center" px={1} py={0.5}>
      <ArgonBox display="flex" flexDirection="column">
        <ArgonTypography variant="button" fontWeight="medium">
          Pagamento
        </ArgonTypography>
      </ArgonBox>
    </ArgonBox>
  );
}

function Function({ job, org }) {
  return (
    <ArgonBox display="flex" flexDirection="column">
      <ArgonTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </ArgonTypography>
      <ArgonTypography variant="caption" color="secondary">
        {org}
      </ArgonTypography>
    </ArgonBox>
  );
}

const getStatusInfo = (status) => {
  return {
    approved: { name: 'Aprovado', color: 'success' },
    pending: { name: 'Pendente', color: 'secondary' },
    rejected: { name: 'Erro', color: 'danger' }
  }[status];
}

const rows = (payments) => {
  const rows = [];

  payments.forEach((payment) => {
    const statusInfo = getStatusInfo(payment.status);

    rows.push(
      {
        "Tentativa de Pagamento": <Author />,
        "Status": (
          <ArgonBadge variant="gradient" badgeContent={statusInfo.name} color={statusInfo.color} size="xs" container />
        ),
        "Data": (
          <ArgonTypography variant="caption" color='secondary' fontWeight="medium">
            {moment(payment.date).format('DD/MM/YYYY [às] HH:mm')}
          </ArgonTypography>
        ),
        "Identificador do Pagamento": (
          <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
            {payment.id_payment}
          </ArgonTypography>
        ),
      }
    )
  })

  return rows;
};

export default rows;
