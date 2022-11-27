import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import errorHandler from '../../utils/errorHandler';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import {
    randomId,
  } from '@mui/x-data-grid-generator';
  
import RequestsGate from '../../network/requests.network';
  
  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
  
    const handleClick = () => {
      const _id = randomId();
      setRows((oldRows) => [...oldRows, { _id, firstName: '', lastName: '', emailAddress: '', isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [_id]: { mode: GridRowModes.Edit, fieldToFocus: 'firstName' },
      }));
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }
  
  EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired,
  };

  export default function CrudGrid() {
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});

    useEffect(()=>{
        RequestsGate.read()
        .then(users=>{
            setRows(prev=> [...prev, ...users]);
        }).catch(err=>{
            errorHandler(err);
        })
    }, [])

    const createOrUpdateRow = async (row)=>{
      try{
        if(row.isNew){
          const createdRow = await RequestsGate.create({firstName: row.firstName,
            lastName: row.lastName, 
            emailAddress: row.emailAddress, 
            password: row.password, 
            role: row.role
          });
          return createdRow;
        }else{
          RequestsGate.update({
            _id: row._id,
            firstName: row.firstName,
            lastName: row.lastName,
            emailAddress: row.emailAddress,
            role: row.role
          })
          return row;
        }
      }catch(err){
        errorHandler(err);
      }

    }

    const handleRowEditStart = (params, event) => {
      event.defaultMuiPrevented = true;
    };
  
    const handleRowEditStop = (params, event) => {
      event.defaultMuiPrevented = true;
    };
  
    const handleEditClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
  
    const handleSaveClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
  
    const handleDeleteClick = (id) => () => {
      RequestsGate.delete(id).then(result=>{
        if(result.deletedCount === 1){
          setRows(rows.filter((row) => row._id !== id));
        }
      });
    };
  
    const handleCancelClick = (id) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });

      
      const editedRow = rows.find((row) => row._id === id);
      if (editedRow.isNew) {
        setRows(rows.filter((row) => row._id !== id));
      }
    };
  
    const processRowUpdate = (newRow) => {
      return createOrUpdateRow(newRow).then(finalRow=>{
        const updatedRow = { ...finalRow, isNew: false };
        setRows(rows.map((row) => ((row._id === finalRow._id || row.isNew) ? updatedRow : row)));
        return updatedRow;
      })
    };
  
    const columns = [
      { field: 'firstName', headerName: 'First Name', width: 180, editable: true },
      { field: 'lastName', headerName: 'Last Name', editable: true },
      {
        field: 'emailAddress',
        headerName: 'Email',
        type: 'string',
        width: 220,
        editable: true,
      },
      {
        field: 'password',
        headerName: 'Password',
        type: 'string',
        width: 220,
        editable: true,
        renderCell: ()=>{return "********"},
      },
      {
        field: 'role',
        headerName: 'Is Admin?',
        type: "boolean",
        width: 100,
        editable: true,
        align: 'center',
        renderCell: (value)=> <Checkbox checked={value.row.role} />
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
  
          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }
  
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
      },
    ];
  
    return (
      <Box
        sx={{
          height: 500,
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          onProcessRowUpdateError={err=>console.log(err)}
          isCellEditable={(cell)=>{ 
            if(cell.field === 'password'){
              return cell.row.isNew
            }
            return true
          }}
          processRowUpdate={processRowUpdate}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[10]}
          pageSize={10}
          components={{
            Toolbar: EditToolbar,
          }}
          componentsProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    );
  }