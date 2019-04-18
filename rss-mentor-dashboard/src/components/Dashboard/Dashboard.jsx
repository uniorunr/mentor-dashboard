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
import { getDataByMentor, getLasksList } from '../../utils/parseJSON';
import {
  getFormatOfCell,
  cellFormatting,
  getFormatOfTask,
  cellFormattingTask,
} from '../../utils/formatting';

const styles = () => ({
  root: {
    width: '90%',
    margin: '1% 0 2%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const SimpleTable = (props) => {
  const { classes, mentor, database } = props;
  const { finalData, studentsList } = getDataByMentor(mentor, database);
  return (
    <div className="dashboard-container">
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Tasks</TableCell>
              {studentsList.map(student => (
                <TableCell key={student} align="center">
                  {student}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {finalData.map(row => (
              <TableRow key={row.task}>
                <TableCell
                  component="th"
                  scope="row"
                  className={cellFormattingTask(
                    getFormatOfTask(row.task, database.tasks),
                  )}
                >
                  {row.task}
                </TableCell>
                {studentsList.map((student, i) => (
                  <TableCell
                    align="center"
                    key={student}
                    className={cellFormatting(
                      getFormatOfCell(
                        row[`${studentsList[i]}`],
                        row.task,
                        getLasksList(database),
                      ),
                    )}
                  >
                    {getFormatOfCell(
                      row[`${studentsList[i]}`],
                      row.task,
                      getLasksList(database),
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

SimpleTable.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  mentor: PropTypes.string.isRequired,
  database: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(SimpleTable);
