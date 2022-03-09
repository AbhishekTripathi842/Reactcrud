import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';




export default function Form() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  //form functions

  const [valuee, setValuee] = React.useState({ Firstname: '', Lastname: "", Email: "", Addres: "", checkBoxStatus: false });
  var [userData, setUserData] = React.useState([]);
  const [selectCheck, setSelectCheck] = React.useState([]);
  const [toggleSubmit , settoggleSubmit] = React.useState(true);
  const [isEditItem, setIsEditItem] = React.useState(null);
  const [searchTerm , setSearchTerm] = React.useState('');
 



  const filterData = (e)=>{
    setSearchTerm(e.target.value)
    const regex = new RegExp('^' + searchTerm.trim(), 'i' );
    userData = userData.filter((val, i) => regex.test(val.Firstname) )
    setUserData(userData)
    console.log('userData',userData)
    console.log(searchTerm)
  }

  
  function Submit() {

  

    if (!valuee) {
    alert("please fill the data");
    }else if(valuee && !toggleSubmit){
    
      setUserData(
        userData.map((elem)=>{
          if(elem.id===isEditItem){
            return{...elem,...valuee}
          }
          return elem;
        })
      );

      settoggleSubmit(true);
      setValuee({ Firstname: '', Lastname: "", Email: "", Addres: "", checkBoxStatus: false });
      setIsEditItem(null);

    }
    
    else {

      const allInputData = { id: Math.random(), ...valuee }
      
      setUserData([...userData, allInputData]);
      setValuee({ Firstname: '', Lastname: "", Email: "", Addres: "", checkBoxStatus: false })


      console.log(userData)
    }
  }

  function Delete() {

    setUserData([])
   
    console.log(userData)

  }

  const editItem = (id) => {

    setOpen(true);

    let newEditItem = userData.find((elem) => {

      return elem.id === id

    });

    console.log(newEditItem)

    settoggleSubmit(false);
    setValuee(newEditItem);
    setIsEditItem(id);

  }


  const checkbox = (i) => {

    userData[i].checkBoxStatus = !userData[i].checkBoxStatus;
    setUserData(userData);
    console.log('userData', userData)
    if (selectCheck.indexOf(i) === -1) {

      selectCheck.push(i);
    } else {
      selectCheck.pop(i);
    }
    console.log('selectCheck', selectCheck)

  }

  const selectedDelete = () => {
    var data = userData.filter(u => u.checkBoxStatus === false)
    setUserData(data)
    console.log(data)
  }

 
  const deleteItem = (index) => {
   
    const updatedItems = userData.filter((elem) => {
      return index !== elem.id;
    });
    setUserData(updatedItems)
  }

  const handleChange = (e) => {
    e.preventDefault();
    //  const{name,value} = e.target;
    const { name, value } = e.target
    setValuee({ ...valuee, [name]: value })


  };


  return (
    <>
      <div>
        <Button color="primary" startIcon={<AddIcon />} variant="outlined" onClick={handleClickOpen}>
          Add Contact
        </Button>


        <Button variant="outlined" onClick={Delete} color="error">
          DeleteAll
        </Button>

        <Button variant="outlined" onClick={selectedDelete} color="error">
          Select delete
        </Button>



             {/* apply filter */}

        
        <TextField placeholder="Search.." variant="filled" color="success" focused value={searchTerm} onChange={filterData}/>



        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <center>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >

                <div>
                  <TextField
                    id="standard-textarea"
                    placeholder="Enter your Firstname"
                    multiline
                    variant="standard"
                    value={valuee.Firstname}
                    onChange={handleChange}
                    name="Firstname"
                  />
                </div>

                <div>

                  <TextField
                    id="standard-textarea"

                    placeholder="Enter your lastname"
                    multiline
                    variant="standard"
                    value={valuee.Lastname}
                    onChange={handleChange}
                    name="Lastname"
                  />

                </div>

                <div>
                  <TextField
                    id="standard-textarea"
                    placeholder="Enter your Email"
                    multiline
                    variant="standard"
                    value={valuee.Email}
                    onChange={handleChange}
                    name="Email"
                  />
                </div>

                <div>
                  <TextField
                    id="standard-textarea"
                    placeholder="Enter your Address"
                    multiline
                    variant="standard"
                    value={valuee.Addres}
                    onChange={handleChange}
                    name="Addres"
                  />
                </div>

                {
                  toggleSubmit? <Button variant="contained" color="success" onClick={Submit} >
                  Submit
                </Button>: <Button variant="contained" color="success" onClick={Submit} >
                  Update
                </Button>
                }

               


              </Box>
            </center>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* table code */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>

            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>Firstname</TableCell>
              <TableCell>Lastname</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>

          </TableHead>

          <TableBody>
            {userData.map((elem, i) => (

              <TableRow>
                <TableCell> <Checkbox onChange={() => checkbox(i)} value={elem.checkBoxStatus} name="accept" /></TableCell>
                <TableCell>{elem.Firstname}</TableCell>
                <TableCell>{elem.Lastname}</TableCell>
                <TableCell>{elem.Email}</TableCell>
                <TableCell>{elem.Addres}</TableCell>
                <div>
                  <Button variant="contained" onClick={() => editItem(elem.id)}>
                    Edit
                  </Button>
                  <Button variant="contained" onClick={() => deleteItem(elem.id)}>
                    delete
                  </Button>
                </div>

              </TableRow>
            ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
