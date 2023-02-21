import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import CircleIcon from "@mui/icons-material/Circle";

EnhancedTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default function EnhancedTable({ rows, columns }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {rows && rows.length ? (
        <>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          return (
                            <React.Fragment key={column.id}>
                              {column.id !== "status" &&
                              column.id !== "Budget" ? (
                                <TableCell align={column.align}>
                                  {row[column.id]}
                                </TableCell>
                              ) : column.id === "status" ? (
                                <TableCell align={column.align}>
                                  <CircleIcon
                                    sx={{
                                      color:
                                        row[column.id] === "Active"
                                          ? "green"
                                          : "red",
                                    }}
                                  />
                                  <span style={{ marginLeft: "10px" }}>
                                    {row[column.id]}
                                  </span>
                                </TableCell>
                              ) : (
                                <TableCell align={column.align}>
                                  {row[column.id] ? row[column.id] + ' USD' : ""} 
                                </TableCell>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <div style={{ padding: "10px" }}>
          <span>No data found.</span>
        </div>
      )}
    </Paper>
  );
}
