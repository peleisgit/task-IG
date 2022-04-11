import React, { useMemo } from "react";
import { useFetch } from "./hooks/useFetch";
import { MDBDataTable } from "mdbreact";
import { MDBTypography } from "mdb-react-ui-kit";

const columns = [
  {
    label: "Name",
    field: "name",
    sort: "asc",
    width: 150,
  },
  {
    label: "Profit & Loss",
    field: "profitAndLoss",
    sort: "asc",
    width: 270,
  },
  {
    label: "Account Type",
    field: "accountType",
    sort: "asc",
    width: 200,
  },
];

const App = () => {
  const { accounts, loadingAccounts, errorAccounts } = useFetch(
    "https://recruitmentdb-508d.restdb.io/rest/accounts"
  );

  const { accountsTypes, loadingAccountsTypes, errorAccountsTypes } = useFetch(
    "https://recruitmentdb-508d.restdb.io/rest/accounttypes"
  );

  const accountsTypesMapped = useMemo(() => {
    return accountsTypes.reduce(
      (acu, curr) => ({ ...acu, [curr.id]: curr.title }),
      {}
    );
  }, []);

  const dataIG = useMemo(() => {
    const rows = accounts.map((account) => {
      return {
        name: account.name,
        profitAndLoss: `${account.currency} ${account.profitLoss}`,
        accountType: accountsTypesMapped[account.accountType],
      };
    });

    return {
      columns: [...columns],
      rows: [...rows],
    };
  }, []);

  return (
    <div>
      {(errorAccountsTypes || errorAccounts) && (
        <MDBTypography note noteColor="danger">
          <strong>Błąd danych:</strong> Nastąpił nieoczekiwany błąd podczas
          pobierania danych
        </MDBTypography>
      )}

      <MDBDataTable
        loading={loadingAccounts || loadingAccountsTypes}
        paging={false}
        searching={false}
        striped
        bordered
        data={dataIG}
      />
    </div>
  );
};

export default App;
