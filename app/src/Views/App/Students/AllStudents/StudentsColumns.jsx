import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import IconButton from "../../../../Components/Buttons/IconButton";
import { getColumnValue } from "../../../../Config/GeneralFunctions";
import { Paths, replacePaths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";

export const StudentsColumns = (openDeleteModal) => {
  const columns = [
    {
      Header: "NIA",
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.nia}</p>),
      width: 100,
    },
    {
      Header: "Full Name",
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.fullname}</p>),
      width: 100,
    },
    {
      Header: "Email",
      Cell: (row) =>
        getColumnValue(row, (item) => <p className="mb-0">{item.email}</p>),
      width: 100,
    },
    {
      Header: "Actions",
      width: 10,
      Cell: (row) =>
        getColumnValue(row, (item) => (
          <div className="d-flex align-items-center">
            <IconButton
              Icon={MdEdit}
              as={Link}
              to={replacePaths(Paths[Views.edit_student].path, [
                { student_guid: item.guid },
              ])}
            />
            <IconButton
              Icon={MdDelete}
              onClick={() => openDeleteModal(item.guid)}
            />
          </div>
        )),
    },
  ];
  return columns;
};
