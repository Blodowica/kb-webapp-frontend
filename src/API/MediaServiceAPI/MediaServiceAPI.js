import axios from "axios";

const baseURL = process.env.REACT_APP_MEDIA_SERVICE_URL;

async function UploadImage(file, albumName) {
  try {
    console.log(albumName);
    
    const formData = new FormData();
    formData.append("file", file);
 
    const response = await axios.post(`${baseURL}/Image/upload?albumName=${albumName}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    return { error: "Upload failed" };
  }
}

async function GetAlbumFolders() {
  try {
    const response = await axios.get(`${baseURL}/Image/GetFolders`);
    return response.data;
  } catch (error) {
    return [];
  }
}

async function GetImagesByAlbum(albumName) {
  try {
    const response = await axios.get(`${baseURL}/Image/album/${albumName}`);
    return response.data;
  } catch (error) {
    return [];
  }
}

async function GetAllImages() {
  try {
    const response = await axios.get(`${baseURL}/Image/getImages`);
    return response;
  } catch (error) {
    return [];
  }
}

async function GetImageById(publicId) {
  try {
    const response = await axios.get(`${baseURL}/Image/id/${publicId}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

async function CreateFolder(folderName) {
  try {
    const response = await axios.post(`${baseURL}/Image/CreateFolder`, null, {
      params: { folderName },
    });
    return response.data;
  } catch (error) {
    return { error: "Folder creation failed" };
  }
}

async function GetImagesByFolder(folderName) {
  try {
    const response = await axios.get(`${baseURL}/Image/GetImageByFolder`, {
      params: { folderName },
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

export {
  UploadImage,
  GetAlbumFolders,
  GetImagesByAlbum,
  GetAllImages,
  GetImageById,
  CreateFolder,
  GetImagesByFolder,
};
