import React from 'react';
import './styles/Table.css';

function TableBody ({contacts}) {
  const rows = contacts.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.phoneNumber}</td>
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
        <th>Phone Number</th>
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

