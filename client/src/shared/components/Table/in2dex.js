import React from "react";
import MaterialTable from "material-table";



function Table(props) {
    return (
      <MaterialTable
        {...props}
        columns={props.columns}
        data={props.data}
        actions={props.actions}
        options={{
          actionsColumnIndex: -1
        }}
      />
    )
  }

  export default Table;