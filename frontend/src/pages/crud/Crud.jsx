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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useMainContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie'

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
    const Navigate = useNavigate();
    const {userInfo} = useMainContext();
  
    const handleClick = () => {
      const _id = randomId();
      setRows((oldRows) => [...oldRows, { _id, firstName: '', lastName: '', emailAddress: '',role: false, isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [_id]: { mode: GridRowModes.Edit, fieldToFocus: 'firstName' },
      }));
    };

    const logout = ()=>{
      Cookie.remove('user-token');
      Navigate('/');
    }

  
    return (
      <GridToolbarContainer>
       {userInfo?.role && <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>}
        <Button color="primary" onClick={logout}>
          Logout
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
    const [open, setOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const [currentErrors, setCurrentErrors] = useState({
      id: null,
      errors: {
        firstName: false,
        lastName: false,
        emailAddress: false,
        password: false,
        role: false
      }
    })
    const {userInfo} = useMainContext()

    useEffect(()=>{
        RequestsGate.read()
        .then(users=>{
            setRows(prev=> [...prev, ...users]);
        }).catch(err=>{
            errorHandler(err,setIsError, setOpen);
        })
    }, [])

    const createOrUpdateRow = async (row)=>{
      if(row.isNew){
        return RequestsGate.create({firstName: row.firstName,
          lastName: row.lastName, 
          emailAddress: row.emailAddress, 
          password: row.password, 
          role: row.role
        }).then(newRow=>{
          if(newRow){
            return newRow;
          }
        }).catch(err=>{
          handleBadRequest(err,row)
        });
      }else{
        return RequestsGate.update({
          _id: row._id,
          firstName: row.firstName,
          lastName: row.lastName,
          emailAddress: row.emailAddress,
          role: row.role
        }).then(res=>{
          return row;
        }).catch(err=>{
          handleBadRequest(err,row);
        })
      }

    }

    const handleBadRequest = (err,row)=>{
      const errors = errorHandler(err);
      setCurrentErrors(prev=>{
        prev["id"] = row._id;
        for(let key in prev.errors){
          if(errors.includes(key)){
            prev.errors[key] = true;
          }else{
            prev.errors[key] = false;
          }
        }
        return prev;
      })
    }


    const handleRowEditStart = (params, event) => {
      event.defaultMuiPrevented = true;
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    const handleRowEditStop = (params, event) => {
      event.defaultMuiPrevented = true;
    };
  
    const handleEditClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
  
    const handleSaveClick = (id) => () => {
      setCurrentErrors(prev=>{
        prev['id'] = null;
        return prev;
      })
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
  
    const handleDeleteClick = (id) => () => {
      RequestsGate.delete(id).then(result=>{
        if(result.deletedCount === 1){
          setRows(rows.filter((row) => row._id !== id));
            setIsError(false);
            setOpen(true);
        }
      }).catch(err=>{
        errorHandler(err, setIsError,setOpen)
      });
    };
  
    const handleCancelClick = (id) => () => {
      setCurrentErrors(prev=>{
        prev['id'] = null;
        return prev;
      })
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
        setRows(rows.map((row) => ((row._id === finalRow._id || row.isNew && row._id === newRow._id) ? updatedRow : row)));
        setIsError(false);
        setOpen(true);
        return updatedRow;
      })
    };

    const handleError = (params)=>{
      if(currentErrors.id === params.id){
          return currentErrors.errors[params.field] ? 'errorInput' : null
      }
    }
  
    const columns = [
      { field: 'firstName', headerName: 'First Name', width: 100, editable: true, sortable: false},
      { field: 'lastName', headerName: 'Last Name', editable: true,  sortable: false},
      {
        field: 'emailAddress',
        headerName: 'Email',
        type: 'string',
        width: 220,
        editable: true,
        sortable: false
      },
      {
        field: 'password',
        headerName: 'Password',
        type: 'string',
        width: 220,
        editable: true,
        sortable: false,
        renderCell: ()=>{return "********"},
      },
      {
        field: 'role',
        headerName: 'Is Admin?',
        type: "boolean",
        width: 100,
        editable: true,
        align: 'center',
        sortable: false,
        renderCell: (value)=> <Checkbox checked={value.row.role} />
      },
      ...(userInfo?.role ? 
      [{
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        sortable: false,
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
      }] : []),
    ];
  
    return (
      <Box
        sx={{
          height: 500,
          width: '100%',
          margin: '0 auto',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
          '& .errorInput': {
            border: '3px solid rgb(209, 56, 72)',
          }
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
          getCellClassName={handleError}
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
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={isError ? 'error' : 'success'} sx={{ width: '100%' }}>
            {isError ? 'Something went wrong, try again later.' : 'Done successfully.'}
          </Alert>
      </Snackbar>
      </Box>
    );
  }