import {v2 as cloudinary} from 'cloudinary'
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadonCloudinary = async(localFilePath) =>{
    try{
        if(!localFilePath) return null
        //upload the file on clodinary
        const response = await cloudinary.uploader.upload
        (localFilePath,{
            resource_type:'auto'
         })

        //file has been uploaded  succesfully
        console.log("flie is uploaded on clodinary", 
        response.url);
        return response;
    }
    catch(error){
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file and upload operation got failed
        return null;
    }
}

export {uploadonCloudinary};

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });