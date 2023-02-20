import React from 'react';
import './Table.css';
function TableBody ({contacts}) {
  const rows = contacts.map((row, index) => {
    return (
  <tr key={index}>
    <td>{row.name}</td>
  </tr>
      );
    });
    return (
        <tbody>
          {rows}
        </tbody>
    );
  }


function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Name</th>
      </tr>
    </thead>
  );
}

function Table({contacts}) {
  return (
    <table>
      <TableHeader />
      <TableBody contacts={contacts} />
    </table>
  );
}



export default Table;

