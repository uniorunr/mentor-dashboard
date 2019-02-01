import React from 'react';
import PropTypes from 'prop-types';
import './Dashboard.css';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { studentsList, test } from '../../utils/parseJSON';

const styles = theme => ({
  root: {
    width: '90%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function SimpleTable(props) {
  const { classes } = props;

  return (
    <div className="dashboard-container">
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Tasks</TableCell>
              {studentsList.map(student => (
                <TableCell key={student} align="right">{student}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {test.map(row => (
              <TableRow key={row.task}>
                <TableCell component="th" scope="row">
                  {row.task}
                </TableCell>
                {studentsList.map((student, i) => (
                  <TableCell align="right" key={student}>{row[`${studentsList[i]}`]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(SimpleTable);
