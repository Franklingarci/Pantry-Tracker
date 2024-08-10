'use client'
import { Box,Stack, Typography, Button, Modal, TextField, Card, CardContent, Container,Grid, Paper } from '@mui/material';
import {firestore} from '@/firebase'
import { collection, query, doc,getDocs, setDoc, deleteDoc, getDoc, } from 'firebase/firestore';
import { useEffect, useState } from 'react';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
 gap: 3,
};
export default function Home() {
  const [pantry, setPantry] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const[ itemName, setItemName] = useState('')

  const updatePantry = async () => {
    const snapshot = query(collection(firestore,'Pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
      pantryList.push({"name": doc.id, ...doc.data()})
      })
      console.log(pantryList)
      setPantry(pantryList)
    }
  useEffect(() =>{
   
    updatePantry()
  }, [])

  const additem = async (item) => {
    const docRef =  doc(collection(firestore, 'Pantry'), item)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      const{count} = docSnap.data()
      await setDoc(docRef,{count: count+1})
    }else{
      await setDoc(docRef,{count:1})
    } 
    await updatePantry()
  }
  const removeItem = async(item) =>{
    const docRef = doc(collection(firestore, 'Pantry'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()){
      const {count} = docSnap.data()
        if(count === 1){
          await deleteDoc(docRef)
        }else{
          await setDoc(docRef, {count: count - 1})
        }
    }
    await updatePantry()
   }
   const [searchQuery, setSearchQuery] = useState('');

   const filteredPantry = pantry.filter(item =>
     item.name.toLowerCase().includes(searchQuery.toLowerCase())
   );
  return (
  <Box
  sx = {{
    justifyContent: 'center',
    alignItems : 'center',
    height: '100vh',
    bgcolor:"#90EE90",
    padding:4
  }}
  >
    <Typography variant='h2' color={'#333'} textAlign={'center'} sx={{ padding: '16px' }}>
        Pantry Items
      </Typography>
<Box 
  width={"100%"}
  height={"50vh"}
  display={'flex'}
  justifyContent={'center'}
  flexDirection={'column'}
  alignItems={'center'}
  gap={2}
  sx = {{
    
    
    }}
    
>
  <Modal open={open} onClose={handleClose}>
    <Paper sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add Item
      </Typography>
      <Stack width="100%" direction={'row'} spacing={2}>
        <TextField label="Item" variant="outlined" fullWidth value={itemName} onChange={(e) => setItemName(e.target.value)} />
        <Button variant="contained" onClick={() => { additem(itemName); setItemName(''); handleClose(); }}> Add</Button>
      </Stack>
    </Paper>
  </Modal>

  <Paper sx={{ width: "100%", padding: 3, border: '1px solid #333' }}>
    <Box bgcolor={'#ADD8E6'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Typography variant='h3' color={'#333'} textAlign={'center'} sx={{ padding: '16px' }}>
        Inventory
      </Typography>
    </Box>
    <TextField
      label="Search Pantry"
      variant="outlined"
      fullWidth
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      sx={{ marginBottom: 2 }}
    />
    <Stack spacing={2} overflow={'auto'}>
      {filteredPantry.map(({ name, count }) => (
        <Paper key={name} sx={{ minHeight: "150px", display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingX: 5, bgcolor: '#f0f0f0' }}>
          <Typography variant={  'h4'} color={'#333'} textAlign={'center'}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Typography>
          <Typography variant={'h4'} color={'#333'} textAlign={'center'}>
            Quantity: {count}
          </Typography>
          <Button variant='contained' onClick={() => removeItem(name)}> Remove</Button>
        </Paper>
      ))}
    </Stack>
  </Paper>
  <Button variant="contained" onClick={handleOpen}>ADD</Button>
  
</Box>
</Box>
  );
}