import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';

export default function BasicTable() {
  const columns = ["No","Name", "Email", "Phone", "Status"];
  const [done, setDone] = useState(false);
  // const rows = [
  //   [
  //      "John Doe",
  //      "ergsrgte@ryh.f",
  //      "5789325678",
  //      "in"
  //   ]
  // ];

  const [rows, setRows] = useState([]);

  async function fetch(){
    try {
      const res = await axios.get('https://scanner.iith-ac.in:8000/get_all_data/');
      setRows(res.data);
    }
    catch (err) {
      console.log(err);
    }
    setTimeout(fetch, 1000, []);
  }

  if (!done){
    fetch();
    setDone(true);
  }

  return (
    <Box margin="2rem">
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              columns.map((col, i) => (<TableCell key={i}><Box>{col}</Box></TableCell>))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              style={{ backgroundColor: row[3] ? '#80ff80' : '#ff8686' }} // Conditionally set background color
            >
              <TableCell><Box>{i}</Box></TableCell>
              <TableCell><Box>{row[0]}</Box></TableCell>
              <TableCell><Box>{row[1]}</Box></TableCell>
              <TableCell><Box>{row[2]}</Box></TableCell>
              <TableCell><Box>{row[3] ? "in" : "out"}</Box></TableCell>
            </TableRow>
          ))}

          {/* ))} */}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}
  