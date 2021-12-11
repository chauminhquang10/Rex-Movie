import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../../GlobalState";
import "./MovieList.css";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { TblPagination } from "../userList/UserListUtils";
import PuffLoader from "react-spinners/PuffLoader";
import DeleteIcon from "@material-ui/icons/Delete";
import AdminNormalButton from "../../Admin_components/admin_button/AdminNormalButton";
import AdminActionButtons from "../../Admin_components/admin_button/AdminActionButtons";
import Checkbox from "@mui/material/Checkbox";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  deleteButton: {
    position: "absolute",
    right: "10px",
  },
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: "white",
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

const MovieList = () => {
  const state = useContext(GlobalState);

  const [token] = state.token;
  const [movies, setMovies] = state.moviesAPI.movies;
  const [moviesCallback, setMoviesCallback] = state.moviesAPI.moviesCallback;

  //xử lí delete all
  const [isChecked, setIsChecked] = useState(false);

  const classes = useStyles();

  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const headCells = [
    {
      id: "title",
      label: "Title",
    },
    {
      id: "year",
      label: "Year",
    },
    {
      id: "duration",
      label: "Duration",
    },
    {
      id: "limitAge",
      label: "Limit Age",
    },
    {
      id: "TMDBid",
      label: "The Movie DB id",
    },
    {
      id: "actions",
      label: "Actions",
      disableSorting: true,
    },
  ];

  const handleCheck = (id) => {
    movies.forEach((movie) => {
      if (movie._id === id) movie.checked = !movie.checked;
    });
    setMovies([...movies]);
  };

  const deleteMovie = async (id, public_id) => {
    try {
      const deleteImg = axios.post(
        "/api/delete",
        { public_id },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const delMovie = axios.delete(`/api/movies/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      await deleteImg;
      await delMovie;
      setMoviesCallback(!moviesCallback);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const checkAll = () => {
    movies.forEach((movie) => {
      movie.checked = !isChecked;
    });
    setMovies([...movies]);
    setIsChecked(!isChecked);
  };

  const deleteAll = () => {
    movies.forEach((movie) => {
      if (movie.checked) deleteMovie(movie._id, movie.img.public_id);
    });
    setIsChecked(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const recordsAfterPagingAndSorting = () => {
    return stableSort(movies, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };

  const handleSort = (id) => {
    const isAsc = orderBy === id && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(id);
  };

  return (
    <div className="admin-movies-list">
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Link to="/newMovie">
            <button className="movieAddButton">Create</button>
          </Link>
          <AdminNormalButton
            text="Delete(s)"
            variant="outlined"
            startIcon={<DeleteIcon />}
            className={classes.deleteButton}
            onClick={deleteAll}
          ></AdminNormalButton>
        </Toolbar>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  color="primary"
                  // indeterminate={numSelected > 0 && numSelected < rowCount}
                  // checked={rowCount > 0 && numSelected === rowCount}
                  onChange={checkAll}
                  checked={isChecked}
                  inputProps={{
                    "aria-label": "select all desserts",
                  }}
                />
              </TableCell>
              {headCells.map((item) => (
                <TableCell
                  key={item.id}
                  sortDirection={orderBy === item.id ? order : false}
                >
                  {item.disableSorting ? (
                    item.label
                  ) : (
                    <TableSortLabel
                      onClick={() => handleSort(item.id)}
                      direction={orderBy === item.id ? order : "asc"}
                      active={orderBy === item.id}
                    >
                      {item.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {recordsAfterPagingAndSorting().map((movie, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox
                    color="primary"
                    checked={movie.checked}
                    onChange={() => handleCheck(movie._id)}
                  />
                </TableCell>
                <TableCell>
                  {movie.title.replace(/\w\S*/g, (w) =>
                    w.replace(/^\w/, (c) => c.toUpperCase())
                  )}
                </TableCell>
                <TableCell>{movie.year}</TableCell>
                <TableCell>{movie.duration}</TableCell>
                <TableCell>{movie.limitAge}</TableCell>
                <TableCell>{movie.TMDBid}</TableCell>
                <TableCell>
                  <>
                    <Link to={`/edit_movie/${movie._id}`}>
                      <AdminActionButtons color="primary">
                        <EditOutlinedIcon fontSize="small" />
                      </AdminActionButtons>
                    </Link>
                    <AdminActionButtons
                      color="secondary"
                      onClick={() =>
                        deleteMovie(movie._id, movie.img.public_id)
                      }
                    >
                      <CloseIcon fontSize="small" />
                    </AdminActionButtons>
                  </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TblPagination
          records={movies}
          page={page}
          pages={pages}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        ></TblPagination>
      </Paper>
    </div>
  );
};

export default MovieList;
