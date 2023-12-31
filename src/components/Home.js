import { useState } from "react";

import {
  Paper,
  Table,
  TableBody,
  TableHead,
  Avatar,
  TableContainer,
  Button,
  TableCell,
  Tooltip,
  TableRow,
  Skeleton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { RiAliensFill } from "react-icons/ri";
import { IoIosPerson } from "react-icons/io";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import Navbar from "./Navbar";

const columns = [
  {
    id: "image",
    label: "Avatar",
    minWidth: 170,
  },
  {
    id: "name",
    label: "Name",
    minWidth: 170,
  },
  {
    id: "species",
    label: "Species",
    minWidth: 170,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
  },
];
const statuses = {
  Dead: <PersonOffIcon />,
  Alive: <PersonIcon />,
  unknown: <ContactSupportIcon />,
};

const Species = {
  Human: <IoIosPerson />,
  Alien: <RiAliensFill />,
};

export default function Home() {
  const [activePage, setActivePage] = useState(1);
  const [rowsPerPage] = useState(5);
  const { data, fetchCharacter, loading, isDark, input } = useGlobalContext();
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const prev = () => {
    if (activePage > 1) {
      setActivePage((prev) => prev - 1);
    }
  };
  const next = () => {
    if (activePage < totalPages) {
      setActivePage((prev) => prev + 1);
    }
  };

  const start = (activePage - 1) * rowsPerPage;
  const end = activePage * rowsPerPage;
  const sliced = data.slice(start, end);

  const filtered = sliced.filter((el) =>
    el.name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          borderTop: "1px solid lightgrey ",
        }}
      >
        <TableContainer
          sx={{
            maxHeight: 440,
            marginTop: !isDark && "10px",
            backgroundColor: isDark && "#292929",
          }}
        >
          <Table stickyHeader aria-label="sticky table" className="">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: "600",
                      borderRight: !isDark && "1px solid grey",
                      borderRadius: !isDark && "10px",
                      backgroundColor: isDark && "#292929",
                      color: isDark && "#d7d7d7",
                    }}
                    align="center"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length ? (
                filtered.map((el) => {
                  const {
                    id,
                    name,
                    type,
                    status,
                    species,
                    gender,
                    origin,
                    location,
                    image,
                  } = el;
                  return (
                    <TableRow hover role="checkbox" key={id}>
                      <TableCell align="center">
                        <Tooltip title={name} placement="right">
                          <Avatar src={image} alt={name} />
                        </Tooltip>
                      </TableCell>

                      <TableCell align="center">
                        <Link
                          to={`/character/${id}`}
                          onClick={() => fetchCharacter(id)}
                          style={{
                            color: isDark && "#d7d7d7",
                          }}
                          className={`text-left link-offset-2 link-underline link-underline-opacity-0  ${
                            isDark
                              ? "text-light hover_dark"
                              : "text-dark hover_light"
                          }`}
                        >
                          {name}
                          <ArrowForwardIosIcon className="icon" />
                        </Link>
                      </TableCell>

                      <TableCell
                        sx={{ fontSize: "22px" }}
                        align="center"
                        className={isDark && "text-light"}
                      >
                        <Tooltip placement="top" title={species}>
                          {Species[species]}
                        </Tooltip>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={isDark && "text-light"}
                      >
                        <Tooltip placement="top" title={status}>
                          {statuses[status]}
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  {loading ? (
                    <>
                      <TableCell align="center">
                        <Skeleton variant="circular" width={40} height={40} />
                      </TableCell>
                      <TableCell className="mx-auto">
                        <Skeleton
                          variant="text"
                          sx={{
                            fontSize: "2rem",
                            width: "200px",
                            margin: "auto",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          variant="circular"
                          className="mx-auto"
                          width={30}
                          height={30}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          variant="circular"
                          className="mx-auto"
                          width={30}
                          height={30}
                        />
                      </TableCell>
                    </>
                  ) : (
                    <TableCell
                      colSpan={12}
                      align="center"
                      className={isDark && "text-light"}
                    >
                      No alien & human found!
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <div className="my-4">
        <Button
          onClick={prev}
          disabled={activePage === 1}
          className={`border rounded-5 ${isDark && "bg-light"}`}
        >
          <ArrowBackIcon />
        </Button>
        {totalPages &&
          [...Array(totalPages)].map((_, i) => {
            return (
              <Button
                key={i}
                className={`${
                  i + 1 === activePage && "bg-secondary-subtle text-dark"
                } border ms-1 ${isDark && " text-light"}`}
                onClick={() => setActivePage(i + 1)}
              >
                {i + 1}
              </Button>
            );
          })}
        <Button
          onClick={next}
          className={`border rounded-5 ms-1 ${isDark && "bg-light "}`}
          disabled={activePage === totalPages}
        >
          <ArrowForwardIcon />
        </Button>
      </div>
    </>
  );
}
