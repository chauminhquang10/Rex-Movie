import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../../GlobalState";
import "./Packages.css";
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
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { removeNotify } from "../../../../redux/actions/notifyAction";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  deleteButton: {
    position: "absolute",
    left: "0px",
    top: "50%",
  },
  AddButton: {
    position: "absolute",
    top: "50%",
    right: "0px",
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

const Packages = () => {
  const state = useContext(GlobalState);

  const [token] = state.token;
  const [movies, setMovies] = state.moviesAPI.movies;
  const [packages, setPackages] = state.packagesAPI.packages;

  const [moviesCallback, setMoviesCallback] = state.moviesAPI.moviesCallback;
  const [packagesCallback, setPackagesCallback] =
    state.packagesAPI.packagesCallback;

  const { socket } = useSelector((state) => state);
  const dispatch = useDispatch();

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
      id: "price",
      label: "Price",
    },
    {
      id: "video_quality",
      label: "Video quality",
    },
    {
      id: "resolution",
      label: "Resolution",
    },
    {
      id: "sold",
      label: "Sold",
    },
    {
      id: "actions",
      label: "Actions",
      disableSorting: true,
    },
  ];

  const handleCheck = (id) => {
    packages.forEach((pack) => {
      if (pack._id === id) pack.checked = !pack.checked;
    });
    setPackages([...packages]);
  };

  const deletePackage = async (id, public_id) => {
    try {
      const res = await axios.delete(`/api/packages/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      await res;
      //Notify
      const msg = {
        id,
        url: `/detail/${id}`,
      };
      setPackagesCallback(!packagesCallback);
    } catch (error) {
      Swal.fire(error.response.data.msg, "", "success");
    }
  };

  const deleteAPackage = async (id, public_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deletePackage(id);
        Swal.fire("Deleted a package", "", "success");
      }
    });
  };

  const checkAll = () => {
    packages.forEach((pack) => {
      pack.checked = !isChecked;
    });
    setPackages([...packages]);
    setIsChecked(!isChecked);
  };

  const deleteAll = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        packages.forEach((pack) => {
          if (pack.checked) deletePackage(pack._id);
        });
        Swal.fire("Deleted all checked package", "", "success");
        setIsChecked(false);
      }
    });
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
    return stableSort(packages, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };

  const handleSort = (id) => {
    const isAsc = orderBy === id && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(id);
  };

  console.log({ packages });

  return (
    <div className="admin-movies-list">
      <Paper className={classes.pageContent}>
        <Toolbar className="Movie_List_Tool_Bar">
          <Link to="/createpackage">
            <AdminNormalButton
              text="Create"
              variant="outlined"
              startIcon={<AddIcon />}
              className={classes.AddButton}
            ></AdminNormalButton>
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
            {recordsAfterPagingAndSorting().map((pack, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox
                    color="primary"
                    checked={pack.checked}
                    onChange={() => handleCheck(pack._id)}
                  />
                </TableCell>
                <TableCell>
                  {pack.title.replace(/\w\S*/g, (w) =>
                    w.replace(/^\w/, (c) => c.toUpperCase())
                  )}
                </TableCell>
                <TableCell>{pack.price}</TableCell>
                <TableCell>{pack.video_quality}</TableCell>
                <TableCell>{pack.resolution}</TableCell>
                <TableCell>{pack.sold}</TableCell>
                <TableCell>
                  <>
                    <Link to={`/packagesdetail/${pack._id}`}>
                      <AdminActionButtons color="primary">
                        <EditOutlinedIcon fontSize="small" />
                      </AdminActionButtons>
                    </Link>
                    <AdminActionButtons
                      color="secondary"
                      onClick={() => deleteAPackage(pack._id)}
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
          records={packages}
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

export default Packages;