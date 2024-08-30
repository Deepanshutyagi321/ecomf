import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "./cards.css"
export default function Cards({Data}) {
 // Check if Data is undefined or an empty array
//  if (!Data || Data.length === 0 || !Data[0]) {
//     // Handle the case when there is no data
//     return <div>No data available
//      {console.log({Data})}
//     </div>
//   }


  return (
   <div className='cards'>
  
          <Card key={Data._id}sx={{ maxWidth: 345 }} className='card-area'>
          <CardActionArea > 
            <CardMedia
              component="img"
              height="140"
              image={Data.productImage}
              alt={Data.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              {Data.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Data.price}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    
   </div>
  
  )
}