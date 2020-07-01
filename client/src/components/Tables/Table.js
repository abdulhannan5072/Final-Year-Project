// import React, {} from 'react';
// import DataTable from 'react-data-table-component';
// import Search from '../Search/SearchD';


// const Table = (props) => {

//   const customStyles = {
//     subHeader: {
//       style: {
//         paddingLeft: '8px',
//         paddingTop: '24px',
        
//       },
//     },
    
//   };
  
// const FilterComponent = ({ filterText, onFilter, onClear }) => (
  
//     <Search id="search" type="text" placeholder="Filter By Name" value={filterText} onChange={onFilter}/>
    
  
// );

//   const [filterText, setFilterText] = React.useState('');
//   const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
//   const filteredItems = props.dataItems.filter(item => item.name && item.name.includes(filterText));

//   const subHeaderComponentMemo = React.useMemo(() => {
//     const handleClear = () => {
//       if (filterText) {
//         setResetPaginationToggle(!resetPaginationToggle);
//         setFilterText('');
//       }
//     };

//     return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
//   }, [filterText, resetPaginationToggle]);
  
//   return (
//     <DataTable
//     pagination={true}
//     paginationResetDefaultPage={resetPaginationToggle}
//     data={filteredItems}
//     subHeader
//     customStyles={customStyles}
//     subHeaderComponent={subHeaderComponentMemo}
//     noHeader={true}
//     subHeaderAlign='left'
//     persistTableHead
//     highlightOnHover
//     {...props}
//     />
//   );
// };

// // class Table extends Component {
// //   render() {
    
// //   }
// // };


// export default Table;


































// // import React from 'react';
// // import MUIDataTable from "mui-datatables";
// // // const MaterialTableDemo = (props) => {}
// // import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// // export default function MaterialTableDemo(props) {
  



// // const options = {
// //   filterType: 'multiselect',
// //   print: false,
// //   download: false,
// //   elevation: '1',
// //   textLabels: {
// //     filter: {
// //       all: "All Types",
// //       title: "FILTERS",
// //       reset: "RESET",
// //     },
// //   }
// // };

// //   const getMuiTheme = () => createMuiTheme({
// //   overrides: {
// //     MUIDataTableBodyCell: {
// //       root: {
// //         backgroundColor: "#fff"
// //       }
// //     }
  
// //   }
// // })

// // return(
// // <MuiThemeProvider theme={getMuiTheme()}>
// // <MUIDataTable
  
// //   options={options}
// //   {...props}

// // />
// // </MuiThemeProvider>
// // );

// // }